import type { APIRoute } from 'astro';
import vocabulary1500Fr from '@/data/vocabulary-1500.fr.json';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary1500Fr), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
