# Data (`src/data`)

Shared content consumed by Astro pages and build-time endpoints.

| Source | Shape | Used by |
|--------|--------|---------|
| [`essential-words.ts`](essential-words.ts) | Categories → Simpli word arrays (includes time/aspect markers: `wil`, `hav`, `olredi`, `stil`) | Essential words page, starter lessons |
| [`vocabulary-build.ts`](vocabulary-build.ts) | Shared CMU + frequency → Simpli spelling pipeline; **v/w rule**: use `w` when English spells `w` (start or inside), else `v` | `vocabulary-1500.ts`, `vocabulary-5000.ts` |
| [`vocabulary-1500.ts`](vocabulary-1500.ts) | Builds `{ simpli, english }[]` (1,500 entries) | EN compact table, `/en/vocabulary-1500.json`, `.csv` |
| [`vocabulary-5000.ts`](vocabulary-5000.ts) | Builds `{ simpli, english }[]` (5,000 entries) | EN dictionary, `/en/vocabulary-5000.json`, `.csv`, tools lookup |
| [`vocabulary-1500.fr.json`](vocabulary-1500.fr.json) | `{ simpli, translation }[]` | FR compact table |
| [`vocabulary-1500.es.json`](vocabulary-1500.es.json) | `{ simpli, translation }[]` | ES compact table |
| [`vocabulary-5000.fr.json`](vocabulary-5000.fr.json) | `{ simpli, translation }[]` | FR dictionary, `/fr/vocabulary-5000.json`, `.csv` |
| [`vocabulary-5000.es.json`](vocabulary-5000.es.json) | `{ simpli, translation }[]` | ES dictionary, `/es/vocabulary-5000.json`, `.csv` |
| [`simpli-examples.ts`](simpli-examples.ts) | Canonical Simpli example phrases (5,000-word spellings) | Samples, leaflets, lessons, comparison |
| [`pedagogy-structure.json`](pedagogy-structure.json) | HTML structure for spelling, alphabet rationale, and numbers pages (strings live in translations) | Those three pages, via `src/lib/pedagogy.ts` |
| [`vocabulary-locale.ts`](vocabulary-locale.ts) | Loads `vocabulary-5000.{locale}.json` via glob | `[locale]/vocabulary-5000*` routes |

**Dictionary i18n:** `npm run build` then `npm run vocab:5000:i18n -- --locale [code]` (see `scripts/generate-vocab-5000-i18n.mjs` → `VOCAB_LOCALES`). Asian codes: `zh`, `vi`, `th`, `km`, `lo`, `fil`, `id`, `ms`, `ja`, `ko`. Filipino uses Google `tl`. Pilot: `npm run vocab:5000:i18n:id`.
