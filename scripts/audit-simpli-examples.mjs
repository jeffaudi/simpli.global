/**
 * Audit Simpli example tokens against the 5,000-word list.
 * Run: node --import tsx/esm scripts/audit-simpli-examples.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { buildVocabulary } from '../src/data/vocabulary-build.ts';
import { essentialWords } from '../src/data/essential-words.ts';

const ROOT = new URL('..', import.meta.url).pathname;
const vocab = buildVocabulary(5000);
const simpliSet = new Set(vocab.map((e) => e.simpli));
const englishToSimpli = new Map(vocab.map((e) => [e.english, e.simpli]));

for (const words of Object.values(essentialWords)) {
  for (const w of words) simpliSet.add(w);
}

const PROPER_NOUNS = new Set(['frans', 'london', 'simpli']);

const SKIP_PATH_PARTS = [
  '/spelling/',
  '/spelling.astro',
  'vocabulary-5000.astro',
];

function collectFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (['node_modules', 'dist', '.astro', 'data'].includes(name)) continue;
      collectFiles(p, out);
    } else if (/\.(astro|md)$/.test(name)) {
      out.push(p);
    }
  }
  return out;
}

function extractBlocks(content) {
  const blocks = [];
  for (const m of content.matchAll(/class="simpli-block"[^>]*>([\s\S]*?)<\/(?:pre|div)>/gi)) {
    blocks.push(m[1]);
  }
  for (const m of content.matchAll(/<pre[^>]*simpli-block[^>]*>([\s\S]*?)<\/pre>/gi)) {
    blocks.push(m[1]);
  }
  return blocks;
}

function extractEmSimpli(content) {
  const out = [];
  for (const m of content.matchAll(/<em>([^<]+)<\/em>/g)) {
    const t = m[1].trim();
    // Simpli examples: lowercase-led, no spaces-only English sentences
    if (/^[a-z0-9][^A-Z]*$/.test(t) || /^[a-z].*\s[a-z]/.test(t)) {
      if (!/^(it|vs|go|good|give|language|yellow|yes|you|year|have|seven|water|woman|move|live|river|even|address)$/i.test(t)) {
        out.push(t);
      }
    }
  }
  return out;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[.,!?;:]/g, ' ')
    .split(/\s+/)
    .flatMap((t) => t.split(/(?<=[a-z])-(?=[a-z])/))
    .map((t) => t.replace(/^['"]|['"]$/g, ''))
    .filter((t) => /^[a-z][a-z'-]*$/.test(t) && t.length > 1);
}

const snippets = new Map();

function addSnippet(file, text, kind) {
  const key = text.trim();
  if (!snippets.has(key)) snippets.set(key, []);
  snippets.get(key).push({ file: relative(ROOT, file), kind });
}

const files = [
  ...collectFiles(join(ROOT, 'src/pages')),
  ...collectFiles(join(ROOT, 'src/components')),
  join(ROOT, 'spec/GRAMMAR.md'),
  join(ROOT, 'spec/SIMPLI-SPECIFICATION.md'),
  join(ROOT, 'public/spec/simpli-specification-v0.1.md'),
  join(ROOT, 'src/data/simpli-examples.ts'),
].filter((f) => {
  try {
    statSync(f);
    return true;
  } catch {
    return false;
  }
});

for (const file of files) {
  const rel = relative(ROOT, file);
  if (SKIP_PATH_PARTS.some((part) => rel.includes(part))) continue;
  const content = readFileSync(file, 'utf8');
  if (file.endsWith('simpli-examples.ts')) {
    for (const m of content.matchAll(/`([^`]+)`/g)) addSnippet(file, m[1], 'examples');
    continue;
  }
  for (const block of extractBlocks(content)) addSnippet(file, block, 'block');
  for (const em of extractEmSimpli(content)) addSnippet(file, em, 'em');
  // *word* in markdown spec
  if (file.endsWith('.md')) {
    for (const m of content.matchAll(/\*([a-z][a-z0-9\s-]{1,40})\*/g)) {
      if (m[1].includes(' ')) addSnippet(file, m[1], 'md');
    }
  }
}

// translation exercise answers + em in grammar strings
for (const loc of ['en', 'es', 'fr']) {
  const j = JSON.parse(readFileSync(join(ROOT, `src/translations/${loc}.json`), 'utf8'));
  for (const [k, v] of Object.entries(j.grammarRulesPage ?? {})) {
    if (typeof v === 'string' && v.includes('<em>')) {
      for (const m of v.matchAll(/<em>([^<]+)<\/em>/g)) addSnippet(`src/translations/${loc}.json`, m[1], k);
    }
  }
  for (const [k, v] of Object.entries(j.grammarOverview ?? {})) {
    if (typeof v === 'string' && v.includes('<em>')) {
      for (const m of v.matchAll(/<em>([^<]+)<\/em>/g)) addSnippet(`src/translations/${loc}.json`, m[1], k);
    }
  }
  for (const v of Object.values(j.lessonsPage ?? {})) {
    if (typeof v === 'string' && /^mi |^el |^yu |^wer |^wat |^tumoro|^yesterde/.test(v)) {
      addSnippet(`src/translations/${loc}.json`, v, 'lesson');
    }
  }
}

const issues = new Map();

for (const [snippet, sources] of snippets) {
  for (const word of tokenize(snippet)) {
    if (PROPER_NOUNS.has(word)) continue;
    if (simpliSet.has(word)) continue;
    if (!issues.has(word)) issues.set(word, { sources: new Set(), suggestions: [] });
    for (const s of sources) issues.get(word).sources.add(`${s.file} [${s.kind}]`);
    const sug = englishToSimpli.get(word);
    if (sug && !issues.get(word).suggestions.includes(sug)) {
      issues.get(word).suggestions.push(sug);
    }
  }
}

const sorted = [...issues.entries()].sort((a, b) => a[0].localeCompare(b[0]));

console.log(`Checked ${snippets.size} snippets; ${sorted.length} unknown token(s):\n`);
for (const [word, { sources, suggestions }] of sorted) {
  console.log(`  ${word}`);
  if (suggestions.length) console.log(`    → from English gloss: ${suggestions.join(', ')}`);
  for (const s of [...sources].slice(0, 2)) console.log(`    - ${s}`);
  if (sources.size > 2) console.log(`    ... +${sources.size - 2}`);
}
