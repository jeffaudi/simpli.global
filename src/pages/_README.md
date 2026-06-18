# Pages (`src/pages`)

Astro routes for [simpli.global](https://simpli.global). All localized pages use a single dynamic tree: **[locale]/**.

**Note:** This file is named `_README.md` because Astro would otherwise compile `README.md` in `pages/` as a live URL.

## Structure

- **`[locale]/index.astro`** — Home
- **`[locale]/motivation.astro`** — Why Simpli (`motivation-content.ts` + translations)
- **`[locale]/roots.astro`** — Language roots (`pages.roots` in translations)
- **`[locale]/grammar.astro`** — Grammar overview (`grammarOverview` in translations)
- **`[locale]/grammar-rules.astro`** — Full rules (`grammarRulesPage` + `grammarNumbers`)
- **`[locale]/vocabulary.astro`** — Vocabulary strategy (`pages.vocabulary`)
- **`[locale]/spelling.astro`** — Spelling (markdown via `src/page-markdown/spelling/`)
- **`[locale]/spelling/alphabet-rationale.astro`** — Alphabet rationale (markdown)
- **`[locale]/numbers-dates-time.astro`** — Numbers, dates & time (markdown via `src/page-markdown/numbers-dates-time/`)
- **`[locale]/comparison.astro`** — Comparison tables
- **`[locale]/samples.astro`** — Sample Simpli texts
- **`[locale]/essential-words.astro`** — Essential words by category
- **`[locale]/discussion.astro`**, **`next-steps.astro`**, **`lessons.astro`**, **`tools.astro`**
- **`[locale]/vocabulary-5000.astro`** (+ `.json.ts`, `.csv.ts`) — 5,000-word dictionary
- **`[locale]/vocabulary-1500.astro`** (+ `.json.ts`, `.csv.ts`) — 1,500-word list
- **`[locale]/media/`** — Promo index + printable leaflet

Each `[locale]` page calls `getStaticPaths()` → `localeParams` from `src/i18n.ts` and resolves copy with `getTranslations(lang)`.

Nav labels and groups: `src/translations/[locale].json` → `nav.*` (see `Header.astro`).

Home page includes a **Start learning** banner (lessons → tools → samples). Next steps sections use `#interact`, `#learn`, `#promote` anchors.

Static share SVG: [`public/media/`](../../public/media/).
