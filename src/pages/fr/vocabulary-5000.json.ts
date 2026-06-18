import type { APIRoute } from 'astro';
import vocabulary5000Fr from '@/data/vocabulary-5000.fr.json';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary5000Fr), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
