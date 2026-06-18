/**
 * Build FR/ES JSON for the 5,000-word list.
 *
 * Reuses translations from vocabulary-1500.*.json where the Simpli form matches,
 * then translates remaining English glosses in chunks via Google Translate.
 *
 * Prerequisite: npm run build (reads dist/en/vocabulary-5000.json)
 *
 * Usage:
 *   npm run vocab:5000:i18n          # both locales
 *   npm run vocab:5000:i18n -- --locale fr
 *   npm run vocab:5000:i18n -- --locale es
 */
import { readFile, writeFile } from 'node:fs/promises';
import { translate } from '@vitalets/google-translate-api';

const EN_JSON = new URL('../dist/en/vocabulary-5000.json', import.meta.url);
const FR_1500 = new URL('../src/data/vocabulary-1500.fr.json', import.meta.url);
const ES_1500 = new URL('../src/data/vocabulary-1500.es.json', import.meta.url);
const OUT_FR = new URL('../src/data/vocabulary-5000.fr.json', import.meta.url);
const OUT_ES = new URL('../src/data/vocabulary-5000.es.json', import.meta.url);

const localeArg = process.argv.find((a) => a.startsWith('--locale='))?.split('=')[1]
  ?? (process.argv.includes('--locale') ? process.argv[process.argv.indexOf('--locale') + 1] : 'all');

function splitByNewline(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function translateChunk(words, to) {
  const joined = words.join('\n');
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const { text } = await translate(joined, { to });
      const lines = splitByNewline(text);
      if (lines.length === words.length) return lines;
    } catch (err) {
      const wait = 1000 * attempt;
      console.warn(`[${to}] chunk retry ${attempt}/5 (${err.message ?? err})`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  const out = [];
  for (const word of words) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const { text } = await translate(word, { to });
        out.push(text.trim());
        break;
      } catch (err) {
        const wait = 1000 * attempt;
        console.warn(`[${to}] word "${word}" retry ${attempt}/5`);
        await new Promise((r) => setTimeout(r, wait));
        if (attempt === 5) out.push(word);
      }
    }
    await new Promise((r) => setTimeout(r, 120));
  }
  return out;
}

async function translateAll(words, to) {
  const chunkSize = 40;
  const translated = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize);
    const out = await translateChunk(chunk, to);
    translated.push(...out);
    console.log(`[${to}] ${Math.min(i + chunkSize, words.length)}/${words.length}`);
    await new Promise((r) => setTimeout(r, 400));
  }
  return translated;
}

function translationMap(entries) {
  const map = new Map();
  for (const e of entries) map.set(e.simpli, e.translation);
  return map;
}

async function buildLocale(entries, priorMaps, to, existingFile) {
  const prior = new Map();
  for (const m of priorMaps) {
    for (const [k, v] of m) prior.set(k, v);
  }

  if (existingFile) {
    const englishBySimpli = new Map(entries.map((e) => [e.simpli, e.english]));
    for (const e of existingFile) {
      if (e.translation !== englishBySimpli.get(e.simpli)) prior.set(e.simpli, e.translation);
    }
  }

  const needTranslate = [];
  const needIndex = [];

  const result = entries.map((e, i) => {
    const hit = prior.get(e.simpli);
    if (hit) return { simpli: e.simpli, translation: hit };
    needTranslate.push(e.english);
    needIndex.push(i);
    return { simpli: e.simpli, translation: e.english };
  });

  if (needTranslate.length === 0) return result;

  console.log(`[${to}] translating ${needTranslate.length} new entries…`);
  const translated = await translateAll(needTranslate, to);
  for (let j = 0; j < needIndex.length; j++) {
    result[needIndex[j]].translation = translated[j] ?? needTranslate[j];
  }
  return result;
}

async function main() {
  const entries = JSON.parse(await readFile(EN_JSON, 'utf8'));
  const fr1500 = JSON.parse(await readFile(FR_1500, 'utf8'));
  const es1500 = JSON.parse(await readFile(ES_1500, 'utf8'));

  if (localeArg === 'all' || localeArg === 'fr') {
    let existingFr;
    try {
      existingFr = JSON.parse(await readFile(OUT_FR, 'utf8'));
    } catch {
      existingFr = null;
    }
    const fr = await buildLocale(entries, [translationMap(fr1500)], 'fr', existingFr);
    await writeFile(OUT_FR, JSON.stringify(fr, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${fr.length} FR entries.`);
  }

  if (localeArg === 'all' || localeArg === 'es') {
    let existingEs;
    try {
      existingEs = JSON.parse(await readFile(OUT_ES, 'utf8'));
    } catch {
      existingEs = null;
    }
    const es = await buildLocale(entries, [translationMap(es1500)], 'es', existingEs);
    await writeFile(OUT_ES, JSON.stringify(es, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${es.length} ES entries.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
