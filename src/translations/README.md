# Translations (`src/translations/`)

UI strings and structured page copy as JSON — one file per locale (`en.json`, `fr.json`, `zh.json`, …).

## Adding a locale

1. Copy `en.json` to `{locale}.json` (or machine-translate keys incrementally).
2. Register the locale in [`src/locales.ts`](../locales.ts) and [`astro.config.mjs`](../../astro.config.mjs).
3. No new `.astro` files needed — [`src/pages/[locale]/`](../pages/[locale]/) templates load `getTranslations(lang)` at build time.

Pedagogy pages use a mix of:

- **This folder** — nav, home, tools, grammar rules, vocabulary essay, comparison chrome, etc.
- **`src/page-markdown/`** — spelling and alphabet rationale (long HTML-friendly markdown).
- **`src/data/motivation-content.ts`** — motivation page structured blocks.

## Loading

[`src/lib/translations.ts`](../lib/translations.ts) eagerly imports all `*.json` via `import.meta.glob`. Missing keys for new locales fall back to English in `getLocaleContent()` helpers.
