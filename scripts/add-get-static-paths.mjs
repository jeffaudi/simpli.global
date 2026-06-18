import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = join(root, 'src/pages/[locale]');

async function* astroFiles() {
  const entries = await glob('**/*.astro', { cwd: pagesDir });
  for (const e of entries) yield join(pagesDir, e);
}

const snippet = `
export function getStaticPaths() {
  return localeParams;
}
`;

for await (const file of astroFiles()) {
  let src = await readFile(file, 'utf8');
  if (src.includes('getStaticPaths')) continue;
  if (!src.includes("from '@/i18n'")) continue;
  src = src.replace(
    /import \{([^}]*)\} from '@\/i18n';/,
    (m, inner) => {
      const parts = inner.split(',').map((s) => s.trim()).filter(Boolean);
      if (!parts.includes('localeParams')) parts.unshift('localeParams');
      if (!parts.includes('type Lang')) parts.push('type Lang');
      return `import { ${parts.join(', ')} } from '@/i18n';${snippet}`;
    },
  );
  src = src.replace(/interface Props \{\s*lang\?: Lang;\s*\}\n/g, '');
  await writeFile(file, src, 'utf8');
  console.log('updated', file);
}
