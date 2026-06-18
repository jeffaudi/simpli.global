# Scripts

| Script | Purpose |
|--------|---------|
| [`bootstrap-vocab-5000-json.mjs`](bootstrap-vocab-5000-json.mjs) | Create `vocabulary-5000.fr.json` / `.es.json` from the English builder + 1,500-word translations (English gloss for new entries). Run: `npm run vocab:5000:bootstrap` |
| [`generate-vocab-5000-i18n.mjs`](generate-vocab-5000-i18n.mjs) | Machine-translate remaining glosses (after `npm run build`). Run: `npm run vocab:5000:i18n` or `npm run vocab:5000:i18n -- --locale es` |
| [`generate_vocab_translations.mjs`](generate_vocab_translations.mjs) | Legacy: FR/ES for the 1,500-word list from built HTML |
| [`generate_vocab_translations.py`](generate_vocab_translations.py) | Alternative 1,500-word translator (MyMemory) |

**5,000-word dictionary workflow**

1. `npm run vocab:5000:bootstrap` — required before first build (creates FR/ES JSON stubs).
2. `npm run build` — emits `/[locale]/vocabulary-5000.json`.
3. `npm run vocab:5000:i18n` — optional; fills French/Spanish for entries beyond the 1,500-word set (may take several minutes; re-run per locale if rate-limited).
