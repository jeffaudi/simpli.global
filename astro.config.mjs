import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const localeTags = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  pl: 'pl-PL',
  nl: 'nl-NL',
  ro: 'ro-RO',
  el: 'el-GR',
  hu: 'hu-HU',
  cs: 'cs-CZ',
  sv: 'sv-SE',
  bg: 'bg-BG',
  da: 'da-DK',
  fi: 'fi-FI',
  sk: 'sk-SK',
  hr: 'hr-HR',
  lt: 'lt-LT',
  sl: 'sl-SI',
  lv: 'lv-LV',
  et: 'et-EE',
  ga: 'ga-IE',
  mt: 'mt-MT',
  ru: 'ru-RU',
  ar: 'ar',
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
};

const fallback = Object.fromEntries(
  Object.keys(localeTags)
    .filter((locale) => locale !== 'en')
    .map((locale) => [locale, 'en']),
);

export default defineConfig({
  site: 'https://simpli.global',
  redirects: {
    '/': '/en/',
  },
  i18n: {
    defaultLocale: 'en',
    locales: Object.keys(localeTags),
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
        locales: localeTags,
      },
    }),
  ],
});
