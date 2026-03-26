import { readFile, writeFile } from 'node:fs/promises';
import { translate } from '@vitalets/google-translate-api';

const EN_PAGE = new URL('../dist/en/vocabulary-1500/index.html', import.meta.url);
const OUT_FR = new URL('../src/data/vocabulary-1500.fr.json', import.meta.url);
const OUT_ES = new URL('../src/data/vocabulary-1500.es.json', import.meta.url);

function parseEntries(html) {
  const rows = [...html.matchAll(/<tr>\s*<td><code>(.*?)<\/code><\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/g)];
  return rows.map((m) => ({ simpli: m[1], english: m[2] }));
}

function splitByNewline(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function translateChunk(words, to) {
  const joined = words.join('\n');
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { text } = await translate(joined, { to });
      const lines = splitByNewline(text);
      if (lines.length === words.length) return lines;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }

  // Fallback: translate word-by-word if line split failed.
  const out = [];
  for (const word of words) {
    const { text } = await translate(word, { to });
    out.push(text.trim());
    await new Promise((r) => setTimeout(r, 70));
  }
  return out;
}

async function translateAll(words, to) {
  const chunkSize = 100;
  const translated = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize);
    const out = await translateChunk(chunk, to);
    translated.push(...out);
    console.log(`[${to}] ${Math.min(i + chunkSize, words.length)}/${words.length}`);
  }
  return translated;
}

async function main() {
  const html = await readFile(EN_PAGE, 'utf8');
  const entries = parseEntries(html);
  const english = entries.map((e) => e.english);

  const fr = await translateAll(english, 'fr');
  const es = await translateAll(english, 'es');

  const frEntries = entries.map((e, i) => ({ simpli: e.simpli, translation: fr[i] ?? e.english }));
  const esEntries = entries.map((e, i) => ({ simpli: e.simpli, translation: es[i] ?? e.english }));

  await writeFile(OUT_FR, JSON.stringify(frEntries, null, 2) + '\n', 'utf8');
  await writeFile(OUT_ES, JSON.stringify(esEntries, null, 2) + '\n', 'utf8');
  console.log(`Generated ${frEntries.length} FR and ${esEntries.length} ES entries.`);
}

main();
