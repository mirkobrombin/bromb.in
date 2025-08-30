# bromb.in

The template is distributed under the MIT license. The contents (texts, articles) are my intellectual property.

## Installation

### Dependencies

- Node.js (version 18 or higher)
- pnpm (suggested)

```bash
pnpm install
```

Content lives under the `src/` directory and templates under `src/templates`.
Configuration is stored in `site.yml`.

### Internationalization

Posts are translated by creating Markdown files with a language suffix (for
example `post-name.es.md` or `post-name.it.md`). Other pages are generated for
every language and use string keys that are resolved at build time from the
`i18n/` YAML files. Use the Liquid filter `{{ 'key' | t: page.lang }}` inside
templates to insert localized strings.

The build script outputs each language under its own prefix (e.g. `/es` or
`/it`) and the navigation bar includes a language selector that stores your
choice in a `lang` cookie, automatically redirecting to the translated version
when available.

### Build

```bash
pnpm run build
```

### Server

```bash
pnpm run dev
```

> [!NOTE]
> The development server also rebuilds the project on file changes.
