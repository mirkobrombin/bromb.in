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

async function loadTranslations() {
  const dir = "i18n";
  const translations = {};
  if (!(await fs.pathExists(dir))) return translations;
  const files = await fs.readdir(dir);
  for (const file of files) {
    const ext = path.extname(file);
    if (![".yml", ".yaml"].includes(ext)) continue;
    const code = path.basename(file, ext);
    const text = await fs.readFile(path.join(dir, file), "utf8");
    translations[code] = yaml.parse(text) || {};
  }
  return translations;
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
function registerFilters(engine, site) {
  engine.registerFilter("truncatewords", (str, num) => {
    return str.split(/\s+/).slice(0, num).join(" ");
  });
  engine.registerFilter("strip_html", (str) => str.replace(/<[^>]+>/g, ""));
  engine.registerFilter("date", formatDate);
  engine.registerFilter("t", (key, lang) => {
    const lookup = (code) => {
      return key.split(".").reduce((obj, part) => obj && obj[part], site.translations[code] || {});
    };
    return lookup(lang) || lookup(site.default_lang) || key;
  });
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
function translate(site, key, lang) {
  if (!key) return key;
  const lookup = (code) =>
    key.split(".").reduce((obj, part) => obj && obj[part], site.translations[code] || {});
  return lookup(lang) || lookup(site.default_lang) || key;
}

async function buildMarkdown(engine, site, srcDir, destDir, posts = {}) {
  const files = await fs.readdir(srcDir);
  for (const file of files) {
    const fullPath = path.join(srcDir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await buildMarkdown(engine, site, fullPath, path.join(destDir, file), posts);
      continue;
    }
    if (!file.endsWith(".md")) continue;
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const filename = path.basename(fullPath, ".md");
    const dateFromName = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
    const langMatch = filename.match(/\.([a-z]{2})$/);
    const fileLang = langMatch ? langMatch[1] : null;
    const isPost = srcDir.includes("posts");
    const langs = isPost
      ? [fileLang || site.default_lang]
      : fileLang
      ? [fileLang]
      : site.languages.map((l) => l.code);
    for (const lang of langs) {
      const rendered = await engine.parseAndRender(
        content,
        { page: { ...data, lang }, site: { ...site, posts: posts[lang] || [] } },
        { filepath: fullPath }
      );
      const htmlContent = marked.parse(rendered);
      const pageDate = data.date
        ? new Date(data.date)
        : dateFromName
        ? new Date(dateFromName[1])
        : stat.mtime;
      let url = data.permalink;
      if (!url && srcDir.includes("posts")) {
        const slug = file
          .replace(/^\d{4}-\d{2}-\d{2}-/, "")
          .replace(/\.([a-z]{2})\.md$/, "")
          .replace(/\.md$/, "");
        url = `/blog/${slug}/`;
      } else if (!url && srcDir.includes("projects")) {
        const name = file.replace(/\.md$/, "");
        url = `/projects/${name}/`;
      } else if (!url) {
        const name = file.replace(/\.md$/, "");
        url = name === "index" ? "/" : `/${name}/`;
      }
      const baseUrl = url;
      if (lang !== site.default_lang) {
        url = `/${lang}${url}`;
      }
      const page = {
        ...data,
        content: htmlContent,
        date: pageDate,
        lang,
        url,
        baseUrl,
      };
      if (page.title) page.title = translate(site, page.title, lang);
      if (page.description) page.description = translate(site, page.description, lang);
      if (isPost) {
        posts[lang] = posts[lang] || [];
        posts[lang].push(page);
      }
      const html = await renderTemplate(engine, data.layout || "default", {
        page,
        site: { ...site, posts: posts[lang] || [] },
        content: htmlContent,
      });
      const destPath = page.url.endsWith(".html")
        ? path.join(destDir, page.url.replace(/^\//, ""))
        : path.join(destDir, page.url.replace(/^\//, ""), "index.html");
      await fs.outputFile(destPath, html);
    }
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
  site.translations = await loadTranslations();
  const engine = new Liquid({
    root: [
      path.resolve("src/templates/includes"),
      path.resolve("src/templates/layouts"),
    ],
    extname: ".html",
    jekyllInclude: true,
  });
  registerFilters(engine, site);
  await fs.emptyDir("dist");
  let posts = await buildMarkdown(engine, site, "src/posts", "dist");
  for (const lang of Object.keys(posts)) {
    posts[lang] = posts[lang].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  await buildMarkdown(engine, site, "src/pages", "dist", posts);
  await copyStatic("assets");
  await copyStatic("uploads");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
