import type { Lang } from '@/i18n';
import { PHONEMES, type ArtId, type Phoneme, type PhonemeGroup } from '@/data/phonology';
import { PHONOLOGY_EXAMPLES, PHONOLOGY_NOTES } from '@/data/phonology-examples';

export type PhonologyCopy = {
  philosophyTitle: string;
  philosophyBody: string;
  termsTitle: string;
  termWritingLabel: string;
  termWriting: string;
  termSoundsLabel: string;
  termSounds: string;
  termReferenceLabel: string;
  termReference: string;
  termRealLabel: string;
  termReal: string;
  termAccentLabel: string;
  termAccent: string;
  tableTitle: string;
  colLetter: string;
  colSound: string;
  colHere: string;
  colExamples: string;
  colAlso: string;
  groupVowel: string;
  groupLong: string;
  groupDiph: string;
  groupCons: string;
  like: string;
  likeGloss: string;
  acceptedLead: string;
  understandableLead: string;
  avoidLead: string;
  variantsSummary: string;
  listenerFlag: string;
  longer: string;
  glide: string;
  englishRef: string;
  lengthGap: string;
  vowelSeq: string;
  clusterGap: string;
  vwSpell: string;
  hKeep: string;
  rKeep: string;
  lKeep: string;
  vwPrefer: string;
  tjKeep: string;
  djKeep: string;
  rationalePointer: string;
  spellingLink: string;
  art: Record<ArtId, string>;
};

const copyModules = import.meta.glob<PhonologyCopy>('../data/phonology-copy/*.json', {
  eager: true,
  import: 'default',
});

export const PHONOLOGY_COPY: Partial<Record<Lang, PhonologyCopy>> = {};
for (const [path, data] of Object.entries(copyModules)) {
  const lang = path.match(/\/([a-z]{2,3})\.json$/)?.[1] as Lang | undefined;
  if (lang) PHONOLOGY_COPY[lang] = data;
}

const GROUPS: PhonemeGroup[] = ['vowel', 'diphthong', 'consonant'];

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function groupLabel(copy: PhonologyCopy, group: PhonemeGroup): string {
  if (group === 'vowel') return copy.groupVowel;
  if (group === 'long') return copy.groupLong;
  if (group === 'diphthong') return copy.groupDiph;
  return copy.groupCons;
}

function fill(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => fields[key] ?? '');
}

const LONG_FROM: Record<string, string> = { aa: 'a', ee: 'e', ii: 'i', oo: 'o', uu: 'u' };

function localCell(phoneme: Phoneme, lang: Lang, copy: PhonologyCopy): string {
  const source = LONG_FROM[phoneme.id] ?? phoneme.id;
  const example = PHONOLOGY_EXAMPLES[phoneme.id]?.[lang] ?? PHONOLOGY_EXAMPLES[source]?.[lang];
  const note = PHONOLOGY_NOTES[phoneme.id]?.[lang] ?? PHONOLOGY_NOTES[source]?.[lang];
  const parts: string[] = [];

  if (example) {
    const word = `<bdi dir="ltr">${esc(example.word)}</bdi>`;
    const template = example.gloss ? copy.likeGloss : copy.like;
    parts.push(`<p>${fill(esc(template), { word, gloss: esc(example.gloss ?? '') })}</p>`);
  }
  if (note) parts.push(`<p>${esc(note)}</p>`);
  if (!example) {
    const steps = phoneme.art.map((id) => esc(copy.art[id])).join(' ');
    parts.push(`<p>${steps}</p>`);
  }
  if (phoneme.group === 'long') parts.push(`<p>${esc(copy.longer)}</p>`);
  if (phoneme.group === 'diphthong') parts.push(`<p>${esc(copy.glide)}</p>`);
  if (phoneme.caution) parts.push(`<p>${esc(copy[phoneme.caution])}</p>`);
  if (!example && phoneme.englishHint) {
    parts.push(
      `<p class="english-ref">${fill(esc(copy.englishRef), {
        word: `<bdi dir="ltr">${esc(phoneme.englishHint)}</bdi>`,
      })}</p>`,
    );
  }
  return parts.join('');
}

