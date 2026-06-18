import type { APIRoute } from 'astro';
import { vocabulary1500 } from '@/data/vocabulary-1500';

export const prerender = true;

function escapeCsv(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

export const GET: APIRoute = () => {
  const lines = ['simpli,english', ...vocabulary1500.map((e) => `${escapeCsv(e.simpli)},${escapeCsv(e.english)}`)];
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
