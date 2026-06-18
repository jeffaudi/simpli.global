import type { Lang } from '@/i18n';
import { vocabulary5000 } from './vocabulary-5000';
import { vocabulary1500 } from './vocabulary-1500';

export type Vocab5000Row = { simpli: string; english?: string; translation?: string };
export type Vocab1500Row = { simpli: string; english?: string; translation?: string };

const vocab5000Modules = import.meta.glob<{ default: Vocab5000Row[] }>('./vocabulary-5000.*.json', {
  eager: true,
  import: 'default',
});

const vocab1500Modules = import.meta.glob<{ default: Vocab1500Row[] }>('./vocabulary-1500.*.json', {
  eager: true,
  import: 'default',
});

function localeJsonKey(prefix: string, lang: Lang): string {
  return `./${prefix}.${lang}.json`;
}

export async function loadVocabulary5000(lang: Lang): Promise<Vocab5000Row[]> {
  if (lang === 'en') return vocabulary5000;
  const data = vocab5000Modules[localeJsonKey('vocabulary-5000', lang)];
  return data ?? vocabulary5000;
}

export async function loadVocabulary1500(lang: Lang): Promise<Vocab1500Row[]> {
  if (lang === 'en') return vocabulary1500;
  const data = vocab1500Modules[localeJsonKey('vocabulary-1500', lang)];
  return data ?? vocabulary1500;
}

export function glossFor5000(lang: Lang, row: Vocab5000Row): string {
  if (lang === 'en') return row.english ?? '';
  return row.translation ?? row.english ?? '';
}

export function glossFor1500(lang: Lang, row: Vocab1500Row): string {
  if (lang === 'en') return row.english ?? '';
  return row.translation ?? row.english ?? '';
}
