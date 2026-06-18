# Project history and rationale

This file distills **decisions and reasoning** from early work on Simpli and this site. It is not a verbatim log.

**Source of truth for spelling and grammar today:** the live site ([Spelling](https://simpli.global/en/spelling), [Grammar rules](https://simpli.global/en/grammar-rules)) and the archived specification PDF. Orthography has been refined over time; if anything here disagrees with the current spec, follow the spec.

---

## Website goals and architecture

- **Purpose:** Present Simpli as a concept—motivation, roots in real languages, grammar, vocabulary, spelling, comparisons with other auxiliary languages, sample texts, and “next steps” (community, reference materials, promotion).
- **Multilingual UI:** The site is built so **onboarding can happen in the visitor’s language**. Locales use path segments (`/en/`, `/fr/`, `/es/`, and others), shared layout, and per-locale translation JSON. Simpli examples stay in Simpli; **UI chrome** is translated.
- **Tooling:** A **Makefile** supports common tasks (build, dev, preview, etc.) alongside npm scripts.

---

## Domain, brand, and SEO

- **Canonical site:** **simpli.global** (replacing an earlier learn-simpli.org emphasis in some docs).
- **Positioning line (SEO):** Reinforce that **Simpli is a simple international language** in titles, meta descriptions, Open Graph, and shared leads—so search and snippets stay aligned with “international auxiliary / egalitarian communication” rather than drifting into generic “learning platform” positioning.

---

## Motivation and tone

- **Neutrality wording:** “No single nation owns the standard” was softened to stress **inclusivity**: the standard is **for everyone to read and speak**.
- **Bridge language:** “Dominant national language” was rephrased to **complex historical national language**—same idea (access without full mastery of a heavy national norm), less confrontational.
- **Pronunciation objective:** Spelling is framed as helping **non-native speakers** be **more easily understood** by both native and non-native listeners.
- **Grammar inspiration:** Copy emphasizes **Indonesian-style** grammar only; **Lao** was removed from mentions to avoid implying a dual template where only one is central.

---

## Orthography and alphabet (discussion themes)

Chats explored several rules and trade-offs. Rationales that keep recurring:

- **One sound, one spelling; no silent letters** — readability and learner pronunciation.
- **Long vowels as doubled letters** — disambiguation (*it* vs *iit*, *rum* vs *ruum*, etc.).
- **/tʃ/ and letter c:** Direction moved toward **tj** for /tʃ/, **k** for /k/, and **no letter c**, to reduce English-style ambiguity.
- **th, ph, sh, z** — mapped to simpler letters (e.g. th→d, ph→f) per the spec.
- **V vs W:** Discussed heavily: many learners do not contrast [v] and [w]; using one grapheme family reduces alphabet complexity. The **Alphabet rationale** subpage (under Spelling) explains **i vs y** as well.
- **Iterative refinement:** Word lists and pages were **proofread** against Simpli rules. The spec and essential words may still change; treat this file as **reasoning**, not frozen law.

---

## Community and open questions

- **Topics for discussion** page: Simpli is new; **spelling and adoption** are explicitly **community questions**, not only editorial fiat.
- **Suggested discussion themes** included: **V vs W** policy, **th→d** vs keeping digraphs, **long vowel** strategy, **dj vs j**, vocabulary base, **proper nouns**, **geographical names**, how minimal grammar should be, stress rules, and **one standard vs tolerated variants**.

---

## Site structure and UX

- **Grammar rules** on the site list **all rules from the spec** as proper sections.
- **Spelling section** includes letter lists, mappings, long vowels, stress, and common endings.
- **Alphabet rationale** is a **subpage of Spelling**, not a top-level nav item.
- **Navigation** is grouped (About, Learn, Reference, Community) with **Media** in the Learn group; the footer links to lessons, dictionary, media, and specification.

---

## How to use this file

- **Onboarding:** Quick narrative of *why* the site and language are shaped this way.
- **Writing new copy:** Check the live specification pages and translation files first; use this for background only.
- **Updating:** When a major decision changes the spec or site, add a short note here so future contributors see the intent, not only the diff.
