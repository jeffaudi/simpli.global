import type { APIRoute } from 'astro';
import vocabulary1500Es from '@/data/vocabulary-1500.es.json';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary1500Es), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
