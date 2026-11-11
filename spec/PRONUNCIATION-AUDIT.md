# Pronunciation audit

Stage A of the spelling and pronunciation review. Facts below come from the published spelling pages, `spec/ORTHOGRAPHY.md` before this revision, the archived v0.1 specification, and the 5,000-word list built by `src/data/vocabulary-build.ts` (CMU pronunciations, General American). Recommendations are separate and were not all implemented.

The living standard after this review is [PRONUNCIATION.md](PRONUNCIATION.md). Word spellings were not changed.

## Established facts

- The alphabet is a, e, i, o, u, p, b, t, d, k, g, m, n, f, s, l, r, h, v, w, y, plus the spellings tj, dj, and the diphthongs ai, ei, ao. The generator also writes oi. There is no c, q, x, or z, except the override *becos*.
- The teaching pages said one letter is one sound, with length shown by doubling, and gave English examples that mix qualities: “father, cat” for **a**, “sit, see” for **i**, “hot, go” for **o**, “put, too” for **u**. Those English words are not one vowel across dialects.
- The generator maps AA, AE, and AH all to **a**; IH and IY both to **i**; AO and OW both to **o**; UH and UW both to **u**. It does not double letters for length. Only 19 of 5,000 entries contain aa, ee, ii, oo, or uu, and several of those are overrides (*kii*, *rood*, *ruum*) or abbreviations.
- Because of that merger, the list includes homographs such as *sit* = sit and seat, *tim* = team, *hat* = hot and hat, and *san* = son. The published pair *rod*/*rood* does not match the list: rod is *rad*, road is *rood*.
- Voiceless English th becomes **t** (*tingk*, *tri*). Voiced th becomes **d** (*dat*, *dey*). The spelling page and the archived spec said every th becomes d. The “how to spell” note said /θ/ becomes d or t.
- **v** and **w** are spelled differently, following English **v** versus **w**, but the pages said either pronunciation is allowed. The list still distinguishes *veri*/*weri* (very/worry), *wi*/*vi*, *van*/*wan* (one/won), *vais*/*wais*, and *vers*/*wers*.
- Dropping **h** merges pairs such as *hand*/*and*, *hai*/*ai* (high/eye), *heit*/*eit* (hate/eight). Dropping **r** merges on the order of 169 pairs. Swapping **l** and **r** merges on the order of 85 pairs, including *long*/*rong* and *lait*/*rait*.
- **tj** pronounced as **s** merges pairs such as *tjip*/*sip* (cheap/ship) and *witj*/*wis*. **dj** pronounced as **y** merges *djet*/*yet* and *djeil*/*yeil*. **dj** pronounced as **g** merges *djet*/*get*, *edj*/*eg*, and *badj*/*bag*.
- The stated syllable shape (C)V(C) is not what the list does. More than half the entries have a two-consonant cluster, about 540 have three, and about 70 have four. Initial groups include pr, tr, str, sk, and kv.
- Stress is not stored in the list. The teaching rule is penultimate. That is a Simpli rule, not a copy of English stress: *yesterde* is stressed on the middle syllable even though English “yesterday” is not.
- *komputer* on the old stress line is *kampyuter* in the list. *tjeendj* on the pages is *tjeindj* in the list (the diphthong is ei, not ee). *change* was the mismatched example.
- **ng** in the list is the CMU velar nasal, including before k (*lingk*, *tingk*). A following **g** is collapsed by the double-consonant rule, so *finger* (ŋɡ) and a singer-type **ng** are not reliably distinct.
- *becos* is an override and still contains **c**. *because* without the override would be *bikos*. *becos* is also the grammar word for “because”.
- A few list entries are not Simpli spellings: *vouldn*, *souldn*, *kouldn*, *teahouse*, *kounkilor*.
- The French spelling page taught **r** and **h** by pointing at English *run* and *hot*. Most other locales did the same for the whole alphabet.

## Reference choices

These document the existing system. They do not add phonemes.

| Question | Choice | Why |
| --- | --- | --- |
| Vowel qualities | /a e i o u/, length by doubling | Matches the five letters and the doubling rule. English lax vowels stay accepted, not required. |
| R | /ɹ/ standard; [ɾ] and [r] accepted; [ʁ] understandable | Does not replace English **r**. The tap and trill do not merge Simpli words and are easier to learn. |
| V and W | /v/ and /w/ as the references | The letters already distinguish pairs. Merging them is understandable, not accepted. |
| H | /h/, do not omit | Omission merges pairs. |
| TJ and DJ | /tʃ/ and /dʒ/; [tɕ] and [dʑ] accepted | Palatal affricates stay distinct from **s**, **y**, and **g**. |
| Diphthongs | /ai/, /ei/, /au/ spelled ao, /oi/ | **oi** was already in the word list and missing from the prose. |
| Stress | Penultimate, full vowels | Already the teaching rule. No English reduction. |

A five-vowel system **without** length would match today’s word list more closely. It would also drop the published homonym rule (*kii*, *rood*, *ruum*). Length stays in the standard. The list is the part that has not caught up.

Making /ɾ/ the single reference for **r** was considered and not adopted. It would be easier for many learners and would not merge Simpli words, but it would move the reference away from the English source without a listener test. The tap remains accepted.

## Proposals that would change words

Not implemented. Each one changes spelling or a lexical contrast.

1. **Apply vowel length in the word list**, or officially stop using it. Applying it splits sit/seat, team/tim, and similar pairs, and makes the list match the spelling page. It also rewrites a large part of the vocabulary and moves some words away from a one-letter English look. Stopping length would delete a rule the site already teaches.
2. **Keep /v/ and /w/ distinct in teaching** (done as the reference) and, if wanted later, respell one side of the merged pairs only if a community prefers one sound for both letters.
3. **Repair generator errors without a blanket respelling:** *becos* → *bikos* (removes **c**, but *becos* is already the grammar word); stop collapsing **g** after **ng** so *finger* can keep its **g**; drop or respell *vouldn*, *souldn*, *kouldn*, *teahouse*.
4. **Decide the hot/hat merger.** Both are *hat* because AA and AE become **a**. Splitting them needs a new vowel, which this review does not recommend. Keeping the merger is the current list.

## What the site change does

The spelling page in every interface language now reads one inventory. IPA values are not translated. A missing familiar word is explained with tongue, lips, air, and voicing in that language. An English word is an extra label only in that case. No audio files were added.

## Decisions applied

1. Long vowels are optional and generally unused. The pronunciation page has no long-vowel table. One sentence says a doubled vowel may be used for clarity. The word list does not apply length: *key* is *ki*, *road* is *rod*, *room* is *rum*, *teacher* is *titjer*. *hot* and *hat* stay *hat*.
2. **v** and **w** stay separate. The list was reviewed. A fallback that turned English **w** into **v** was fixed (*wikiprojekt* and similar). A /w/ next to /v/ stays **w** (*resavwar*). *one* stays *van* and *won* stays *wan*.
3. Generator repairs, without a new pass over the whole vocabulary: *because* is *bikos* (including the grammar word); **g** after **ng** is kept (*fingger*, *ingglis*, *singgal*, *longger*); *wouldn*, *shouldn*, *couldn*, *councillor*, and *teahouse* are *wudn*, *sudn*, *kudn*, *kaonsiler*, and *tihaos*.
4. The stress example is *kampyuter*, which is already the list spelling.
5. The spelling line is “one sound = one or two letters”, because diphthongs and **tj** / **dj** use two letters. There are still no silent letters.
