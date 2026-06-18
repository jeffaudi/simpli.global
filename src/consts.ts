// Global data for Simpli (based on Astro i18n Starter pattern)
import { getLocaleContent, type LocaleContent } from '@/i18n';

/** Browser title and Open Graph site name — reinforce “simple international language” for SEO. */
export const SITE_TITLE: LocaleContent<string> = {
  en: 'Simpli is a simple international language',
  fr: 'Simpli est une langue internationale simple',
  es: 'Simpli es una lengua internacional simple',
};

/** Default meta description (home and pages without a custom fragment). */
export const SITE_DESCRIPTION: LocaleContent<string> = {
  en: 'Simpli is a simple international language for egalitarian communication—English-style words, Indonesian-style grammar, phonetic spelling.',
  fr: 'Simpli est une langue internationale simple pour une communication égalitaire—mots proches de l’anglais, grammaire de type indonésien, orthographe phonétique.',
  es: 'Simpli es una lengua internacional simple para una comunicación igualitaria—vocabulario tipo inglés, gramática tipo indonesio, ortografía fonética.',
};

/** Prepended to per-page meta descriptions so every URL reinforces positioning. */
export const SEO_DESCRIPTION_LEAD: LocaleContent<string> = {
  en: 'Simpli is a simple international language.',
  fr: 'Simpli est une langue internationale simple.',
  es: 'Simpli es una lengua internacional simple.',
};

export function siteTitle(lang: keyof typeof SITE_TITLE): string {
  return getLocaleContent(SITE_TITLE, lang);
}

export function siteDescription(lang: keyof typeof SITE_DESCRIPTION): string {
  return getLocaleContent(SITE_DESCRIPTION, lang);
}

export function seoDescriptionLead(lang: keyof typeof SEO_DESCRIPTION_LEAD): string {
  return getLocaleContent(SEO_DESCRIPTION_LEAD, lang);
}
