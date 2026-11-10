/**
 * Fail the build when a locale file is invalid, has a key English does not,
 * or introduces HTML that English does not allow.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/translations');
const ALLOWED_TAG = /^<\/?(?:strong|em|sup|sub|br)\s*\/?>$/i;

function leaves(value, path = '', out = new Map()) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of Object.keys(value)) {
      leaves(value[key], path ? `${path}.${key}` : key, out);
    }
    return out;
  }
  out.set(path, value);
  return out;
}

function tags(value) {
  return [...String(value).matchAll(/<\/?[a-z][^>]*>/gi)].map((match) => match[0]);
}

const files = readdirSync(dir).filter((name) => name.endsWith('.json')).sort();
const english = leaves(JSON.parse(readFileSync(join(dir, 'en.json'), 'utf8')));
const french = leaves(JSON.parse(readFileSync(join(dir, 'fr.json'), 'utf8')));
const spanish = leaves(JSON.parse(readFileSync(join(dir, 'es.json'), 'utf8')));
const errors = [];

/** Markup that English, French, and Spanish all keep is Simpli or phonetic, not prose. */
function protectedSnippets(source, fr, es) {
  if (typeof source !== 'string' || typeof fr !== 'string' || typeof es !== 'string') return [];
  const found = [];
  for (const match of source.matchAll(/<(em|strong)>[^<]*<\/\1>/g)) {
    if (fr.includes(match[0]) && es.includes(match[0])) found.push(match[0]);
  }
  return found;
}

for (const file of files) {
  let data;
  try {
    data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }
  if (file === 'en.json') continue;
  const locale = leaves(data);
  for (const [key, value] of locale) {
    if (!english.has(key)) {
      errors.push(`${file}: unknown key ${key}`);
      continue;
    }
    const source = english.get(key);
    if (typeof value !== typeof source) {
      errors.push(`${file}: ${key} should be ${typeof source}`);
      continue;
    }
    if (typeof value !== 'string') continue;
    for (const snippet of protectedSnippets(source, french.get(key), spanish.get(key))) {
      if (!value.includes(snippet)) {
        errors.push(`${file}: ${key} must keep ${snippet}`);
      }
    }
    const sourceTags = new Set(tags(source));
    for (const tag of tags(value)) {
      if (ALLOWED_TAG.test(tag) || sourceTags.has(tag)) continue;
      errors.push(`${file}: ${key} has HTML not allowed by English: ${tag}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`translation check ok (${files.length} files)`);
