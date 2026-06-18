import { marked } from 'marked';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '@/i18n';

const pageModules = import.meta.glob<string>('../page-markdown/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function moduleKey(slug: string, lang: string): string {
  return `../page-markdown/${slug}/${lang}.md`;
}

export function loadPageMarkdownRaw(slug: string, lang: Lang): string {
  const key = moduleKey(slug, lang);
  const fallback = moduleKey(slug, 'en');
  const raw = pageModules[key] ?? pageModules[fallback];
  if (!raw) {
    throw new Error(`Missing page content: ${slug}/${lang} (no en fallback)`);
  }
  return raw;
}

/** Render locale markdown to HTML; rewrites internal ./ and ../ links for the active locale. */
export function renderPageMarkdown(slug: string, lang: Lang): string {
  const raw = loadPageMarkdownRaw(slug, lang);
  let html = marked.parse(raw, { async: false }) as string;
  html = html.replace(/href="\.\/([^"]+)"/g, (_, path: string) => {
    const target = path.replace(/\/$/, '');
    return `href="${getRelativeLocaleUrl(lang, target)}"`;
  });
  html = html.replace(/href="\.\.\/?"/g, () => `href="${getRelativeLocaleUrl(lang, slug.split('/')[0])}"`);
  return html;
}
