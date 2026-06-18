import type { APIRoute } from 'astro';
import { vocabulary1500 } from '@/data/vocabulary-1500';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary1500), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
