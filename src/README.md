# Source (learn-simpli.org)

- **`layouts/Base.astro`** — Main layout (from Astro i18n Starter theme). Receives `lang` and loads `translations/[lang].json` for Header/Footer.
- **`components/`** — Header (nav + language switcher), Footer, and i18n helpers (LocaleSelect, LocaleSuggest, LocalesHomeList).
- **`pages/`** — Root `index.astro` (redirect to /en/), `404.astro`, and locale folders `en/`, `fr/`, `es/` with one page per route (index, motivation, roots, grammar, …).
- **`translations/`** — UI strings per locale: `en.json`, `fr.json`, `es.json` (nav, home, words labels).
- **`data/`** — Shared content: `essential-words.ts`, `motivation-content.ts`.
- **`i18n.ts`** — Locale list, `useTranslations`, `getLocalePaths`, `localeParams` (from theme).
- **`locales.ts`** — Locale config (en, fr, es) for theme and sitemap.
- **`consts.ts`** — Site title/description (Multilingual) for Base layout.
- **`styles/`** — Theme CSS (reset, base, layout) and Simpli content styles (cards, tables, simpli-block).
