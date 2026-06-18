import type { APIRoute } from 'astro';
import { loadVocabulary5000 } from '@/data/vocabulary-locale';
import { localeParams, type Lang } from '@/i18n';

export const prerender = true;

export function getStaticPaths() {
  return localeParams;
}

export const GET: APIRoute = async ({ params }) => {
  const lang = (params.locale ?? 'en') as Lang;
  const data = await loadVocabulary5000(lang);
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
