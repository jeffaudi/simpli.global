import type { ScriptGroup } from '@/locales';

export const SCRIPT_FONTS: Record<
  ScriptGroup,
  { family: string; googleUrl: string }
> = {
  latin: {
    family: "'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
  },
  'cjk-sc': {
    family: "'Noto Sans SC', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
  },
  'cjk-ja': {
    family: "'Noto Sans JP', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
  },
  'cjk-ko': {
    family: "'Noto Sans KR', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
  },
  thai: {
    family: "'Noto Sans Thai', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap',
  },
  khmer: {
    family: "'Noto Sans Khmer', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&display=swap',
  },
  lao: {
    family: "'Noto Sans Lao', 'Noto Sans', system-ui, sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap',
  },
};

export function fontStackForScript(script: ScriptGroup = 'latin'): string {
  return SCRIPT_FONTS[script].family;
}

export function googleFontUrlForScript(script: ScriptGroup = 'latin'): string {
  return SCRIPT_FONTS[script].googleUrl;
}
