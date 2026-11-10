/**
 * Machine-translate src/translations/en.json into locale drafts.
 *
 * Keeps Simpli examples that French and Spanish leave unchanged, plus HTML tags
 * and the name Simpli. Missing or failed strings are omitted so the site falls
 * back to English for those keys.
 *
 * Usage:
 *   node scripts/generate-ui-translations.mjs
 *   node scripts/generate-ui-translations.mjs --locale de
 *   node scripts/generate-ui-translations.mjs --locale de,ar,ru
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translate } from '@vitalets/google-translate-api';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src/translations');

/** Site locale → Google Translate target */
export const UI_LOCALES = {
  de: 'de',
  it: 'it',
  pt: 'pt-PT',
  pl: 'pl',
  nl: 'nl',
  ro: 'ro',
  el: 'el',
  hu: 'hu',
  cs: 'cs',
  sv: 'sv',
  bg: 'bg',
  da: 'da',
  fi: 'fi',
  sk: 'sk',
  hr: 'hr',
  lt: 'lt',
  sl: 'sl',
  lv: 'lv',
  et: 'et',
  ga: 'ga',
  mt: 'mt',
  ru: 'ru',
  ar: 'ar',
};

const localeArg = process.argv.includes('--locale')
  ? process.argv[process.argv.indexOf('--locale') + 1]
  : 'all';

function localesToRun() {
  if (!localeArg || localeArg === 'all') return Object.keys(UI_LOCALES);
  const codes = localeArg.split(',').map((code) => code.trim()).filter(Boolean);
  const unknown = codes.filter((code) => !(code in UI_LOCALES));
  if (unknown.length) {
    console.error(`Unknown locale: ${unknown.join(', ')}. Use one of: ${Object.keys(UI_LOCALES).join(', ')}, all`);
    process.exit(1);
  }
  return codes;
}

function leaves(value, path = '', out = new Map()) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of Object.keys(value)) leaves(value[key], path ? `${path}.${key}` : key, out);
    return out;
  }
  out.set(path, value);
  return out;
}

function protectedSnippets(source, fr, es) {
  if (typeof source !== 'string' || typeof fr !== 'string' || typeof es !== 'string') return [];
  const found = [];
  for (const match of source.matchAll(/<(em|strong)>[^<]*<\/\1>/g)) {
    if (fr.includes(match[0]) && es.includes(match[0])) found.push(match[0]);
  }
  return found;
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function protect(text, blocks) {
  const tokens = [];
  const take = (piece) => {
    const token = `⟦${tokens.length}⟧`;
    tokens.push(piece);
    return token;
  };
  let out = text;
  const sorted = [...blocks].sort((a, b) => b.length - a.length);
  for (const block of sorted) {
    if (!out.includes(block)) continue;
    out = out.split(block).join(take(block));
  }
  out = out.replace(/Simpli/g, () => take('Simpli'));
  out = out.replace(/<\/?[a-z][^>]*>/gi, (tag) => take(tag));
  return { text: out, tokens };
}

function restore(text, tokens) {
  let out = text;
  tokens.forEach((piece, index) => {
    const token = `⟦${index}⟧`;
    out = out.split(token).join(piece);
    out = out.split(token.replace('⟦', '⟦ ').replace('⟧', ' ⟧')).join(piece);
  });
  return out;
}

function tokensIntact(text, count) {
  for (let index = 0; index < count; index++) {
    if (!text.includes(`⟦${index}⟧`) && !text.includes(`⟦ ${index} ⟧`)) return false;
  }
  return true;
}

async function translateText(text, to) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const { text: translated } = await translate(text, { to, from: 'en' });
      return translated;
    } catch (error) {
      const wait = 800 * attempt;
      console.warn(`[${to}] retry ${attempt}/5 (${error.message ?? error})`);
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }
  return null;
}

function accept(source, translated, blocks) {
  if (typeof translated !== 'string' || !translated.trim()) return false;
  for (const block of blocks) {
    if (!translated.includes(block)) return false;
  }
  const sourceTags = [...String(source).matchAll(/<\/?[a-z][^>]*>/gi)].map((match) => match[0]);
  const outTags = [...translated.matchAll(/<\/?[a-z][^>]*>/gi)].map((match) => match[0]);
  if (sourceTags.length !== outTags.length) return false;
  return sourceTags.every((tag, index) => tag === outTags[index]);
}

