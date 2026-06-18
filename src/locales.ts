// Locale settings for Simpli (based on Astro i18n Starter)
// https://github.com/psephopaiktes/astro-i18n-starter

export const DEFAULT_LOCALE_SETTING = 'en';

export type ScriptGroup =
  | 'latin'
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
  region?: 'europe' | 'east-asia' | 'southeast-asia';
}

export const LOCALES_SETTING: Record<string, LocaleSetting> = {
  en: { label: 'English', lang: 'en-US', script: 'latin', region: 'europe' },
  fr: { label: 'Français', lang: 'fr-FR', script: 'latin', region: 'europe' },
  es: { label: 'Español', lang: 'es-ES', script: 'latin', region: 'europe' },
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
  'east-asia': 'East Asia',
  'southeast-asia': 'Southeast Asia',
};
