# Pages

Astro pages for the learn-simpli.org site. Each locale has its own subfolder: `en/`, `fr/`, `es/`.

## Structure

- **index.astro** — Home
- **motivation.astro** — Why Simpli
- **roots.astro** — Language roots
- **grammar.astro** — Grammar overview
- **grammar-rules.astro** — Detailed grammar rules
- **vocabulary.astro** — Vocabulary strategy
- **spelling.astro** — Spelling rules, letter mappings, long vowels (with link to Alphabet rationale)
- **spelling/alphabet-rationale.astro** — Subpage: why W not V, why i and y, full letter details
- **comparison.astro** — Comparison with other languages
- **samples.astro** — Sample texts in Simpli
- **essential-words.astro** — Essential words by category (data from `src/data/essential-words.ts`)
- **next-steps.astro** — Community and next steps

Nav is defined in `src/components/Header.astro`; labels come from `src/translations/[locale].json` under `nav.*`.
