# Project history and rationale

This file distills **decisions and reasoning** from early Cursor-assisted work on Simpli and this site. It is not a verbatim log. For raw chat exports, see the agent transcripts index at:

`~/.cursor/projects/Users-jeffaudi-Projects-simpli-global/agent-transcripts/README.md`

**Source of truth for spelling and grammar today:** [spec/ORTHOGRAPHY.md](spec/ORTHOGRAPHY.md), [spec/GRAMMAR.md](spec/GRAMMAR.md), and the live site. Orthography has been refined over time; if anything here disagrees with the spec, follow the spec.

---

## Website goals and architecture

- **Purpose:** Present Simpli as a concept—motivation, roots in real languages, grammar, vocabulary, spelling, comparisons with other auxiliary languages, sample texts, and “next steps” (community, reference materials, promotion).
- **Multilingual UI:** The site is built so **onboarding can happen in the visitor’s language**. Locales use path segments (`/en/`, `/fr/`, `/es/`), shared layout, and per-locale translation JSON. Simpli examples stay in Simpli; **UI chrome** is translated.
- **Tooling:** A **Makefile** was added for common tasks (build, dev, preview, etc.) alongside npm scripts.

---

## Domain, brand, and SEO

- **Canonical site:** **simpli.global** (replacing an earlier learn-simpli.org emphasis in some docs).
- **Positioning line (SEO):** Reinforce that **Simpli is a simple international language** in titles, meta descriptions, Open Graph, and shared leads—so search and snippets stay aligned with “international auxiliary / egalitarian communication” rather than drifting into generic “learning platform” positioning.
- **Implementation note:** `SITE_TITLE`, `SITE_DESCRIPTION`, and `SEO_DESCRIPTION_LEAD` in `src/consts.ts` carry this across **en / fr / es**.

---

## Motivation and tone

- **Neutrality wording:** “No single nation owns the standard” was softened to stress **inclusivity**: the standard is **for everyone to read and speak** (EN/FR/ES equivalents in `motivation-content.ts`).
- **Bridge language:** “Dominant national language” was rephrased to **complex historical national language**—same idea (access without full mastery of a heavy national norm), less confrontational.
- **Pronunciation objective:** Spelling is framed as helping **non-native speakers** be **more easily understood** by both native and non-native listeners—stated on the motivation page and spelled out on the spelling pages as a design goal (clearer pronunciation, fewer misunderstandings).
- **Grammar inspiration:** Copy emphasizes **Indonesian-style** grammar only; **Lao** was removed from mentions to avoid implying a dual template where only one is central.

---

## Orthography and alphabet (discussion themes)

Chats explored several rules and trade-offs. Rationales that keep recurring:

- **One sound, one spelling; no silent letters** — readability and learner pronunciation.
- **Long vowels as doubled letters** — disambiguation (*it* vs *iit*, *rum* vs *ruum*, etc.); detailed examples live on the spelling pages.
- **/tʃ/ and letter c:** Direction moved toward **tj** for /tʃ/, **k** for /k/, and **no letter c**, to reduce English-style ambiguity.
- **th, ph, sh, z** — mapped to simpler letters (e.g. th→d, ph→f) per the spec.
- **V vs W:** Discussed heavily: many learners do not contrast [v] and [w]; using one grapheme family reduces alphabet complexity. The **Alphabet rationale** subpage (under Spelling) explains **i vs y** as well: **i** = vowel, **y** = consonant [j]—different jobs, so both letters stay (unlike the v/w merge idea).
- **Iterative refinement:** Word lists and pages were **proofread** against Simpli rules (long vowels, mappings, compounds). The spec and `essential-words` may still change; treat chats as **reasoning**, not frozen law.

---

## Community and open questions

- **Topics for discussion** page: Simpli is new; **spelling and adoption** (e.g. unfamiliar digraphs vs simplicity) are explicitly **community questions**, not only editorial fiat.
- **Suggested discussion themes** from sessions included: **V vs W** policy, **th→d** vs keeping digraphs, **long vowel** strategy, **dj vs j**, vocabulary base (English-derived vs international roots), **proper nouns** (original spelling vs Simpli form), **geographical names** (simplified Simpli spelling vs each country’s romanization), how minimal grammar should be, stress rules, and **one standard vs tolerated variants**.
- **Discord** was referenced as **coming soon** for real discussion.

---

## Site structure and UX

- **Grammar rules** on the site were expanded so **all rules from the spec** appear as proper sections, not only two detailed rules and a collapsed list.
- **Spelling section** was enriched: letter lists, mappings, long vowels, stress, common endings—aligned with `spec/ORTHOGRAPHY.md`.
- **Alphabet rationale** was moved to a **subpage of Spelling** (like grammar → grammar rules), not a top-level nav item—deep orthography for readers who want it, without cluttering the main menu.
- **Footer:** Language links (English / Français / Español) were **removed**; **language switching stays in the header**.

---

## Hosting and DNS (reference)

- **OVH** does not offer **ALIAS/ANAME** at the apex. Options discussed: point the apex to Netlify with **A records** to Netlify’s load balancer IPs (verify current IPs in Netlify’s docs), use **redirect** if showing the Netlify URL is acceptable, or move **DNS** to a provider with apex ALIAS/CNAME flattening.

---

## How to use this file

- **Onboarding:** Quick narrative of *why* the site and language are shaped this way.
- **Writing new copy:** Check **consts**, **motivation-content**, and **spec** first; use this for background only.
- **Updating:** When a major decision changes the spec or site, add a short dated or ordered note here so future contributors see the intent, not only the diff.
