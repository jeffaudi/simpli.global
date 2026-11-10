// Locale settings for Simpli (based on Astro i18n Starter)
// https://github.com/psephopaiktes/astro-i18n-starter

export const DEFAULT_LOCALE_SETTING = 'en';

export type ScriptGroup =
  | 'latin'
  | 'arabic'
  | 'cjk-sc'
  | 'cjk-ja'
  | 'cjk-ko'
  | 'thai'
  | 'khmer'
  | 'lao';

interface LocaleSetting {
  label: string;
  lang?: string;
  dir?: 'rtl' | 'ltr';
  script?: ScriptGroup;
  /** Switcher optgroup key */
  region?: 'europe' | 'middle-east' | 'east-asia' | 'southeast-asia';
}

export const LOCALES_SETTING: Record<string, LocaleSetting> = {
  en: { label: 'English', lang: 'en-US', script: 'latin', region: 'europe' },
  fr: { label: 'Français', lang: 'fr-FR', script: 'latin', region: 'europe' },
  es: { label: 'Español', lang: 'es-ES', script: 'latin', region: 'europe' },
  de: { label: 'Deutsch', lang: 'de-DE', script: 'latin', region: 'europe' },
  it: { label: 'Italiano', lang: 'it-IT', script: 'latin', region: 'europe' },
  pt: { label: 'Português', lang: 'pt-PT', script: 'latin', region: 'europe' },
  pl: { label: 'Polski', lang: 'pl-PL', script: 'latin', region: 'europe' },
  nl: { label: 'Nederlands', lang: 'nl-NL', script: 'latin', region: 'europe' },
  ro: { label: 'Română', lang: 'ro-RO', script: 'latin', region: 'europe' },
  el: { label: 'Ελληνικά', lang: 'el-GR', script: 'latin', region: 'europe' },
  hu: { label: 'Magyar', lang: 'hu-HU', script: 'latin', region: 'europe' },
  cs: { label: 'Čeština', lang: 'cs-CZ', script: 'latin', region: 'europe' },
  sv: { label: 'Svenska', lang: 'sv-SE', script: 'latin', region: 'europe' },
  bg: { label: 'Български', lang: 'bg-BG', script: 'latin', region: 'europe' },
  da: { label: 'Dansk', lang: 'da-DK', script: 'latin', region: 'europe' },
  fi: { label: 'Suomi', lang: 'fi-FI', script: 'latin', region: 'europe' },
  sk: { label: 'Slovenčina', lang: 'sk-SK', script: 'latin', region: 'europe' },
  hr: { label: 'Hrvatski', lang: 'hr-HR', script: 'latin', region: 'europe' },
  lt: { label: 'Lietuvių', lang: 'lt-LT', script: 'latin', region: 'europe' },
  sl: { label: 'Slovenščina', lang: 'sl-SI', script: 'latin', region: 'europe' },
  lv: { label: 'Latviešu', lang: 'lv-LV', script: 'latin', region: 'europe' },
  et: { label: 'Eesti', lang: 'et-EE', script: 'latin', region: 'europe' },
  ga: { label: 'Gaeilge', lang: 'ga-IE', script: 'latin', region: 'europe' },
  mt: { label: 'Malti', lang: 'mt-MT', script: 'latin', region: 'europe' },
  ru: { label: 'Русский', lang: 'ru-RU', script: 'latin', region: 'europe' },
  ar: { label: 'العربية', lang: 'ar', script: 'arabic', dir: 'rtl', region: 'middle-east' },
  zh: { label: '简体中文', lang: 'zh-CN', script: 'cjk-sc', region: 'east-asia' },
  ja: { label: '日本語', lang: 'ja-JP', script: 'cjk-ja', region: 'east-asia' },
  ko: { label: '한국어', lang: 'ko-KR', script: 'cjk-ko', region: 'east-asia' },
  vi: { label: 'Tiếng Việt', lang: 'vi-VN', script: 'latin', region: 'southeast-asia' },
  th: { label: 'ไทย', lang: 'th-TH', script: 'thai', region: 'southeast-asia' },
  km: { label: 'ភាសាខ្មែរ', lang: 'km-KH', script: 'khmer', region: 'southeast-asia' },
  lo: { label: 'ລາວ', lang: 'lo-LA', script: 'lao', region: 'southeast-asia' },
  fil: { label: 'Filipino', lang: 'fil-PH', script: 'latin', region: 'southeast-asia' },
  id: { label: 'Bahasa Indonesia', lang: 'id-ID', script: 'latin', region: 'southeast-asia' },
  ms: { label: 'Bahasa Melayu', lang: 'ms-MY', script: 'latin', region: 'southeast-asia' },
};

export const LOCALE_REGION_LABELS: Record<NonNullable<LocaleSetting['region']>, string> = {
  europe: 'Europe',
  'middle-east': 'Middle East',
  'east-asia': 'East Asia',
  'southeast-asia': 'Southeast Asia',
};
