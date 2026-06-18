import type { Lang } from '@/i18n';

type TranslationFile = Record<string, unknown>;

const translationModules = import.meta.glob<TranslationFile>('../translations/*.json', {
  eager: true,
  import: 'default',
});

export async function loadTranslations(lang: Lang): Promise<TranslationFile> {
  const key = `../translations/${lang}.json`;
  const t = translationModules[key];
  if (!t) {
    throw new Error(`Missing translation file for locale: ${lang}`);
  }
  return t;
}

/** Synchronous access when modules are eagerly loaded. */
export function getTranslations(lang: Lang | undefined): TranslationFile {
  const code = lang && translationModules[`../translations/${lang}.json`] ? lang : 'en';
  const key = `../translations/${code}.json`;
  const t = translationModules[key];
  if (!t) {
    throw new Error(`Missing translation file for locale: ${code}`);
  }
  return t;
}
