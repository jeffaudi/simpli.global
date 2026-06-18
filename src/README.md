# Source (simpli.global site)

- **`layouts/Base.astro`** — Main layout (from Astro i18n Starter theme). Receives `lang` and loads `translations/[lang].json` for Header/Footer.
- **`components/`** — Header (nav + language switcher), Footer, and i18n helpers (LocaleSelect, LocaleSuggest, LocalesHomeList).
- **`pages/`** — Root `index.astro` (redirect to /en/), `404.astro`, and locale folders `en/`, `fr/`, `es/` with one page per route (index, motivation, roots, grammar, …). Folder docs use **`_README.md`** (underscore) so Astro does not emit URLs for README files.
- **`translations/`** — UI strings per locale: `en.json`, `fr.json`, `es.json` (nav, home, words labels).
- **`data/`** — Shared content: `essential-words.ts`, `motivation-content.ts`.
- **`i18n.ts`** — Locale list, `useTranslations`, `getLocalePaths`, `localeParams` (from theme).
- **`locales.ts`** — Locale config (en, fr, es) for theme and sitemap.
- **`consts.ts`** — Site title, default meta description, and SEO description lead (Multilingual) for Base layout; copy reinforces “Simpli is a simple international language” in every locale.
- **`community-links.ts`** — Optional `PUBLIC_DISCORD_INVITE_URL`, `PUBLIC_FORUM_URL`, `PUBLIC_CONTACT_EMAIL` (build-time) for Next steps and Discussion CTAs. See repo root `.env.example`.
- **`styles/`** — Theme CSS (reset, base, layout) and Simpli content styles (cards, tables, simpli-block).
