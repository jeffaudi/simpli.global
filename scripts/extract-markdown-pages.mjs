/**
 * One-off helper: extract HTML body from locale spelling / alphabet-rationale .astro
 * files into src/content/pages/{slug}/{locale}.md
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(import.meta.url), '..', '..');

const jobs = [
  { slug: 'spelling', astro: 'spelling.astro', stripH1: true },
  { slug: 'spelling/alphabet-rationale', astro: 'spelling/alphabet-rationale.astro', stripH1: true },
];

const locales = ['en', 'fr', 'es'];

function extractLayoutBody(source) {
  const m = source.match(/<Layout[\s\S]*?>\s*([\s\S]*?)\s*<\/Layout>/);
  return m ? m[1].trim() : null;
}

function stripFirstH1(html) {
  return html.replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/i, '');
}

function stripBackLink(html) {
  return html.replace(/^\s*<p><a href="\.\.">[\s\S]*?<\/a><\/p>\s*/i, '');
}

for (const { slug, astro, stripH1 } of jobs) {
  for (const locale of locales) {
    const astroPath = join(root, 'src/pages', locale, astro);
    const outPath = join(root, 'src/content/pages', slug, `${locale}.md`);
    let source;
    try {
      source = await readFile(astroPath, 'utf8');
    } catch {
      console.warn(`skip ${astroPath}`);
      continue;
    }
    let body = extractLayoutBody(source);
    if (!body) {
      console.warn(`no body ${astroPath}`);
      continue;
    }
    if (stripH1) body = stripFirstH1(body);
    if (slug.includes('alphabet-rationale')) {
      body = stripBackLink(body);
      body = `<p><a href="..">← BACK</a></p>\n\n${body}`;
    }
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, `${body.trim()}\n`, 'utf8');
    console.log(`wrote ${outPath}`);
  }
}
