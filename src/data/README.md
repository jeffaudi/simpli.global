# Data (`src/data`)

Shared content consumed by Astro pages and build-time endpoints.

| Source | Shape | Used by |
|--------|--------|---------|
| [`essential-words.ts`](essential-words.ts) | Categories → Simpli word arrays (includes time/aspect markers: `wil`, `hav`, `olredi`, `stil`) | Essential words page, starter lessons |
| [`vocabulary-build.ts`](vocabulary-build.ts) | Shared CMU + frequency → Simpli spelling pipeline; **v/w rule**: use `w` when English spells `w` (start or inside), else `v` | `vocabulary-1500.ts`, `vocabulary-5000.ts` |
| [`vocabulary-1500.ts`](vocabulary-1500.ts) | Builds `{ simpli, english }[]` (1,500 entries) | EN compact table, `/en/vocabulary-1500.json`, `.csv` |
| [`vocabulary-5000.ts`](vocabulary-5000.ts) | Builds `{ simpli, english }[]` (5,000 entries) | EN dictionary, `/en/vocabulary-5000.json`, `.csv`, tools lookup |
| `vocabulary-1500.{locale}.json` | `{ simpli, translation }[]`, first 1,500 of the English list | Compact table for every locale except `en` |
| `vocabulary-5000.{locale}.json` | `{ simpli, translation }[]`, 5,000 entries in the same order as `buildVocabulary(5000)` | Dictionary, JSON, and CSV for every locale except `en` |
| [`simpli-examples.ts`](simpli-examples.ts) | Canonical Simpli example phrases (5,000-word spellings) | Samples, leaflets, lessons, comparison |
| [`pedagogy-structure.json`](pedagogy-structure.json) | HTML structure for spelling, alphabet rationale, and numbers pages (strings live in translations; month glosses are `month1`–`month12`) | Those three pages, via `src/lib/pedagogy.ts` |
| [`vocabulary-locale.ts`](vocabulary-locale.ts) | Loads `vocabulary-5000.{locale}.json` via glob | `[locale]/vocabulary-5000*` routes |

**Dictionary glosses** are short equivalents of the English word, one sense, in the same order as the generator. English is built at runtime. Every other site locale has both JSON files. `npm run vocab:5000:i18n` calls Google Translate and overwrites those files.
