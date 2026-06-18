# Pages (`src/pages`)

Astro routes for [simpli.global](https://simpli.global). Each locale has its own subfolder: `en/`, `fr/`, `es/`.

**Note:** This file is named `_README.md` because Astro would otherwise compile `README.md` in `pages/` as a live URL.

## Structure

- **index.astro** — Home
- **motivation.astro** — Why Simpli
  - Includes rationale notes on positioning ("not simplified English"), strategic strengths, and scalability conditions/risks.
- **roots.astro** — Language roots; all body copy from `pages.roots` in `src/translations/[locale].json`
- **grammar.astro** — Grammar overview; bullets from `grammarOverview`, numbers line from `grammarPage`
- **grammar-rules.astro** — Full rules from `grammarRulesPage` + `grammarNumbers` in translations (same Astro structure for `en` / `es` / `fr`)
- **vocabulary.astro** — Vocabulary strategy
- **spelling.astro** — Spelling rules, letter mappings, long vowels (with link to Alphabet rationale)
- **spelling/alphabet-rationale.astro** — Subpage: why W not V, why i and y, full letter details
- **comparison.astro** — Comparison with other languages
- **samples.astro** — Sample texts in Simpli
- **essential-words.astro** — Essential words by category (data from `src/data/essential-words.ts`)
- **discussion.astro** — Topics for discussion (open debates, e.g. ch/tj; Discord/forum/contact from env)
- **next-steps.astro** — Community and next steps (shared layout via `src/components/NextStepsContent.astro`)
- **lessons.astro** — Starter lessons + quick exercises
- **vocabulary-5000.astro** (+ `.json.ts`, `.csv.ts`) — Searchable 5,000-word dictionary (tools + exports use this list)
- **vocabulary-1500.astro** (+ `.json.ts`, `.csv.ts`) — Compact 1,500-word subset; table columns are **UI language first** (English, español, or français), **Simpli second**
- **tools.astro** — Lookup against `vocabulary-5000.json` (prototype)
- **media/index.astro**, **media/leaflet.astro** — Promo assets index and printable leaflet

Nav is defined in `src/components/Header.astro`; labels come from `src/translations/[locale].json` under `nav.*`.

Static share SVG lives in [`public/media/`](../../public/media/) (see that folder’s README).
