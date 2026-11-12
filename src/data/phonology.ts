/**
 * Language-independent Simpli pronunciation standard.
 * Locale files may explain these sounds. They must not redefine the IPA.
 * See spec/PRONUNCIATION.md.
 */

export const ART_IDS = [
  'voiced',
  'voiceless',
  'lipsClosed',
  'lipsTeeth',
  'lipsRound',
  'lipsRelaxed',
  'tongueLow',
  'tongueMidFront',
  'tongueHighFront',
  'tongueMidBack',
  'tongueHighBack',
  'tongueTip',
  'tongueBack',
  'airStop',
  'airNose',
  'airHiss',
  'airSide',
  'airFree',
  'airH',
  'airR',
  'airAffricate',
  'airGlide',
] as const;

export type ArtId = (typeof ART_IDS)[number];

export type PhonemeGroup = 'vowel' | 'long' | 'diphthong' | 'consonant';

export type PhonemeCaution =
  | 'hKeep'
  | 'rKeep'
  | 'lKeep'
  | 'vwPrefer'
  | 'tjKeep'
  | 'djKeep';

export type Phoneme = {
  id: string;
  spelling: string;
  group: PhonemeGroup;
  /** Canonical reference, slash IPA. */
  ipa: string;
  /** Accepted regional realizations, bracket IPA. */
  accepted: string[];
  /** Common learner realizations that do not match the reference. */
  understandable: string[];
  /** Realizations likely to collapse a Simpli contrast. */
  notRecommended: string[];
  /** Subset of `understandable` that still needs listener testing. */
  listenerCheck: string[];
  /** Published Simpli spellings that use this sound. */
  words: string[];
  art: ArtId[];
  /** Extra English word, shown only when this language has no close example. */
  englishHint?: string;
  caution?: PhonemeCaution;
};

