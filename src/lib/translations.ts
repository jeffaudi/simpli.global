import type { Lang } from '@/i18n';

type TranslationFile = Record<string, unknown>;

const translationModules = import.meta.glob<TranslationFile>('../translations/*.json', {
  eager: true,
  import: 'default',
});

function isPlain(value: unknown): value is TranslationFile {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Locale values win. Missing keys and empty strings fall back to English. */
function mergeOver(base: TranslationFile, over: TranslationFile): TranslationFile {
  const out: TranslationFile = { ...base };
  for (const key of Object.keys(over)) {
    const next = over[key];
    const prev = base[key];
    if (next === '' || next === undefined) continue;
    if (isPlain(prev) && isPlain(next)) out[key] = mergeOver(prev, next);
    else out[key] = next;
  }
  return out;
}

/** Synchronous access when modules are eagerly loaded. */
export function getTranslations(lang: Lang | undefined): TranslationFile {
  const code = lang && translationModules[`../translations/${lang}.json`] ? lang : 'en';
  const english = translationModules['../translations/en.json'];
  const selected = translationModules[`../translations/${code}.json`];
  if (!english || !selected) {
    throw new Error(`Missing translation file for locale: ${code}`);
  }
  if (code === 'en') return english;
  return mergeOver(english, selected);
}
