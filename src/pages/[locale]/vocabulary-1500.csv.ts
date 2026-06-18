import type { APIRoute } from 'astro';
import { glossFor1500, loadVocabulary1500 } from '@/data/vocabulary-locale';
import { localeParams, type Lang } from '@/i18n';

export const prerender = true;

function escapeCsv(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

export function getStaticPaths() {
  return localeParams;
}

export const GET: APIRoute = async ({ params }) => {
  const lang = (params.locale ?? 'en') as Lang;
  const rows = await loadVocabulary1500(lang);
  const glossHeader = lang === 'en' ? 'english' : 'translation';
  const lines = [
    `${glossHeader},simpli`,
    ...rows.map((e) => `${escapeCsv(glossFor1500(lang, e))},${escapeCsv(e.simpli)}`),
  ];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
