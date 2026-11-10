# Source (simpli.global site)

- **`layouts/Base.astro`** — Main layout. Loads `getTranslations(locale)` for Header/Footer.
- **`components/`** — Header (nav + grouped language switcher), Footer, i18n helpers (LocaleSelect, LocaleSuggest, LocalesHomeList).
- **`pages/[locale]/`** — Single dynamic route tree for all locales (see [`pages/_README.md`](pages/_README.md)).
- **`translations/`** — All locale strings (`en.json`, `zh.json`, …). See [`translations/README.md`](translations/README.md).
- **`lib/translations.ts`** — Loads translation JSON and falls back to English per key.
- **`lib/pedagogy.ts`** — Renders spelling, alphabet-rationale, and numbers pages from those strings.
- **`lib/fonts.ts`** — Script-specific Google Noto font stacks.
- **`data/`** — Vocabulary lists, pedagogy HTML structure, `vocabulary-locale.ts`.
- **`i18n.ts`** — `Lang`, `localeParams`, `getLocalePaths`.
- **`locales.ts`** — Locale labels, BCP-47 tags, `script`, `region` (switcher optgroups).
- **`community-links.ts`** — Optional env-based Discord/forum/contact links.
- **`styles/`** — Theme and Simpli content CSS.
