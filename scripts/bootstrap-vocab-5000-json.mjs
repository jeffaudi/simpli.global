/**
 * Bootstrap FR/ES JSON for vocabulary-5000 without network.
 * Reuses 1,500-word translations; new entries keep the English gloss until
 * `npm run vocab:5000:i18n` fills in machine translations.
 */
import { writeFile } from 'node:fs/promises';
import { buildVocabulary } from '../src/data/vocabulary-build.ts';
import fr1500 from '../src/data/vocabulary-1500.fr.json' with { type: 'json' };
import es1500 from '../src/data/vocabulary-1500.es.json' with { type: 'json' };

const OUT_FR = new URL('../src/data/vocabulary-5000.fr.json', import.meta.url);
const OUT_ES = new URL('../src/data/vocabulary-5000.es.json', import.meta.url);

function mapFrom(entries) {
  const map = new Map();
  for (const e of entries) map.set(e.simpli, e.translation);
  return map;
}

function toLocale(entries, priorMap) {
  return entries.map((e) => ({
    simpli: e.simpli,
    translation: priorMap.get(e.simpli) ?? e.english,
  }));
}

const en = buildVocabulary(5000);
const fr = toLocale(en, mapFrom(fr1500));
const es = toLocale(en, mapFrom(es1500));

await writeFile(OUT_FR, JSON.stringify(fr, null, 2) + '\n', 'utf8');
await writeFile(OUT_ES, JSON.stringify(es, null, 2) + '\n', 'utf8');

const evil = en.find((e) => e.english === 'evil');
console.log(`Bootstrapped ${en.length} entries. evil → ${evil?.simpli ?? 'not found'}`);
