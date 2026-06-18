import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const asianLocales = ['zh', 'vi', 'th', 'km', 'lo', 'fil', 'id', 'ms', 'ja', 'ko'];

const fallback = Object.fromEntries(
  [...asianLocales, 'fr', 'es'].map((locale) => [locale, 'en']),
);

export default defineConfig({
  site: 'https://simpli.global',
  redirects: {
    '/': '/en/',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', ...asianLocales],
    fallback,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
          es: 'es-ES',
          zh: 'zh-CN',
          ja: 'ja-JP',
          ko: 'ko-KR',
          vi: 'vi-VN',
          th: 'th-TH',
          km: 'km-KH',
          lo: 'lo-LA',
          fil: 'fil-PH',
          id: 'id-ID',
          ms: 'ms-MY',
        },
      },
    }),
  ],
});
