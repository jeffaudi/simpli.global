# Scripts

| Script | Purpose |
|--------|---------|
| [`bootstrap-vocab-5000-json.mjs`](bootstrap-vocab-5000-json.mjs) | Create `vocabulary-5000.fr.json` / `.es.json` from the English builder + 1,500-word translations (English gloss for new entries). Run: `npm run vocab:5000:bootstrap` |
| [`generate-vocab-5000-i18n.mjs`](generate-vocab-5000-i18n.mjs) | Google Translate into `vocabulary-5000.{locale}.json`. The locale files are already filled; this script overwrites them. |
| [`generate_vocab_translations.mjs`](generate_vocab_translations.mjs) | Legacy: FR/ES for the 1,500-word list from built HTML |
| [`generate_vocab_translations.py`](generate_vocab_translations.py) | Alternative 1,500-word translator (MyMemory) |
| [`build-spec-pdf.py`](build-spec-pdf.py) | Build archived spec PDF from `spec/SIMPLI-SPECIFICATION.md`. Run: `npm run build:spec-pdf` (needs `pip install reportlab`; fonts in [`fonts/dejavu/`](fonts/dejavu/)) |
| [`audit-simpli-examples.mjs`](audit-simpli-examples.mjs) | Check Simpli prose examples against the 5,000-word list. Run: `node --import tsx/esm scripts/audit-simpli-examples.mjs` |
| [`check-translations.mjs`](check-translations.mjs) | Reject unknown keys and disallowed HTML in locale JSON. Run: `npm run check:translations` (also runs at the start of `npm run build`) |
| [`generate-ui-translations.mjs`](generate-ui-translations.mjs) | Machine-translate `en.json` into the European, Arabic, and Russian UI drafts. Run: `npm run i18n:ui` or `npm run i18n:ui -- --locale de` |

**5,000-word dictionary workflow**

1. `npm run vocab:5000:bootstrap` — required before first build (creates FR/ES JSON stubs).
2. `npm run build` — emits `/[locale]/vocabulary-5000.json`.
3. Leave the locale JSON files as they are. `npm run vocab:5000:i18n` replaces their glosses with Google Translate.
