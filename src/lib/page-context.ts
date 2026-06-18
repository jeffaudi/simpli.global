import type { Lang } from '@/i18n';
import { getTranslations } from '@/lib/translations';

type TranslationFile = Record<string, unknown>;

export function loadPageTranslations(lang: Lang): TranslationFile {
  return getTranslations(lang);
}
