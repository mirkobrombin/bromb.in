# bromb.in

A personal blog and portfolio built with **Astro v5**, featuring a hybrid static architecture, multi-language support (i18n), and a custom fuzzy search implementation.

## Quick Start

This project uses `pnpm`.

```bash
# Install dependencies
pnpm install

# Start local development
pnpm dev

# Build the site and search index
pnpm run build && pnpm run build:search

# Preview the production build
pnpm preview
```

## Project Architecture

- **Framework**: [Astro v5](https://astro.build/) (Hybrid mode)
- **Styling**: Tailwind CSS with Typography and Scrollbar plugins.
- **Content**: Markdown-based articles located in `src/pages/stories/articles/`.
- **Search**: Custom Fuse.js implementation. The index is generated via `scripts/build-search-index.js`.
- **i18n**: Built-in Astro i18n support for English (`en`), Spanish (`es`), and Italian (`it`).

## Key Directories

- `src/pages/`: Contains all route components and Markdown content. Language variants are mirrored in `{es,it}/` subfolders.
- `src/layouts/`: Core layouts including `ArticleLayout.astro` for blog posts.
- `src/components/`: Reusable UI components like the `Header` (with search) and `ArticleFooterBar`.
- `scripts/`: Build-time scripts for generating the search index.

## Adding Content

To add a new article:
1. Create a `.md` file in `src/pages/stories/articles/<slug>.md`.
2. Add the required frontmatter:
   ```yaml
   ---
   title: "My New Article"
   date: "2024-03-20"
   description: "A short summary of the post."
   cover: "/path/to/image.png"
   author: "Your Name"
   ---
   ```
3. Run `pnpm run build:search` to update the search index.

## Commands

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local dev server |
| `pnpm build` | Builds the static site to `dist/` |
| `pnpm run build:search` | Generates `public/search-index.json` |
| `pnpm run format` | Formats code using Prettier |

---
