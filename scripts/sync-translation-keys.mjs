/**
 * Deep-merge missing keys from en.json into fr.json and es.json (en value as fallback).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const en = JSON.parse(await readFile(join(root, 'src/translations/en.json'), 'utf8'));

function mergeMissing(target, source) {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    return target ?? source;
  }
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (!(key in out)) {
      out[key] = source[key];
    } else if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof out[key] === 'object' &&
      out[key] !== null &&
      !Array.isArray(out[key])
    ) {
      out[key] = mergeMissing(out[key], source[key]);
    }
  }
  return out;
}

for (const locale of ['fr', 'es']) {
  const path = join(root, `src/translations/${locale}.json`);
  const current = JSON.parse(await readFile(path, 'utf8'));
  const merged = mergeMissing(current, en);
  await writeFile(path, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`merged ${locale}.json`);
}
