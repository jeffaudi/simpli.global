// Locale settings for Simpli (based on Astro i18n Starter)
// https://github.com/psephopaiktes/astro-i18n-starter

export const DEFAULT_LOCALE_SETTING = 'en';

interface LocaleSetting {
  label: string;
  lang?: string;
  dir?: 'rtl' | 'ltr';
}

export const LOCALES_SETTING: Record<string, LocaleSetting> = {
  en: { label: 'English', lang: 'en-US' },
  fr: { label: 'Français', lang: 'fr-FR' },
  es: { label: 'Español', lang: 'es-ES' },
};
