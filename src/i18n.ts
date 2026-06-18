import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from './locales';
import { getRelativeLocaleUrl } from 'astro:i18n';

export const LOCALES = LOCALES_SETTING as Record<string, LocaleConfig>;
type LocaleConfig = {
  readonly label: string;
  readonly lang?: string;
  readonly dir?: 'ltr' | 'rtl';
  readonly script?: import('./locales').ScriptGroup;
  readonly region?: 'europe' | 'east-asia' | 'southeast-asia';
};

export type Lang = keyof typeof LOCALES;

export const DEFAULT_LOCALE = DEFAULT_LOCALE_SETTING as Lang;

export type Multilingual = { [key in Lang]?: string };

/** Locale content map with required English fallback. */
export type LocaleContent<T> = Partial<Record<Lang, T>> & { en: T };

export function getLocaleContent<T>(map: LocaleContent<T>, lang: Lang): T {
  return map[lang] ?? map.en;
}

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual | string): string {
    if (typeof multilingual === 'string') {
      return multilingual;
    }
    return multilingual[lang] || multilingual[DEFAULT_LOCALE] || '';
  };
}

export function getLocalePaths(url: URL): LocalePath[] {
  return Object.keys(LOCALES).map((lang) => ({
    lang: lang as Lang,
    path: getRelativeLocaleUrl(lang, url.pathname.replace(/^\/[a-zA-Z-]+/, '')),
  }));
}

type LocalePath = { lang: Lang; path: string };

export const localeParams = Object.keys(LOCALES).map((locale) => ({
  params: { locale },
  props: { lang: locale as Lang },
}));
