import type { APIRoute } from 'astro';
import { glossFor5000, loadVocabulary5000 } from '@/data/vocabulary-locale';
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
  const rows = await loadVocabulary5000(lang);
  const glossHeader = lang === 'en' ? 'english' : 'translation';
  const lines = [
    `simpli,${glossHeader}`,
    ...rows.map((e) => `${escapeCsv(e.simpli)},${escapeCsv(glossFor5000(lang, e))}`),
  ];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
