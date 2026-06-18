# Source (simpli.global site)

- **`layouts/Base.astro`** — Main layout. Loads `getTranslations(locale)` for Header/Footer.
- **`components/`** — Header (nav + grouped language switcher), Footer, i18n helpers (LocaleSelect, LocaleSuggest, LocalesHomeList).
- **`pages/[locale]/`** — Single dynamic route tree for all locales (see [`pages/_README.md`](pages/_README.md)).
- **`translations/`** — UI strings per locale (`en.json`, `zh.json`, …). See [`translations/README.md`](translations/README.md).
- **`page-markdown/`** — Long pedagogy markdown per slug/locale (spelling, alphabet rationale).
- **`content/load.ts`** — Renders page markdown with locale link rewriting.
- **`lib/translations.ts`** — Eager glob loader for translation JSON.
- **`lib/fonts.ts`** — Script-specific Google Noto font stacks.
- **`data/`** — Shared content: vocabulary lists, `motivation-content.ts`, `vocabulary-locale.ts`.
- **`i18n.ts`** — `Lang`, `getLocaleContent`, `localeParams`, `getLocalePaths`.
- **`locales.ts`** — Locale labels, BCP-47 tags, `script`, `region` (switcher optgroups).
- **`consts.ts`** — Site title and SEO strings (`LocaleContent` + English fallback).
- **`community-links.ts`** — Optional env-based Discord/forum/contact links.
- **`styles/`** — Theme and Simpli content CSS.
