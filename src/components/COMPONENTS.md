# Components guide — bromb.in

High-level principles
- Small focused components: each `.astro` component should have a single responsibility and be no more than ~80 lines of markup whenever possible.
- Orchestrators vs Presentational components: orchestrator components compose children and do not contain DOM logic. DOM logic lives in `scripts/` (or `src/components/*/` TS modules for header-specific behavior).
- Client scripts live under `scripts/` as `.ts` modules and are imported from layouts/components using `<script type="module"> import '../scripts/...' </script>`.
- DOM helpers live in `scripts/dom-utils.ts` and are imported by client modules. Presentational components are pure markup + props.

Directory layout (important folders only)
- `src/components/`
  - `header/` — header subcomponents + header runtime modules (client.ts, search.ts, scroll.ts, theme.ts, dom.ts)
  - `article/` — small article-specific components (ArticleHero, ReadingTime, HeadingsToggle)
  - `cards/` — shared card components used by index/list pages (ContentCard)
  - `footer/` — footer subcomponents (FooterBrand, FooterLinks)
  - `COMPONENTS.md` — this file

- `scripts/`
  - `article-ui.ts` — article runtime (reading-time, headings menu, prev/next wiring)
  - `hydrate-post-nav.ts` — safely hydrate server-rendered JSON into `window.__POST_NAV`
  - `dom-utils.ts` — small DOM helpers (id, q, toggleVisibility, truncatePath)
  - `utils.ts` — pure helpers (debounce, clamp, lerp, escapeHtml)
  - `article-footer.ts` — small helpers used by `ArticleFooterBar`

Conventions
- Component props and minor inline docs: each `.astro` component starts with a short comment explaining what it renders and its props.
- Import paths: when importing project-local TypeScript helper modules from `.astro` or `.ts` files, prefer explicit `.ts` extension (e.g. `import '../scripts/utils.ts'`) — this avoids some static analysis ambiguity.
- IDs and aria: keep existing DOM IDs unchanged when refactoring to avoid breaking client scripts. If you must rename an ID, update the scripts that reference it.
- Styling: prefer Tailwind utilities inline. Only add a `<style>` block in a component for complex selectors, animations, or media queries.
- Scripts: extract any non-trivial `<script>` into `scripts/` and import it from the layout or component; avoid inline DOM logic in `.astro` files.

How to add a new component
1. Add a presentational component to `src/components/<area>/MyComponent.astro`.
   - Keep it markup-only: exports for props, no DOM interactions.
   - Add a 2-line top comment describing the component and props.
2. If the component needs DOM behaviors, create a `scripts/<area>-<purpose>.ts` file with the logic.
   - Export named functions and an `init()` entrypoint invoked by an orchestrator or layout.
3. Import and compose the new component from its parent orchestrator or layout.

Common tasks
- Add a new client script: create `scripts/my-script.ts` then import it from the layout using `<script type="module">import '../scripts/my-script.ts'</script>`.
- Add an index/list item: put reusable markup in `src/components/cards/ContentCard.astro` and use it across lists.

Troubleshooting
- If search behaves oddly: verify `public/search-index.json` exists and run `node scripts/build-search-index.js`.
- If prev/next don't work: check `window.__POST_NAV` is set by the page. Use `scripts/hydrate-post-nav.ts` to set it safely.