async function translateString(source, blocks, to) {
  const { text, tokens } = protect(source, blocks);
  if (!/\p{L}|\p{N}/u.test(text.replace(/⟦\d+⟧/g, ''))) return restore(text, tokens);
  const translated = await translateText(text, to);
  if (translated == null) return null;
  const decoded = decodeEntities(translated).trim();
  if (!tokensIntact(decoded, tokens.length)) return null;
  const restored = restore(decoded, tokens);
  if (!accept(source, restored, blocks)) return null;
  if (/⟦\d+⟧/.test(restored)) return null;
  return restored;
}

function chunkSources(entries, limit = 3500) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const entry of entries) {
    const length = entry.text.length + 1;
    if (current.length && size + length > limit) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(entry);
    size += length;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

async function translateChunk(entries, to) {
  const joined = entries.map((entry) => entry.text).join('\n');
  const translated = await translateText(joined, to);
  if (translated == null) return null;
  const lines = translated.split('\n').map((line) => decodeEntities(line).trim()).filter((line) => line.length > 0);
  if (lines.length !== entries.length) return null;
  return lines;
}

function fill(template, values) {
  if (typeof template === 'string') return values.get(template) ?? undefined;
  if (!template || typeof template !== 'object' || Array.isArray(template)) return template;
  const out = {};
  for (const key of Object.keys(template)) {
    const next = fill(template[key], values);
    if (next !== undefined) out[key] = next;
  }
  return out;
}

function prune(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
  const out = {};
  for (const key of Object.keys(value)) {
    const next = prune(value[key]);
    if (next && typeof next === 'object' && !Array.isArray(next) && !Object.keys(next).length) continue;
    if (next !== undefined) out[key] = next;
  }
  return out;
}

const english = JSON.parse(await readFile(join(dir, 'en.json'), 'utf8'));
const french = leaves(JSON.parse(await readFile(join(dir, 'fr.json'), 'utf8')));
const spanish = leaves(JSON.parse(await readFile(join(dir, 'es.json'), 'utf8')));
const englishLeaves = leaves(english);

const jobs = [];
for (const [key, source] of englishLeaves) {
  if (typeof source !== 'string') continue;
  jobs.push({ key, source, blocks: protectedSnippets(source, french.get(key), spanish.get(key)) });
}

const unique = [];
const seen = new Set();
for (const job of jobs) {
  if (seen.has(job.source)) continue;
  seen.add(job.source);
  unique.push(job);
}

for (const code of localesToRun()) {
  const to = UI_LOCALES[code];
  console.log(`\n${code} (${to}): ${unique.length} strings`);
  const done = new Map();
  const pending = unique.map((job) => {
    const masked = protect(job.source, job.blocks);
    const prose = masked.text.replace(/⟦\d+⟧/g, '');
    return { ...job, ...masked, prose };
  });

  const chunks = chunkSources(pending.filter((job) => /\p{L}|\p{N}/u.test(job.prose)));
  const passthrough = pending.filter((job) => !/\p{L}|\p{N}/u.test(job.prose));
  for (const job of passthrough) done.set(job.source, restore(job.text, job.tokens));

  let chunkIndex = 0;
  for (const chunk of chunks) {
    chunkIndex += 1;
    const lines = await translateChunk(chunk, to);
    if (lines) {
      chunk.forEach((job, index) => {
        const restored = restore(lines[index], job.tokens);
        if (accept(job.source, restored, job.blocks) && !/⟦\d+⟧/.test(restored)) {
          done.set(job.source, restored);
        }
      });
    }
    const filled = chunk.filter((job) => done.has(job.source)).length;
    console.log(`  chunk ${chunkIndex}/${chunks.length}: ${filled}/${chunk.length}`);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const missing = pending.filter((job) => !done.has(job.source));
  if (missing.length) console.log(`  retrying ${missing.length} strings one by one`);
  for (const job of missing) {
    const translated = await translateString(job.source, job.blocks, to);
    if (translated) done.set(job.source, translated);
    else console.warn(`  kept English for: ${job.key}`);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  const tree = prune(fill(english, done));
  await writeFile(join(dir, `${code}.json`), `${JSON.stringify(tree, null, 2)}\n`);
  console.log(`${code}: wrote ${done.size}/${unique.length}`);
}
