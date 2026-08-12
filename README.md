# bromb.in

The template is distributed under the MIT license. The contents (texts, articles) are my intellectual property.

## Installation

### Dependencies

- [Deno](https://deno.com) (version 2 or higher)

No install step needed — dependencies are fetched from JSR on first run.

Content lives under the `content/` directory and the theme (layouts and
components) under `theme/`. Configuration is stored in `content/.steno/config.yml`.

### Internationalization

Posts are translated by creating Markdown files under a language-suffixed
collection folder (for example `content/blog-es/post-name.md` or
`content/blog-it/post-name.md`). Other pages are generated per language as
sibling files using a language suffix (for example `support.es.md` or
`support.it.md`) and use string keys resolved at build time from the
`content/_data/i18n/` YAML files. Use `{d.key}` (with `{#let d =
data.i18n[lang] ?? data.i18n.en}`) inside `.tau` templates to insert
localized strings.

Each language is built under its own prefix (e.g. `/es` or `/it`) and the
navigation bar includes a language selector that stores your choice in a
`lang` cookie, automatically redirecting to the translated version when
available.

### Build

```bash
deno task build
```

### Server

```bash
deno task dev
```

> [!NOTE]
> The development server also rebuilds the project on file changes.
