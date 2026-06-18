/**
 * Build localized JSON for the 5,000-word list.
 *
 * Reuses translations from vocabulary-1500.*.json where the Simpli form matches,
 * then translates remaining English glosses in chunks via Google Translate.
 *
 * Prerequisite: npm run build (reads dist/en/vocabulary-5000.json)
 *
 * Usage:
 *   npm run vocab:5000:i18n -- --locale fr
 *   npm run vocab:5000:i18n -- --locale all
 *   npm run vocab:5000:i18n -- --locale all-asian
 */
import { readFile, writeFile } from 'node:fs/promises';
import { translate } from '@vitalets/google-translate-api';

const EN_JSON = new URL('../dist/en/vocabulary-5000.json', import.meta.url);
const DATA_DIR = new URL('../src/data/', import.meta.url);

/** Site locale code → Google Translate target + optional 1,500-word seed file */
export const VOCAB_LOCALES = {
  fr: { googleTo: 'fr', prior1500: 'vocabulary-1500.fr.json', out: 'vocabulary-5000.fr.json' },
  es: { googleTo: 'es', prior1500: 'vocabulary-1500.es.json', out: 'vocabulary-5000.es.json' },
  zh: { googleTo: 'zh-CN', prior1500: null, out: 'vocabulary-5000.zh.json' },
  vi: { googleTo: 'vi', prior1500: null, out: 'vocabulary-5000.vi.json' },
  th: { googleTo: 'th', prior1500: null, out: 'vocabulary-5000.th.json' },
  km: { googleTo: 'km', prior1500: null, out: 'vocabulary-5000.km.json' },
  lo: { googleTo: 'lo', prior1500: null, out: 'vocabulary-5000.lo.json' },
  fil: { googleTo: 'tl', prior1500: null, out: 'vocabulary-5000.fil.json' },
  id: { googleTo: 'id', prior1500: null, out: 'vocabulary-5000.id.json' },
  ms: { googleTo: 'ms', prior1500: null, out: 'vocabulary-5000.ms.json' },
  ja: { googleTo: 'ja', prior1500: null, out: 'vocabulary-5000.ja.json' },
  ko: { googleTo: 'ko', prior1500: null, out: 'vocabulary-5000.ko.json' },
};

const ASIAN_CODES = ['zh', 'vi', 'th', 'km', 'lo', 'fil', 'id', 'ms', 'ja', 'ko'];

const localeArg = process.argv.find((a) => a.startsWith('--locale='))?.split('=')[1]
  ?? (process.argv.includes('--locale') ? process.argv[process.argv.indexOf('--locale') + 1] : 'all');

function localesToRun() {
  if (localeArg === 'all') return Object.keys(VOCAB_LOCALES);
  if (localeArg === 'all-asian') return ASIAN_CODES.filter((c) => c in VOCAB_LOCALES);
  if (localeArg in VOCAB_LOCALES) return [localeArg];
  console.error(`Unknown --locale ${localeArg}. Use one of: ${Object.keys(VOCAB_LOCALES).join(', ')}, all, all-asian`);
  process.exit(1);
}

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

  for (const code of localesToRun()) {
    const cfg = VOCAB_LOCALES[code];
    const outPath = new URL(cfg.out, DATA_DIR);
    let existing;
    try {
      existing = JSON.parse(await readFile(outPath, 'utf8'));
    } catch {
      existing = null;
    }

    const priorMaps = [];
    if (cfg.prior1500) {
      try {
        const prior1500 = JSON.parse(await readFile(new URL(cfg.prior1500, DATA_DIR), 'utf8'));
        priorMaps.push(translationMap(prior1500));
      } catch {
        console.warn(`[${code}] no prior 1500 file ${cfg.prior1500}`);
      }
    }

    const built = await buildLocale(entries, priorMaps, cfg.googleTo, existing);
    await writeFile(outPath, JSON.stringify(built, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${built.length} ${code} entries → ${cfg.out}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