function variantDetails(phoneme: Phoneme, copy: PhonologyCopy): string {
  const blocks: string[] = [];
  if (phoneme.accepted.length) {
    blocks.push(
      `<p><strong>${esc(copy.acceptedLead)}</strong> <bdi dir="ltr">${esc(phoneme.accepted.join(' '))}</bdi></p>`,
    );
  }
  if (phoneme.understandable.length) {
    blocks.push(
      `<p><strong>${esc(copy.understandableLead)}</strong> <bdi dir="ltr">${esc(phoneme.understandable.join(' '))}</bdi></p>`,
    );
  }
  if (phoneme.listenerCheck.length) {
    blocks.push(`<p>${esc(copy.listenerFlag)}</p>`);
  }
  if (phoneme.notRecommended.length) {
    blocks.push(
      `<p><strong>${esc(copy.avoidLead)}</strong> <bdi dir="ltr">${esc(phoneme.notRecommended.join(' '))}</bdi></p>`,
    );
  }
  if (!blocks.length) return '';
  return `<details class="variants"><summary>${esc(copy.variantsSummary)}</summary>${blocks.join('')}</details>`;
}

function tableFor(group: PhonemeGroup, lang: Lang, copy: PhonologyCopy): string {
  const rows = PHONEMES.filter((phoneme) => phoneme.group === group)
    .map((phoneme) => {
      const words = phoneme.words.length
        ? phoneme.words.map((word) => `<em dir="ltr">${esc(word)}</em>`).join(', ')
        : '—';
      return `<tr>
        <th scope="row"><bdi dir="ltr">${esc(phoneme.spelling)}</bdi></th>
        <td><bdi dir="ltr">${esc(phoneme.ipa)}</bdi></td>
        <td>${localCell(phoneme, lang, copy)}</td>
        <td>${words}</td>
        <td>${variantDetails(phoneme, copy)}</td>
      </tr>`;
    })
    .join('');

  return `<h3>${esc(groupLabel(copy, group))}</h3>
    <div class="phoneme-scroll">
      <table class="phoneme-table">
        <thead>
          <tr>
            <th scope="col">${esc(copy.colLetter)}</th>
            <th scope="col">${esc(copy.colSound)}</th>
            <th scope="col">${esc(copy.colHere)}</th>
            <th scope="col">${esc(copy.colExamples)}</th>
            <th scope="col">${esc(copy.colAlso)}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function term(label: string, body: string): string {
  return `<dt>${esc(label)}</dt><dd>${esc(body)}</dd>`;
}

/** Pronunciation guide for one interface language. IPA always comes from PHONEMES. */
function copyFor(lang: Lang): PhonologyCopy {
  const copy = PHONOLOGY_COPY[lang];
  if (!copy) throw new Error(`Missing pronunciation copy for ${lang}`);
  return copy;
}

export function renderPhonologyGuide(lang: Lang): string {
  const copy = copyFor(lang);
  const tables = GROUPS.map((group) => tableFor(group, lang, copy)).join('');
  return `<section id="pronunciation" class="phonology">
    <h2>${esc(copy.philosophyTitle)}</h2>
    <p>${esc(copy.philosophyBody)}</p>
    <h2>${esc(copy.termsTitle)}</h2>
    <dl class="term-list">
      ${term(copy.termWritingLabel, copy.termWriting)}
      ${term(copy.termSoundsLabel, copy.termSounds)}
      ${term(copy.termReferenceLabel, copy.termReference)}
      ${term(copy.termRealLabel, copy.termReal)}
      ${term(copy.termAccentLabel, copy.termAccent)}
    </dl>
    <h2>${esc(copy.tableTitle)}</h2>
    ${tables}
    <p>${esc(copy.lengthGap)}</p>
    <p>${esc(copy.vowelSeq)}</p>
    <p>${esc(copy.clusterGap)}</p>
    <p>${esc(copy.vwSpell)}</p>
  </section>`;
}

export function renderRationalePointer(lang: Lang, href: string): string {
  const copy = copyFor(lang);
  const [before, after] = copy.rationalePointer.split('{link}');
  const link = `<a href="${esc(href)}">${esc(copy.spellingLink)}</a>`;
  return `<p>${esc(before ?? '')}${link}${esc(after ?? '')}</p>`;
}
