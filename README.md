# Simpli is a simple international language

**Simpli is a simple international language**—a proposed international auxiliary language combining:

- **Grammar:** Indonesian-style analytic grammar (no conjugation, no gender, minimal rules)
- **Vocabulary:** Simplified English with phonetic spelling
- **Phonology:** Restricted phoneme set for global pronounceability

Target: basic conversation in **~30–80 hours** for people who already know some English.

## Website

The public site is **[simpli.global](https://simpli.global)**. This repository builds that multilingual (English, French, Spanish) site: the language concept, motivation, roots, grammar, vocabulary, spelling, comparison with other languages, sample texts, starter lessons, lookup tools, media downloads, and next steps (community, reference materials, promotion).

Page folder documentation lives in [`src/pages/_README.md`](src/pages/_README.md) (underscore prefix — Astro ignores it as a route).

**Prerequisites:** Node **20.19+** (LTS) and npm **9.6.5+**. Astro 5 and its toolchain declare newer engines than Debian 12’s default packages (`nodejs` 18.20.x, `npm` 9.2.x), so you may see `EBADENGINE` until you upgrade—for example install [Node.js](https://nodejs.org/) directly or use **[nvm](https://github.com/nvm-sh/nvm)** (`nvm install 20`) so `node` / `npm` on your `PATH` meet `package.json` → `engines`. With **nvm**, use a new terminal (or `source ~/.bashrc`) so `npm` works in the shell; **`make`** prepends nvm’s latest `versions/node/*/bin` because Make runs recipes with `/bin/sh`, which does not load your bash startup files.

- **Run locally:** `npm install` then `npm run dev`
- **Build:** `npm run build` (output in `dist/`)
- **Preview build:** `npm run preview`

### Community links (optional)

Copy `.env.example` to `.env` and set **`PUBLIC_DISCORD_INVITE_URL`**, **`PUBLIC_FORUM_URL`**, and/or **`PUBLIC_CONTACT_EMAIL`** so **Next steps** and **Discussion** show real links instead of placeholders.

### New routes (high level)

- **`/[locale]/lessons`** — Starter lessons
- **`/[locale]/tools`** — 5,000-word lookup (loads locale JSON)
- **`/[locale]/media`** — Leaflet + share assets
- **`/[locale]/vocabulary-5000`** — Searchable 5,000-word dictionary (en / fr / es)
- **`/[locale]/vocabulary-5000.json`** / **`.csv`** — Machine-readable dictionary exports
- **`/[locale]/vocabulary-1500`** — Compact 1,500-word list (subset of the dictionary)
- **`/[locale]/vocabulary-1500.json`** / **`.csv`** — Exports for the compact list

## Multilingual (i18n)

The site uses the **Astro i18n Starter** theme pattern and path-based locales:

- **URLs:** `/[locale]/` for every page (e.g. `/en/`, `/fr/`, `/es/`). Root `/` redirects to `/en/`.
- **Content:** Page files live under `src/pages/en/`, `src/pages/fr/`, `src/pages/es/`. UI strings are in `src/translations/[locale].json`.
- **Layout:** `src/layouts/Base.astro` (from the theme); header/footer and language switcher in `src/components/`.
- **Fallback:** Configured in `astro.config.mjs`; sitemap includes all locales.

### Adding a new language

1. Add the locale to `astro.config.mjs` (`i18n.locales`) and `src/locales.ts` (`LOCALES_SETTING`).
2. Create `src/pages/[new-locale]/` and add one `.astro` file per page (copy from `en/`, set `lang = '[new-locale]'` and load the new translation file).
3. Create `src/translations/[new-locale].json` with the same keys as `en.json`, translated.

## Spec (reference)

For **why** past choices were made (distilled from early project chats), see [HISTORY.md](HISTORY.md). The spec remains authoritative for current rules.

The [spec/](spec/) folder holds the language specification as reference docs:

- [spec/ORTHOGRAPHY.md](spec/ORTHOGRAPHY.md) — Alphabet, spelling rules, long vowels (see also [Alphabet rationale](/en/spelling/alphabet-rationale) for V/W and i/y)
- [spec/GRAMMAR.md](spec/GRAMMAR.md) — Core grammar rules (SVO, possession, questions, etc.)
- [spec/VOCABULARY.md](spec/VOCABULARY.md) — Vocabulary strategy and link to essential words

## Design principles

1. **One sound = one spelling** (no silent letters, no “th”)
2. **No verb conjugation** — time with words (yesterde, now, tumoro); optional wil / hav for future or past; alredi / stil for aspect
3. **Possession:** noun + possessor (*haus mi* = my house)
4. **Long vowels** to avoid collisions (e.g. *it* vs *iit* for “eat”)

## Quick example

```
wer yu from ?
mi from frans.

wat yu du ?
mi wok wit komputer and langwidj.
```

*Where are you from? I'm from France. What do you do? I work with computers and languages.*

## Status

Simpli is a **concept specification**. This repo contains the website and the reference spec for learners and contributors.
