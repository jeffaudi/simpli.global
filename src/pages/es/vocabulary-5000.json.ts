import type { APIRoute } from 'astro';
import vocabulary5000Es from '@/data/vocabulary-5000.es.json';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary5000Es), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