export const PHONEMES: Phoneme[] = [
  {
    id: 'a',
    spelling: 'a',
    group: 'vowel',
    ipa: '/a/',
    accepted: ['[ɑ]'],
    understandable: ['[æ]'],
    notRecommended: ['[e]'],
    listenerCheck: [],
    words: ['hat', 'dat'],
    art: ['lipsRelaxed', 'tongueLow', 'airFree'],
    englishHint: 'father',
  },
  {
    id: 'e',
    spelling: 'e',
    group: 'vowel',
    ipa: '/e/',
    accepted: ['[ɛ]'],
    understandable: [],
    notRecommended: ['[i]', '[a]'],
    listenerCheck: [],
    words: ['red', 'bed'],
    art: ['lipsRelaxed', 'tongueMidFront', 'airFree'],
    englishHint: 'bed',
  },
  {
    id: 'i',
    spelling: 'i',
    group: 'vowel',
    ipa: '/i/',
    accepted: ['[ɪ]'],
    understandable: [],
    notRecommended: ['[e]'],
    listenerCheck: [],
    words: ['mi', 'tri'],
    art: ['lipsRelaxed', 'tongueHighFront', 'airFree'],
    englishHint: 'see',
  },
  {
    id: 'o',
    spelling: 'o',
    group: 'vowel',
    ipa: '/o/',
    accepted: ['[ɔ]'],
    understandable: ['[oʊ]'],
    notRecommended: ['[u]'],
    listenerCheck: ['[oʊ]'],
    words: ['hot', 'go'],
    art: ['lipsRound', 'tongueMidBack', 'airFree'],
    englishHint: 'go',
  },
  {
    id: 'u',
    spelling: 'u',
    group: 'vowel',
    ipa: '/u/',
    accepted: ['[ʊ]'],
    understandable: ['[ɯ]'],
    notRecommended: ['[y]'],
    listenerCheck: ['[ɯ]'],
    words: ['gud', 'ful'],
    art: ['lipsRound', 'tongueHighBack', 'airFree'],
    englishHint: 'too',
  },
  {
    id: 'aa',
    spelling: 'aa',
    group: 'long',
    ipa: '/aː/',
    accepted: ['[ɑː]'],
    understandable: [],
    notRecommended: ['[eː]'],
    listenerCheck: [],
    words: [],
    art: ['lipsRelaxed', 'tongueLow', 'airFree'],
    englishHint: 'father, held longer',
  },
  {
    id: 'ee',
    spelling: 'ee',
    group: 'long',
    ipa: '/eː/',
    accepted: ['[ɛː]'],
    understandable: [],
    notRecommended: ['[eɪ]'],
    listenerCheck: [],
    words: [],
    art: ['lipsRelaxed', 'tongueMidFront', 'airFree'],
    englishHint: 'bed, held longer',
  },
  {
    id: 'ii',
    spelling: 'ii',
    group: 'long',
    ipa: '/iː/',
    accepted: [],
    understandable: [],
    notRecommended: ['[eɪ]'],
    listenerCheck: [],
    words: ['kii'],
    art: ['lipsRelaxed', 'tongueHighFront', 'airFree'],
    englishHint: 'see',
  },
  {
    id: 'oo',
    spelling: 'oo',
    group: 'long',
    ipa: '/oː/',
    accepted: ['[ɔː]'],
    understandable: ['[oʊ]'],
    notRecommended: [],
    listenerCheck: ['[oʊ]'],
    words: ['rood'],
    art: ['lipsRound', 'tongueMidBack', 'airFree'],
    englishHint: 'go, held longer',
  },
  {
    id: 'uu',
    spelling: 'uu',
    group: 'long',
    ipa: '/uː/',
    accepted: [],
    understandable: ['[ɯː]'],
    notRecommended: ['[y]'],
    listenerCheck: ['[ɯː]'],
    words: ['ruum'],
    art: ['lipsRound', 'tongueHighBack', 'airFree'],
    englishHint: 'too',
  },
  {
    id: 'ai',
    spelling: 'ai',
    group: 'diphthong',
    ipa: '/ai/',
    accepted: ['[aɪ]'],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['bai', 'tjaild'],
    art: ['tongueLow', 'airGlide'],
    englishHint: 'buy',
  },
  {
    id: 'ei',
    spelling: 'ei',
    group: 'diphthong',
    ipa: '/ei/',
    accepted: ['[eɪ]'],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['plei'],
    art: ['tongueMidFront', 'airGlide'],
    englishHint: 'play',
  },
  {
    id: 'ao',
    spelling: 'ao',
    group: 'diphthong',
    ipa: '/au/',
    accepted: ['[aʊ]'],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['hao', 'nao'],
    art: ['tongueLow', 'lipsRound', 'airGlide'],
    englishHint: 'how',
  },
  {
    id: 'oi',
    spelling: 'oi',
    group: 'diphthong',
    ipa: '/oi/',
    accepted: ['[ɔɪ]'],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['boi', 'point'],
    art: ['lipsRound', 'airGlide'],
    englishHint: 'boy',
  },
  {
    id: 'p',
    spelling: 'p',
    group: 'consonant',
    ipa: '/p/',
    accepted: [],
    understandable: ['[pʰ]'],
    notRecommended: ['[b]'],
    listenerCheck: [],
    words: ['pipol', 'plei'],
    art: ['voiceless', 'lipsClosed', 'airStop'],
    englishHint: 'pen',
  },
  {
    id: 'b',
    spelling: 'b',
    group: 'consonant',
    ipa: '/b/',
    accepted: [],
    understandable: [],
    notRecommended: ['[p]'],
    listenerCheck: [],
    words: ['bed', 'bai'],
    art: ['voiced', 'lipsClosed', 'airStop'],
    englishHint: 'bed',
  },
  {
    id: 't',
    spelling: 't',
    group: 'consonant',
    ipa: '/t/',
    accepted: [],
    understandable: ['[tʰ]'],
    notRecommended: ['[d]'],
    listenerCheck: [],
    words: ['tu', 'tri'],
    art: ['voiceless', 'tongueTip', 'airStop'],
    englishHint: 'top',
  },
  {
    id: 'd',
    spelling: 'd',
    group: 'consonant',
    ipa: '/d/',
    accepted: [],
    understandable: [],
    notRecommended: ['[t]'],
    listenerCheck: [],
    words: ['dat', 'dor'],
    art: ['voiced', 'tongueTip', 'airStop'],
    englishHint: 'dog',
  },
  {
    id: 'k',
    spelling: 'k',
    group: 'consonant',
    ipa: '/k/',
    accepted: [],
    understandable: ['[kʰ]'],
    notRecommended: ['[g]'],
    listenerCheck: [],
    words: ['ki', 'skul'],
    art: ['voiceless', 'tongueBack', 'airStop'],
    englishHint: 'ski',
  },
  {
    id: 'g',
    spelling: 'g',
    group: 'consonant',
    ipa: '/g/',
    accepted: [],
    understandable: [],
    notRecommended: ['[k]'],
    listenerCheck: [],
    words: ['go', 'gud'],
    art: ['voiced', 'tongueBack', 'airStop'],
    englishHint: 'go',
  },
  {
    id: 'm',
    spelling: 'm',
    group: 'consonant',
    ipa: '/m/',
    accepted: [],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['mi', 'man'],
    art: ['voiced', 'lipsClosed', 'airNose'],
    englishHint: 'man',
  },
  {
    id: 'n',
    spelling: 'n',
    group: 'consonant',
    ipa: '/n/',
    accepted: [],
    understandable: [],
    notRecommended: [],
    listenerCheck: [],
    words: ['nao', 'nain'],
    art: ['voiced', 'tongueTip', 'airNose'],
    englishHint: 'no',
  },
  {
    id: 'f',
    spelling: 'f',
    group: 'consonant',
    ipa: '/f/',
    accepted: [],
    understandable: ['[ɸ]'],
    notRecommended: ['[h]'],
    listenerCheck: ['[ɸ]'],
    words: ['ful', 'faind'],
    art: ['voiceless', 'lipsTeeth', 'airHiss'],
    englishHint: 'fan',
  },
  {
    id: 's',
    spelling: 's',
    group: 'consonant',
    ipa: '/s/',
    accepted: [],
    understandable: ['[ʃ]'],
    notRecommended: [],
    listenerCheck: ['[ʃ]'],
    words: ['sit', 'seven'],
    art: ['voiceless', 'tongueTip', 'airHiss'],
    englishHint: 'sun',
  },
  {
    id: 'l',
    spelling: 'l',
    group: 'consonant',
    ipa: '/l/',
    accepted: [],
    understandable: ['[ɫ]'],
    notRecommended: ['[r]', '[ɹ]'],
    listenerCheck: [],
    words: ['lait', 'liv'],
    art: ['voiced', 'tongueTip', 'airSide'],
    englishHint: 'leg',
    caution: 'lKeep',
  },
  {
    id: 'r',
    spelling: 'r',
    group: 'consonant',
    ipa: '/ɹ/',
    accepted: ['[ɾ]', '[r]'],
    understandable: ['[ʁ]'],
    notRecommended: ['∅'],
    listenerCheck: ['[ʁ]'],
    words: ['red', 'woter'],
    art: ['voiced', 'airR'],
    englishHint: 'run',
    caution: 'rKeep',
  },
  {
    id: 'h',
    spelling: 'h',
    group: 'consonant',
    ipa: '/h/',
    accepted: [],
    understandable: ['[x]', '[ɦ]'],
    notRecommended: ['∅', '[f]'],
    listenerCheck: ['[x]', '[ɦ]'],
    words: ['hand', 'hav'],
    art: ['voiceless', 'airH'],
    englishHint: 'hat',
    caution: 'hKeep',
  },
  {
    id: 'v',
    spelling: 'v',
    group: 'consonant',
    ipa: '/v/',
    accepted: [],
    understandable: ['[w]', '[β]'],
    notRecommended: ['∅'],
    listenerCheck: ['[β]'],
    words: ['hav', 'seven'],
    art: ['voiced', 'lipsTeeth', 'airHiss'],
    englishHint: 'van',
    caution: 'vwPrefer',
  },
  {
    id: 'w',
    spelling: 'w',
    group: 'consonant',
    ipa: '/w/',
    accepted: [],
    understandable: ['[v]', '[β]'],
    notRecommended: ['∅'],
    listenerCheck: ['[β]'],
    words: ['wi', 'windo'],
    art: ['voiced', 'lipsRound', 'airGlide'],
    englishHint: 'we',
    caution: 'vwPrefer',
  },
  {
    id: 'y',
    spelling: 'y',
    group: 'consonant',
    ipa: '/j/',
    accepted: [],
    understandable: [],
    notRecommended: ['[dʒ]'],
    listenerCheck: [],
    words: ['yu', 'yes'],
    art: ['voiced', 'tongueHighFront', 'airGlide'],
    englishHint: 'yes',
  },
  {
    id: 'tj',
    spelling: 'tj',
    group: 'consonant',
    ipa: '/tʃ/',
    accepted: ['[tɕ]'],
    understandable: [],
    notRecommended: ['[s]', '[ʃ]'],
    listenerCheck: [],
    words: ['tjaild', 'witj'],
    art: ['voiceless', 'airAffricate'],
    englishHint: 'chip',
    caution: 'tjKeep',
  },
  {
    id: 'dj',
    spelling: 'dj',
    group: 'consonant',
    ipa: '/dʒ/',
    accepted: ['[dʑ]'],
    understandable: ['[ʒ]'],
    notRecommended: ['[j]', '[ʝ]', '[g]'],
    listenerCheck: ['[ʒ]'],
    words: ['bridj', 'langwidj'],
    art: ['voiced', 'airAffricate'],
    englishHint: 'job',
    caution: 'djKeep',
  },
];

