import type { Lang } from '@/i18n';

/** Resolve locale for `[locale]` pages (Astro i18n may omit params during SSG). */
export function resolvePageLang(Astro: {
  props: { lang?: Lang };
  params: { locale?: string };
  currentLocale?: string;
}): Lang {
  return (Astro.props.lang ?? Astro.params.locale ?? Astro.currentLocale ?? 'en') as Lang;
}
