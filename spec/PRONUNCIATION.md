# Simpli pronunciation

Living reference for the sounds of Simpli. Spelling rules stay in [ORTHOGRAPHY.md](ORTHOGRAPHY.md). The website reads the same inventory from `src/data/phonology.ts`. Locale pages may explain a sound. They do not change the IPA in this file.

No reference audio is published. The IPA symbol is the standard until a checked recording exists.

## How to choose a sound

1. People with different first languages should understand one another.
2. Do not require a distinction that is hard for many learners and that Simpli does not need.
3. Each sound has one spelling pattern and one reference IPA symbol.
4. Keep English pronunciation where it already fits those three points.
5. An accent is acceptable when it does not make two Simpli words sound the same.

English is a guide, not a law.

## Terms

- **Orthography:** how a word is written.
- **Phonemes:** the differences Simpli uses to keep words apart.
- **Reference pronunciation:** the canonical IPA below.
- **Phonetic realization:** how a person may actually say that phoneme.
- **Accent variation:** a difference that comes from a first language.

## Status of a variant

- **Standard:** the canonical IPA.
- **Accepted:** a regional realization that keeps Simpli words distinct.
- **Understandable, not the standard:** a common learner sound. Some of these still need a check with listeners.
- **Not recommended:** a sound likely to merge distinct Simpli words. `∅` means the sound is left out.

## Canonical inventory

| id | IPA | accepted | not recommended |
| --- | --- | --- | --- |
| a | /a/ | [ɑ] | [e] |
| e | /e/ | [ɛ] | [i] [a] |
| i | /i/ | [ɪ] | [e] |
| o | /o/ | [ɔ] | [u] |
| u | /u/ | [ʊ] | [y] |
| aa | /aː/ | [ɑː] | [eː] |
| ee | /eː/ | [ɛː] | [eɪ] |
| ii | /iː/ | — | [eɪ] |
| oo | /oː/ | [ɔː] | — |
| uu | /uː/ | — | [y] |
| ai | /ai/ | [aɪ] | — |
| ei | /ei/ | [eɪ] | — |
| ao | /au/ | [aʊ] | — |
| oi | /oi/ | [ɔɪ] | — |
| p | /p/ | — | [b] |
| b | /b/ | — | [p] |
| t | /t/ | — | [d] |
| d | /d/ | — | [t] |
| k | /k/ | — | [g] |
| g | /g/ | — | [k] |
| m | /m/ | — | — |
| n | /n/ | — | — |
| f | /f/ | — | [h] |
| s | /s/ | — | — |
| l | /l/ | — | [r] [ɹ] |
| r | /ɹ/ | [ɾ] [r] | ∅ |
| h | /h/ | — | ∅ [f] |
| v | /v/ | — | ∅ |
| w | /w/ | — | ∅ |
| y | /j/ | — | [dʒ] |
| tj | /tʃ/ | [tɕ] | [s] [ʃ] |
| dj | /dʒ/ | [dʑ] | [j] [ʝ] [g] |

A doubled vowel (`aa`, `ee`, `ii`, `oo`, `uu`) is optional. It is the same quality held longer, and it may be used for extra clarity. In general, do not use it. `ai`, `ei`, `ao`, and `oi` are one syllable. `ao` is the spelling of /au/. Any other vowel pair is two syllables.

## Vowels

The reference is a five-vowel set, /a e i o u/. Length is optional and generally unused. *father* and *hat* are **a**. When English writes that vowel with **o**, the spelling keeps **o** (*hot*, *not*, *on*). That can make two words share a spelling. English “father” and “cat”, or “sit” and “see”, are not two Simpli phonemes. [æ] for **a**, [ɛ] for **e**, [ɪ] for short **i**, [ɔ] for **o**, and [ʊ] for short **u** are allowed when they stay clear of the neighboring vowel. [y], the French *u* of *tu*, is not **u**.

This is not a full English vowel inventory. Adding /æ/ and /ɑ/ as separate phonemes would be harder for many learners, and the word list already merges them.

## R

The reference is the approximant /ɹ/, because that is the English source of the vocabulary and because Simpli has no second r-sound to contrast with it. A tap [ɾ] or a trill [r] is accepted: both keep words apart, and both are easier for many learners. A uvular [ʁ] is understandable and is flagged for listener testing. Leaving **r** out is not recommended. The word list has many pairs such as *long*/*rong* and *lait*/*rait* only if **l** and **r** stay different, and many more if **r** is deleted.

## V and W

Write **w** where English writes **w**, and **v** otherwise. The reference is /v/ for **v** and /w/ for **w**. Pronouncing both letters with one of those sounds is widely understood, but it merges *veri*/*weri*, *wi*/*vi*, and *van*/*wan*. That cross-pronunciation is understandable, not accepted. The word list keeps the two spellings. A /w/ that sits next to a /v/ stays **w** even when English has no letter w, so the two sounds are not collapsed (*resavwar*).

## H

/h/ is a puff of air from the throat, with the tongue down and the lips relaxed. It is not **f**, and it is not the Arabic **ح**. Speakers whose language has no /h/ should not skip it: *hand*/*and* and *hav*/*av* are different words. A velar [x] or a voiced [ɦ] is understandable and needs listener testing.

## TJ and DJ

**tj** is /tʃ/. **dj** is /dʒ/. [tɕ] and [dʑ] are accepted. **tj** must not become a plain **s** (*tjip*/*sip*). **dj** must not become **y** or **g** (*djet*/*yet*, *djet*/*get*). [ʒ] for **dj** is understandable and needs listener testing.

## Clusters, stress, and weak vowels

The usual syllable is consonant + vowel + optional consonant. The word list also keeps clusters. A short extra vowel is understandable while learning. The reference has no extra vowel. Stress the second-to-last syllable. Do not weaken other vowels to schwa.

Before **k** or **g**, **n** may sound like [ŋ]. That is a realization of **n** in that position, not a separate letter.

## Listener checks

These understandable variants are not yet treated as accepted:

- **o** and **oo:** [oʊ], if length still keeps **o** and **oo** apart
- **u** and **uu:** unrounded [ɯ] / [ɯː]
- **f:** [ɸ], if it stays distinct from **h**
- **s:** [ʃ], if it stays distinct from **tj**
- **r:** [ʁ]
- **h:** [x], [ɦ]
- **v** and **w:** [β], if the two letters stay distinct
- **dj:** [ʒ]

## Worked comparisons

| First language | Close sounds | Needs an explanation |
| --- | --- | --- |
| French | Most stops, /v/, /w/ in *oui*, /j/ | **h** (silent in French), **u** (not French *u*), **r** (uvular is only understandable), **tj**/**dj** |
| Spanish | Five vowels, **tj** as *ch*, tap **r** | **h**, phonemic /v/, **dj** (not *yo*) |
| Mandarin | **a**, **i**, **u**, **w**, **y**, affricates near **tj** | Voicing, **e**, **o**, true /h/ rather than pinyin *h*, voiced **dj** |
| Japanese | **a e i o**, **h**, tap for **r** | **l** versus **r**, rounded **u**, **f** versus ふ, **v** |
| Lao | Five vowels, **h**, **w**, **l**, **tj** near ຈ | **r** must not become **l**, **v**, **g**, **dj** |
| Arabic | **a i u**, **r** as a trill, **h** as ه, **dj** as ج in Modern Standard Arabic | **e**, **o**, **p**, **v**, **g** versus ج, Egyptian **g** for **dj** |
