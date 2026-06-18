import type { APIRoute } from 'astro';
import vocabulary5000Fr from '@/data/vocabulary-5000.fr.json';

export const prerender = true;

type Row = { simpli: string; translation: string };

function escapeCsv(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

export const GET: APIRoute = () => {
  const rows = vocabulary5000Fr as Row[];
  const lines = ['simpli,translation', ...rows.map((e) => `${escapeCsv(e.simpli)},${escapeCsv(e.translation)}`)];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
