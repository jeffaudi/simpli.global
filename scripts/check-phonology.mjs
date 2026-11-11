/**
 * Fail when the pronunciation inventory, locale explanations, or
 * spec/PRONUNCIATION.md drift apart. Prints listener-test items; those do not fail the run.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ART_IDS, PHONEMES, phonologyErrors } from '../src/data/phonology.ts';
import { PHONOLOGY_EXAMPLES, PHONOLOGY_NOTES } from '../src/data/phonology-examples.ts';
import { LOCALES_SETTING } from '../src/locales.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const copyDir = join(root, 'src/data/phonology-copy');
const errors = [];

for (const error of phonologyErrors()) errors.push(error);

const locales = Object.keys(LOCALES_SETTING);
const files = readdirSync(copyDir).filter((name) => name.endsWith('.json')).sort();
const seen = new Set(files.map((name) => name.replace(/\.json$/, '')));
for (const locale of locales) {
  if (!seen.has(locale)) errors.push(`missing pronunciation copy for ${locale}`);
}
for (const locale of seen) {
  if (!locales.includes(locale)) errors.push(`pronunciation copy for unknown locale ${locale}`);
}

const english = JSON.parse(readFileSync(join(copyDir, 'en.json'), 'utf8'));
const englishKeys = Object.keys(english).filter((key) => key !== 'art').sort();
const slashIpa = /\/[^\s/]{1,16}\//;

function walk(value, path, locale) {
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) walk(value[key], `${path}.${key}`, locale);
    return;
  }
  if (typeof value !== 'string') {
    errors.push(`${locale} ${path} should be a string`);
    return;
  }
  if (/[<>]/.test(value)) errors.push(`${locale} ${path} must not contain HTML`);
  if (slashIpa.test(value)) errors.push(`${locale} ${path} must not redefine IPA`);
}

for (const file of files) {
  if (!/^[a-z]{2,3}\.json$/.test(file)) errors.push(`${file} is not a loadable locale filename`);
  const locale = file.replace(/\.json$/, '');
  let data;
  try {
    data = JSON.parse(readFileSync(join(copyDir, file), 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }
  const keys = Object.keys(data).filter((key) => key !== 'art').sort();
  for (const key of englishKeys) {
    if (!(key in data)) errors.push(`${file} missing ${key}`);
  }
  for (const key of keys) {
    if (!englishKeys.includes(key)) errors.push(`${file} unknown ${key}`);
  }
  if (!data.art || typeof data.art !== 'object') {
    errors.push(`${file} missing art`);
  } else {
    for (const art of ART_IDS) {
      if (typeof data.art[art] !== 'string' || !data.art[art]) errors.push(`${file} missing art.${art}`);
    }
    for (const art of Object.keys(data.art)) {
      if (!ART_IDS.includes(art)) errors.push(`${file} unknown art.${art}`);
    }
  }
  walk(data, file, locale);
  for (const token of ['{word}', '{gloss}', '{link}']) {
    for (const key of englishKeys) {
      const source = english[key];
      if (typeof source === 'string' && source.includes(token) && !String(data[key] ?? '').includes(token)) {
        errors.push(`${file} ${key} must keep ${token}`);
      }
    }
  }
}

const ids = new Set(PHONEMES.map((phoneme) => phoneme.id));
for (const [id, examples] of Object.entries(PHONOLOGY_EXAMPLES)) {
  if (!ids.has(id)) errors.push(`example for unknown phoneme ${id}`);
  for (const locale of Object.keys(examples)) {
    if (!locales.includes(locale)) errors.push(`example ${id} has unknown locale ${locale}`);
    const example = examples[locale];
    if (!example?.word) errors.push(`example ${id}/${locale} needs a word`);
  }
}
for (const [id, notes] of Object.entries(PHONOLOGY_NOTES)) {
  if (!ids.has(id)) errors.push(`note for unknown phoneme ${id}`);
  for (const locale of Object.keys(notes)) {
    if (!locales.includes(locale)) errors.push(`note ${id} has unknown locale ${locale}`);
  }
}
for (const phoneme of PHONEMES) {
  const inherited = { aa: 'a', ee: 'e', ii: 'i', oo: 'o', uu: 'u' }[phoneme.id];
  if (inherited) continue;
  if (phoneme.group === 'diphthong') continue;
  if (!PHONOLOGY_EXAMPLES[phoneme.id]) errors.push(`no example map for ${phoneme.id}`);
}

const spec = readFileSync(join(root, 'spec/PRONUNCIATION.md'), 'utf8');
for (const phoneme of PHONEMES) {
  const row = new RegExp(`^\\| ${phoneme.id} \\| ${phoneme.ipa.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|`, 'm');
  if (!row.test(spec)) errors.push(`spec/PRONUNCIATION.md missing ${phoneme.id} ${phoneme.ipa}`);
}

const listener = [];
for (const phoneme of PHONEMES) {
  for (const ipa of phoneme.listenerCheck) listener.push(`${phoneme.id} ${ipa}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`phonology check ok (${locales.length} locales, ${PHONEMES.length} phonemes)`);
console.log(`listener checks, not failures: ${listener.join(', ')}`);
