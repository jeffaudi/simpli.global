# Learn Simpli

**Simpli** is a proposed international auxiliary language combining:

- **Grammar:** Indonesian-style analytic grammar (no conjugation, no gender, minimal rules)
- **Vocabulary:** Simplified English with phonetic spelling
- **Phonology:** Restricted phoneme set for global pronounceability

Target: basic conversation in **~30–80 hours** for people who already know some English.

## Website

This repository builds the **learn-simpli.org** website: a multilingual (English, French, Spanish) site that presents the language concept, motivation, roots, grammar, vocabulary, spelling, comparison with other languages, sample texts, and next steps (community, learning tools, promotion).

- **Run locally:** `npm install` then `npm run dev`
- **Build:** `npm run build` (output in `dist/`)
- **Preview build:** `npm run preview`

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

The [spec/](spec/) folder holds the language specification as reference docs:

- [spec/ORTHOGRAPHY.md](spec/ORTHOGRAPHY.md) — Alphabet, spelling rules, long vowels (see also [Alphabet rationale](/en/spelling/alphabet-rationale) for why W not V)
- [spec/GRAMMAR.md](spec/GRAMMAR.md) — Core grammar rules (SVO, possession, questions, etc.)
- [spec/VOCABULARY.md](spec/VOCABULARY.md) — Vocabulary strategy and link to essential words

## Design principles

1. **One sound = one spelling** (no silent letters, no “th”)
2. **No verb conjugation** — time with words (yesterde, now, tumoro)
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
