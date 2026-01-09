//   deno run -RW scripts/build-search-index.ts
// - Produces `public/search-index.json` containing: title, description, href, content (excerpt).
// - Adjust `PAGES_GLOB` or excerpt length as needed.

import { expandGlob } from "jsr:@std/fs";
import { parse as parseYAML } from "jsr:@std/yaml";
import { relative, basename } from "node:path";

const PAGES_GLOB = "src/pages/**/*.md";
const OUT = "public/search-index.json";

function pageHrefFromPath(p: string) {
  let rel = relative("src/pages", p).replaceAll("\\", "/");
  rel = rel.replace(/\.md$/, "");
  if (rel.endsWith("/index")) rel = rel.replace(/\/index$/, "");
  if (rel === "index") rel = "";
  return "/" + rel.replace(/^\/+/, "");
}

function excerpt(content: string, max = 240) {
  const cleaned = content.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.length > max ? cleaned.slice(0, max) + "…" : cleaned;
}

async function build() {
  const items: Array<Record<string, string>> = [];

  console.log("Scanning for pages:", PAGES_GLOB);
  for await (const entry of expandGlob(PAGES_GLOB)) {
    if (!entry.isFile) continue;
    const path = entry.path;
    try {
      const raw = await Deno.readTextFile(path);
      const fmMatch = raw.match(/^-{3}\s*[\r\n]([\s\S]*?)\r?\n---/);
      let data: Record<string, unknown> = {};
      let content = raw;
      if (fmMatch) {
        try {
          const yaml = fmMatch[1];
          const parsed = parseYAML(yaml) as Record<string, unknown> | undefined;
          if (parsed) data = parsed;
        } catch (err) {
          if (err instanceof Error) {
            console.warn(`YAML parse error in ${path}:`, err.message);
          } else {
            console.warn(`YAML parse error in ${path}:`, String(err));
          }
        }
        content = raw.slice(fmMatch[0].length).trim();
      } else {
        content = raw;
      }

      const title =
        (data && (data.title || data.name)) ||
        basename(path).replace(/\.md$/, "");
      const description = (data && (data.description || data.excerpt)) || "";
      const href = pageHrefFromPath(path);

      items.push({
        title: String(title),
        description: String(description),
        href,
        content: excerpt(String(content), 1200),
      });
    } catch (err) {
      console.warn("Failed processing", entry.path, err);
    }
  }

  try {
    await Deno.mkdir("public", { recursive: true });
  } catch (_) {
    // Ignore error if directory already exists
  }

  await Deno.writeTextFile(OUT, JSON.stringify(items, null, 2));
  console.log(`Wrote ${items.length} index entries to ${OUT}`);
}

if (import.meta.main) {
  build().catch((err) => {
    console.error("Index build failed:", err);
    Deno.exit(1);
  });
}
