import { glob } from 'glob';
import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const PAGES_GLOB = "src/pages/**/*.md";
const OUT = "public/search-index.json";

function pageHrefFromPath(p) {
  let rel = path.relative("src/pages", p).replaceAll("\\", "/");
  rel = rel.replace(/\.md$/, "");
  if (rel.endsWith("/index")) rel = rel.replace(/\/index$/, "");
  if (rel === "index") rel = "";
  return "/" + rel.replace(/^\/+/, "");
}

function excerpt(content, max = 240) {
  const cleaned = content.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.length > max ? cleaned.slice(0, max) + "…" : cleaned;
}

async function build() {
  const items = [];

  console.log("Scanning for pages:", PAGES_GLOB);

  const files = await glob(PAGES_GLOB, { nodir: true });

  for (const filePath of files) {
    try {
      const raw = await fs.readFile(filePath, 'utf-8');

      // Extract frontmatter
      const fmMatch = raw.match(/^-{3}\s*[\r\n]([\s\S]*?)\r?\n---/);

      let data = {};
      let content = raw;

      if (fmMatch) {
        try {
          const yamlContent = fmMatch[1];
          const parsed = yaml.load(yamlContent);
          if (parsed) data = parsed;
        } catch (err) {
          console.warn(`YAML parse error in ${filePath}:`, err.message);
        }
        content = raw.slice(fmMatch[0].length).trim();
      }

      // Fallback logic for title/description
      const title = data.title || data.name || path.basename(filePath).replace(/\.md$/, "");
      const description = data.description || data.excerpt || "";
      const href = pageHrefFromPath(filePath);

      items.push({
        title: String(title),
        description: String(description),
        href,
        content: excerpt(String(content), 1200),
      });
    } catch (err) {
      console.warn("Failed processing", filePath, err);
    }
  }

  try {
    await fs.mkdir("public", { recursive: true });
  } catch (_) {
    // Ignore if exists
  }

  // Sort items by href for deterministic output
  items.sort((a, b) => a.href.localeCompare(b.href));

  await fs.writeFile(OUT, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} index entries to ${OUT}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build().catch((err) => {
    console.error("Index build failed:", err);
    process.exit(1);
  });
}