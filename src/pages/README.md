# Pages

Astro pages for [simpli.global](https://simpli.global). Each locale has its own subfolder: `en/`, `fr/`, `es/`.

## Structure

- **index.astro** — Home
- **motivation.astro** — Why Simpli
  - Includes rationale notes on positioning ("not simplified English"), strategic strengths, and scalability conditions/risks.
- **roots.astro** — Language roots
- **grammar.astro** — Grammar overview
- **grammar-rules.astro** — Detailed grammar rules
- **vocabulary.astro** — Vocabulary strategy
- **spelling.astro** — Spelling rules, letter mappings, long vowels (with link to Alphabet rationale)
- **spelling/alphabet-rationale.astro** — Subpage: why W not V, why i and y, full letter details
- **comparison.astro** — Comparison with other languages
- **samples.astro** — Sample texts in Simpli
- **essential-words.astro** — Essential words by category (data from `src/data/essential-words.ts`)
- **discussion.astro** — Topics for discussion (open debates, e.g. ch/tj; link to Discord coming soon)
- **next-steps.astro** — Community and next steps

Nav is defined in `src/components/Header.astro`; labels come from `src/translations/[locale].json` under `nav.*`.
