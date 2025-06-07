import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { Liquid } from "liquidjs";
import { marked } from "marked";
import yaml from "yaml";

/**
 * Load site configuration from site.yml.
 * @returns {Promise<Object>} Parsed configuration object.
 */
async function loadConfig() {
  const text = await fs.readFile("site.yml", "utf8");
  return yaml.parse(text);
}

/**
 * Format a date according to common blog patterns.
 * @param {string|Date} input - The date to format.
 * @param {string} pattern - Format string like '%Y-%m-%d'.
 * @returns {string} Formatted date.
 */
function formatDate(input, pattern) {
  const date = new Date(input);
  if (pattern === "%Y-%m-%d") {
    return date.toISOString().split("T")[0];
  }
  if (pattern === "%a, %b %e, %Y") {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return date.toString();
}

/**
 * Register custom filters on the Liquid engine.
 * @param {Liquid} engine - The Liquid template engine.
 */
function registerFilters(engine) {
  engine.registerFilter("truncatewords", (str, num) => {
    return str.split(/\s+/).slice(0, num).join(" ");
  });
  engine.registerFilter("strip_html", (str) => str.replace(/<[^>]+>/g, ""));
  engine.registerFilter("date", formatDate);
}

/**
 * Render a template recursively applying nested layouts.
 * The layout file can contain front matter specifying another layout.
 * @param {Liquid} engine - The Liquid template engine.
 * @param {string} layout - Layout file name without extension.
 * @param {Object} context - Template context.
 * @returns {Promise<string>} Rendered HTML.
 */
async function renderTemplate(engine, layout, context) {
  const file = path.join("src/templates/layouts", `${layout}.html`);
  const text = await fs.readFile(file, "utf8");
  const { data, content } = matter(text);
  const html = await engine.parseAndRender(content, context, {
    filepath: file,
  });
  if (data.layout) {
    return renderTemplate(engine, data.layout, { ...context, content: html });
  }
  return html;
}

/**
 * Build all Markdown files inside a directory, processing Liquid syntax before
 * converting to HTML.
 * @param {Liquid} engine - The Liquid template engine.
 * @param {Object} site - Global site configuration.
 * @param {string} srcDir - Source directory path.
 * @param {string} destDir - Destination base directory.
 * @param {Array<Object>} posts - Accumulator for posts.
 */
async function buildMarkdown(engine, site, srcDir, destDir, posts = []) {
  const files = await fs.readdir(srcDir);
  for (const file of files) {
    const fullPath = path.join(srcDir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await buildMarkdown(
        engine,
        site,
        fullPath,
        path.join(destDir, file),
        posts
      );
      continue;
    }
    if (!file.endsWith(".md")) continue;
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const rendered = await engine.parseAndRender(
      content,
      { page: data, site },
      { filepath: fullPath }
    );
    const htmlContent = marked.parse(rendered);
    const filename = path.basename(fullPath, ".md");
    const dateFromName = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
    const pageDate = data.date
      ? new Date(data.date)
      : dateFromName
      ? new Date(dateFromName[1])
      : stat.mtime;
    const page = {
      ...data,
      content: htmlContent,
      date: pageDate,
    };
    let url = data.permalink;
    if (!url && srcDir.includes("posts")) {
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      url = `/blog/${slug}/`;
    } else if (!url && srcDir.includes("projects")) {
      const name = file.replace(/\.md$/, "");
      url = `/projects/${name}/`;
    } else if (!url) {
      const name = file.replace(/\.md$/, "");
      url = name === "index" ? "/" : `/${name}/`;
    }
    page.url = url;
    posts.push(page);
    const html = await renderTemplate(engine, data.layout || "default", {
      page,
      site,
      content: htmlContent,
    });
    const destPath = page.url.endsWith(".html")
      ? path.join(destDir, page.url.replace(/^\//, ""))
      : path.join(destDir, page.url.replace(/^\//, ""), "index.html");
    await fs.outputFile(destPath, html);
  }
  return posts;
}

/**
 * Copy static directories to the destination.
 * @param {string} dir - Directory name.
 */
async function copyStatic(dir) {
  if (await fs.pathExists(dir)) {
    await fs.copy(dir, path.join("dist", dir));
  }
}

/**
 * Build the entire site to the dist directory.
 */
export default async function build() {
  const site = await loadConfig();
  const engine = new Liquid({
    root: [
      path.resolve("src/templates/includes"),
      path.resolve("src/templates/layouts"),
    ],
    extname: ".html",
    jekyllInclude: true,
  });
  registerFilters(engine);
  await fs.emptyDir("dist");
  let posts = await buildMarkdown(engine, site, "src/posts", "dist");
  posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  site.posts = posts;
  await buildMarkdown(engine, site, "src/pages", "dist");
  await copyStatic("assets");
  await copyStatic("uploads");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
