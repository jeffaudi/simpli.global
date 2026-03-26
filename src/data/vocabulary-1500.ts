import { words as popularWords } from 'popular-english-words';
import { dictionary as cmuDictionary } from 'cmu-pronouncing-dictionary';

export type VocabularyEntry = {
  simpli: string;
  english: string;
};

// English forms that are not used as standalone Simpli vocabulary items.
// Simpli has no articles and no verb conjugation.
const DISALLOWED_ENGLISH = new Set<string>([
  'nbsp',
  'a',
  'an',
  'the',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'do',
  'does',
  'did',
  'done',
  'doing',
  'has',
  'had',
  'having',
  'would',
  'could',
  'should',
  'might',
  'must',
  // Common irregular conjugated forms.
  'went',
  'gone',
  'came',
  'seen',
  'saw',
  'made',
  'took',
  'taken',
  'gave',
  'given',
  'got',
  'gotten',
  'knew',
  'known',
  'thought',
  'found',
  'told',
  'felt',
  'left',
  'kept',
  'began',
  'begun',
  'held',
  'wrote',
  'written',
  'spoke',
  'spoken',
  'bought',
  'brought',
  'ran',
  'paid',
  'said',
  // Common irregular plurals.
  'children',
  'people',
  'men',
  'women',
  'teeth',
  'feet',
  'mice',
  'geese',
  // Possessive pronouns are not used in Simpli (use noun + possessor).
  'my',
  'mine',
  'your',
  'yours',
  'his',
  'hers',
  'its',
  'our',
  'ours',
  'their',
  'theirs',
  'whose',
  "'s",
  "'re",
  "'ve",
  "'d",
  "'ll",
  "'m",
]);

const VOWEL_MAP: Record<string, string> = {
  AA: 'a',
  AE: 'a',
  AH: 'a',
  AO: 'o',
  AW: 'au',
  AY: 'ai',
  EH: 'e',
  ER: 'er',
  EY: 'ei',
  IH: 'i',
  IY: 'i',
  OW: 'o',
  OY: 'oi',
  UH: 'u',
  UW: 'u',
};

const CONSONANT_MAP: Record<string, string> = {
  B: 'b',
  CH: 'tj',
  D: 'd',
  DH: 'd',
  F: 'f',
  G: 'g',
  HH: 'h',
  JH: 'dj',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  NG: 'ng',
  P: 'p',
  R: 'r',
  S: 's',
  SH: 's',
  T: 't',
  TH: 't',
  V: 'v',
  W: 'v',
  Y: 'y',
  Z: 's',
  ZH: 's',
};

function toSimpleFallback(english: string): string {
  return english
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/tion/g, 'son')
    .replace(/sion/g, 'son')
    .replace(/ch/g, 'tj')
    .replace(/sh/g, 's')
    .replace(/ph/g, 'f')
    .replace(/th/g, 'd')
    .replace(/qu/g, 'kv')
    .replace(/c/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/w/g, 'v')
    .replace(/z/g, 's')
    .replace(/oo/g, 'u')
    .replace(/ee/g, 'i');
}

function arpabetToSimpli(pronunciation: string): string {
  const tokens = pronunciation.trim().split(/\s+/);
  let out = '';

  for (const token of tokens) {
    const base = token.replace(/[0-2]/g, '');
    if (VOWEL_MAP[base]) {
      out += VOWEL_MAP[base];
      continue;
    }
    if (CONSONANT_MAP[base]) {
      out += CONSONANT_MAP[base];
      continue;
    }
  }

  return out;
}

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z']/g, '');
}

function isLikelyConjugatedForm(word: string): boolean {
  // Exclude frequent inflected forms so the list prefers base forms.
  if (word.length <= 3) return false;
  if (word.endsWith('ing')) return true;
  if (word.endsWith('ed')) return true;
  if (word.endsWith('en')) return true;
  if (word.endsWith('ies')) return true;
  if (word.endsWith('es') && word.length > 4) return true;
  if (word.endsWith('s') && word.length > 4) {
    // Likely 3rd-person singular conjugation (runs, makes, says, etc.)
    return true;
  }
  return false;
}

function isLikelyPluralForm(word: string): boolean {
  if (word.length <= 3) return false;
  if (word.endsWith('ies')) return true;
  if (word.endsWith('ves')) return true;
  if (word.endsWith('es') && word.length > 4) return true;
  if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us')) return true;
  return false;
}

