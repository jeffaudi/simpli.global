import type { APIRoute } from 'astro';
import vocabulary1500Es from '@/data/vocabulary-1500.es.json';

export const prerender = true;

function escapeCsv(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

type Row = { simpli: string; translation: string };

export const GET: APIRoute = () => {
  const rows = vocabulary1500Es as Row[];
  const lines = ['simpli,spanish', ...rows.map((e) => `${escapeCsv(e.simpli)},${escapeCsv(e.translation)}`)];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
