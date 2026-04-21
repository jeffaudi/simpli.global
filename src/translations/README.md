# Translations

JSON files (`en.json`, `es.json`, `fr.json`) hold **UI strings** for each locale. Keep **keys identical** across all three files so every page can rely on the same `t.*` paths.

- **`discussion`** — Discussion page cards (e.g. `topicPlaceNamesTitle` / `topicPlaceNamesDesc`).
- **`pages.roots`** — Full [Roots](/en/roots) page body (`leadP`, section headings, `spellingP`, links to grammar / vocabulary).
- **`grammarOverview`** — [Grammar](/en/grammar) overview: `lead`, bullet list items (HTML), `fullListLink`.
- **`grammarRulesPage`** — [Grammar rules](/en/grammar-rules): `metaTitle`, `metaDescription`, `intro`, `section*Title` / `section*Body` for each rule block, `backToGrammarOverview`.
- **`grammarPage`** / **`grammarNumbers`** — Numbers bullet on the grammar overview and the numbers section on grammar rules.

Simpli examples in strings stay **unchanged** across locales where they are the language being described.