export const PHONEME_IDS = PHONEMES.map((phoneme) => phoneme.id);

const BRACKET_IPA = /^\[.+\]$/;
const SLASH_IPA = /^\/.+\/$/;

/** Structural rules that keep the inventory internally consistent. */
export function phonologyErrors(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const canonical = new Map<string, string>();

  for (const phoneme of PHONEMES) {
    if (ids.has(phoneme.id)) errors.push(`duplicate id ${phoneme.id}`);
    ids.add(phoneme.id);
    if (!SLASH_IPA.test(phoneme.ipa)) errors.push(`${phoneme.id} canonical IPA must use slashes`);
    if (canonical.has(phoneme.ipa)) {
      errors.push(`${phoneme.id} reuses canonical ${phoneme.ipa} from ${canonical.get(phoneme.ipa)}`);
    }
    canonical.set(phoneme.ipa, phoneme.id);
    if (phoneme.art.length === 0) errors.push(`${phoneme.id} needs an articulatory description`);
    for (const art of phoneme.art) {
      if (!ART_IDS.includes(art)) errors.push(`${phoneme.id} unknown art ${art}`);
    }
    for (const ipa of [...phoneme.accepted, ...phoneme.understandable, ...phoneme.notRecommended]) {
      if (ipa !== '∅' && !BRACKET_IPA.test(ipa)) {
        errors.push(`${phoneme.id} variant ${ipa} must use brackets or ∅`);
      }
    }
    for (const ipa of phoneme.listenerCheck) {
      if (!phoneme.understandable.includes(ipa)) {
        errors.push(`${phoneme.id} listener check ${ipa} is not listed as understandable`);
      }
    }
    if (!/^[a-z]+$/.test(phoneme.spelling)) errors.push(`${phoneme.id} spelling is not letters`);
  }

  const bareCanonical = new Map(PHONEMES.map((phoneme) => [phoneme.ipa.slice(1, -1), phoneme.id]));
  for (const phoneme of PHONEMES) {
    for (const ipa of phoneme.accepted) {
      const bare = ipa.slice(1, -1);
      const owner = bareCanonical.get(bare);
      if (owner && owner !== phoneme.id) {
        errors.push(`${phoneme.id} accepts ${ipa}, which is the reference for ${owner}`);
      }
    }
  }

  return errors;
}