function isAllowedEnglishWord(word: string): boolean {
  if (!word) return false;
  if (DISALLOWED_ENGLISH.has(word)) return false;
  if (isLikelyConjugatedForm(word)) return false;
  if (isLikelyPluralForm(word)) return false;
  return true;
}

function collapseDoubleConsonants(word: string): string {
  return word.replace(/([bcdfghjklmnpqrstvwxyz])\1+/g, '$1');
}

const EXACT_OVERRIDES: Record<string, string> = {
  of: 'of',
  to: 'tu',
  with: 'wit',
  you: 'yu',
  your: 'yor',
  we: 'wi',
  he: 'el',
  she: 'el',
  him: 'el',
  her: 'el',
  it: 'el',
  they: 'dey',
  this: 'dis',
  that: 'dat',
  have: 'hav',
  give: 'giv',
  live: 'liv',
  move: 'mov',
  language: 'langwidj',
  because: 'becos',
  tomorrow: 'tumoro',
  yesterday: 'yesterde',
  people: 'pipol',
  woman: 'vuman',
  child: 'tjaild',
  teacher: 'tiitjer',
  school: 'skul',
  key: 'kii',
  room: 'ruum',
  road: 'rood',
};

function canonicalEnglish(word: string): string {
  return word.replace(/^'+|'+$/g, '').replace(/'/g, '');
}

function normalizeEnglishGloss(word: string): string {
  if (word === 'he' || word === 'she' || word === 'him' || word === 'her' || word === 'it') {
    return 'he/she/it';
  }
  return word;
}

function applySimpliRules(english: string, rawSimpli: string): string {
  if (EXACT_OVERRIDES[english]) return EXACT_OVERRIDES[english];

  let out = rawSimpli;

  // Keep endings aligned with spelling page.
  if (/(tion|sion)$/.test(english)) out = out.replace(/(shan|sian|syon|syon|jan)$/, 'son');
  if (/ture$/.test(english)) out = out.replace(/(tur|tjur|cher|chure)$/, 'tur');
  if (/ous$/.test(english)) out = out.replace(/us$/, 'us');

  out = out
    .replace(/w/g, 'v')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/z/g, 's')
    .replace(/sh/g, 's')
    .replace(/ph/g, 'f')
    .replace(/th/g, 'd');

  out = collapseDoubleConsonants(out);
  return out;
}

function makeEntry(english: string): VocabularyEntry {
  const normalized = normalizeWord(english).replace(/^'+|'+$/g, '');
  const pronunciation = cmuDictionary[normalized];
  const rawSimpli = pronunciation ? arpabetToSimpli(pronunciation) : toSimpleFallback(normalized);
  const simpli = applySimpliRules(normalized, rawSimpli);

  return {
    simpli: simpli || applySimpliRules(normalized, toSimpleFallback(normalized)),
    english: normalizeEnglishGloss(normalized),
  };
}

function buildVocabulary(count: number): VocabularyEntry[] {
  const source = popularWords.getMostPopular(count * 20) as string[];
  const seenEnglish = new Set<string>();
  const seenSimpli = new Set<string>();
  const result: VocabularyEntry[] = [];

  for (const rawWord of source) {
    const english = normalizeWord(rawWord).replace(/^'+|'+$/g, '');
    const canonical = canonicalEnglish(english);
    if (!english || english.length < 2) continue;
    if (!/^[a-z']+$/.test(english)) continue;
    if (!isAllowedEnglishWord(english)) continue;
    if (!isAllowedEnglishWord(canonical)) continue;

    const entry = makeEntry(english);
    if (seenEnglish.has(entry.english)) continue;
    if (!entry.simpli || entry.simpli.length < 2) continue;
    if (!isAllowedEnglishWord(entry.english)) continue;
    if (!isAllowedEnglishWord(canonicalEnglish(entry.english))) continue;
    if (seenSimpli.has(entry.simpli) && english !== entry.simpli) continue;

    seenEnglish.add(english);
    seenSimpli.add(entry.simpli);
    result.push(entry);

    if (result.length >= count) break;
  }

  return result;
}

export const vocabulary1500 = buildVocabulary(1500);
