import type { APIRoute } from 'astro';
import vocabulary1500Fr from '@/data/vocabulary-1500.fr.json';

export const prerender = true;

function escapeCsv(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

type Row = { simpli: string; translation: string };

export const GET: APIRoute = () => {
  const rows = vocabulary1500Fr as Row[];
  const lines = ['simpli,french', ...rows.map((e) => `${escapeCsv(e.simpli)},${escapeCsv(e.translation)}`)];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
