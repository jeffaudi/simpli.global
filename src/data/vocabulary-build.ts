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
  AW: 'ao',
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
  Y: 'y',
  Z: 's',
  ZH: 's',
};

type ArpabetResult = {
  simpli: string;
  /** Indices in simpli where the CMU W phoneme was pronounced. */
  wSoundIndices: number[];
};

function arpabetToSimpli(pronunciation: string): ArpabetResult {
  const tokens = pronunciation.trim().split(/\s+/);
  let simpli = '';
  const wSoundIndices: number[] = [];

  for (const token of tokens) {
    const base = token.replace(/[0-2]/g, '');
    if (VOWEL_MAP[base]) {
      simpli += VOWEL_MAP[base];
      continue;
    }
    if (base === 'W') {
      wSoundIndices.push(simpli.length);
      simpli += 'w';
      continue;
    }
    if (CONSONANT_MAP[base]) {
      simpli += CONSONANT_MAP[base];
      continue;
    }
  }

  return { simpli, wSoundIndices };
}

function toSimpleFallback(english: string): string {
  const lower = english.toLowerCase().replace(/[^a-z]/g, '');
  let out = lower
    .replace(/tion/g, 'son')
    .replace(/sion/g, 'son')
    .replace(/ch/g, 'tj')
    .replace(/sh/g, 's')
    .replace(/ph/g, 'f')
    .replace(/th/g, 'd')
    .replace(/qu/g, 'kv')
    .replace(/c/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/z/g, 's')
    .replace(/oo/g, 'u')
    .replace(/ee/g, 'i');

  if (!lower.includes('w')) out = out.replace(/w/g, 'v');
  return out;
}

/**
 * v /v/ and w /w/ are different sounds.
 * A dictionary W becomes w when English spells that sound with w, and v otherwise
 * (one → van, won → wan, water → woter). A fallback spelling already follows the English letters.
 */
function applyVWFromEnglish(
  english: string,
  simpli: string,
  wSoundIndices: number[],
  hasPronunciation: boolean,
): string {
  if (!hasPronunciation) return simpli;
  const lower = english.toLowerCase().replace(/[^a-z]/g, '');
  const keepW = (word: string, index: number) =>
    word[index - 1] === 'v' || word[index + 1] === 'v';
  if (!lower.includes('w')) {
    return simpli.replace(/w/g, (letter, index) => (keepW(simpli, index) ? letter : 'v'));
  }

  const wAtSound = new Set(wSoundIndices);
  const chars = simpli.split('');
  for (let i = 0; i < chars.length; i++) {
    if (wAtSound.has(i)) {
      if (chars[i] === 'v') chars[i] = 'w';
    } else if (chars[i] === 'w' && !keepW(chars.join(''), i)) {
      chars[i] = 'v';
    }
  }
  return chars.join('');
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
  // ng + g is ŋg, as in finger. Keep the g; do not treat it as a doubled letter.
  const marked = word.replace(/ngg/g, 'ng\u0000g');
  return marked.replace(/([bcdfghjklmnpqrstvwxyz])\1+/g, '$1').replace(/\u0000/g, '');
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
  tomorrow: 'tumoro',
  yesterday: 'yesterde',
  people: 'pipol',
  child: 'tjaild',
  school: 'skul',
  still: 'stil',
  wouldn: 'wudn',
  shouldn: 'sudn',
  couldn: 'kudn',
  councillor: 'kaonsiler',
  teahouse: 'tihaos',
  will: 'wil',
  when: 'wen',
  be: 'bi',
  work: 'wok',
  people: 'pipol',
  rain: 'rein',
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

function applySimpliRules(
  english: string,
  rawSimpli: string,
  wSoundIndices: number[] = [],
  hasPronunciation = false,
): string {
  if (EXACT_OVERRIDES[english]) return EXACT_OVERRIDES[english];

  let out = applyVWFromEnglish(english, rawSimpli, wSoundIndices, hasPronunciation);

  // Keep endings aligned with spelling page.
  if (/(tion|sion)$/.test(english)) out = out.replace(/(shan|sian|syon|syon|jan)$/, 'son');
  if (/ture$/.test(english)) out = out.replace(/(tur|tjur|cher|chure)$/, 'tur');
  if (/ous$/.test(english)) out = out.replace(/us$/, 'us');

  out = out
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/z/g, 's')
    .replace(/sh/g, 's')
    .replace(/ph/g, 'f')
    .replace(/th/g, 'd');

  return collapseDoubleConsonants(out);
}

function makeEntry(english: string): VocabularyEntry {
  const normalized = normalizeWord(english).replace(/^'+|'+$/g, '');
  const pronunciation = cmuDictionary[normalized];
  let rawSimpli: string;
  let wSoundIndices: number[] = [];

  if (pronunciation) {
    const parsed = arpabetToSimpli(pronunciation);
    rawSimpli = parsed.simpli;
    wSoundIndices = parsed.wSoundIndices;
  } else {
    rawSimpli = toSimpleFallback(normalized);
  }

  const simpli = applySimpliRules(normalized, rawSimpli, wSoundIndices, Boolean(pronunciation));

  return {
    simpli: simpli || applySimpliRules(normalized, toSimpleFallback(normalized), [], false),
    english: normalizeEnglishGloss(normalized),
  };
}

export function buildVocabulary(count: number): VocabularyEntry[] {
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
