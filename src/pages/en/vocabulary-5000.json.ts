import type { APIRoute } from 'astro';
import { vocabulary5000 } from '@/data/vocabulary-5000';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(vocabulary5000), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
