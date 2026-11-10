# Translations (`src/translations/`)

One JSON file per locale. English (`en.json`) is the source. Every other file may omit keys: [`src/lib/translations.ts`](../lib/translations.ts) fills those from English, and an empty string falls back too.

The files are [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) content. See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## What is in a file

Nav, page copy, spelling, alphabet rationale, numbers/dates/time, motivation, and the site title and description. Pedagogy pages render a shared HTML structure ([`src/data/pedagogy-structure.json`](../data/pedagogy-structure.json)) filled with these strings.

Chinese, Japanese, Korean, Vietnamese, Thai, Khmer, Lao, Filipino, Indonesian, Malay, Arabic, Russian, and the European locales other than French and Spanish are machine-translated drafts.

## Adding a string

1. Add the key to `en.json` only.
2. Translate it in the other files, or leave it out and the site shows English until it is translated.
3. `npm run check:translations` (also run by `npm run build`) rejects unknown keys and HTML that the English string does not allow. Allowed without being in the English string: `strong`, `em`, `sup`, `sub`, `br`.

## Adding a locale

1. Register it in [`src/locales.ts`](../locales.ts) and [`astro.config.mjs`](../../astro.config.mjs).
2. Add `{locale}.json` (an empty object is enough).
3. No new `.astro` files.
