import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from '@/i18n';

export type PedagogyNode = {
  tag: string;
  attrs?: string;
  /** Translation key inside the page string map. */
  key?: string;
  /** Inner HTML that is the same in every locale (notation, Simpli examples). */
  html?: string;
  children?: PedagogyNode[];
};

function rewriteLinks(html: string, lang: Lang, slug: string): string {
  const resolve = (rel: string) => {
    const parts = slug.split('/').concat(rel.split('/'));
    const stack: string[] = [];
    for (const part of parts) {
      if (part === '' || part === '.') continue;
      if (part === '..') stack.pop();
      else stack.push(part);
    }
    return getRelativeLocaleUrl(lang, stack.join('/'));
  };
  return html
    .replace(/href="(\.\.?\/[^"]*)"/g, (_, href: string) => `href="${resolve(href)}"`)
    .replace(/href="\.\."/g, () => `href="${resolve('..')}"`);
}

function inner(node: PedagogyNode, strings: Record<string, string>): string {
  if (node.children?.length) {
    return node.children.map((child) => renderNode(child, strings)).join('');
  }
  if (node.key) return strings[node.key] ?? '';
  return node.html ?? '';
}

function renderNode(node: PedagogyNode, strings: Record<string, string>): string {
  const attrs = node.attrs ?? '';
  return `<${node.tag}${attrs}>${inner(node, strings)}</${node.tag}>`;
}

/** Render a pedagogy page from its structure and the active locale's strings. */
export function renderPedagogy(
  nodes: PedagogyNode[],
  strings: Record<string, string>,
  lang: Lang,
  slug: string,
): string {
  const html = nodes.map((node) => renderNode(node, strings)).join('');
  return rewriteLinks(html, lang, slug);
}
