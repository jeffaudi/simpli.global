# Contributing to Simpli

Two kinds of contribution, two licences:

- **Code** (Astro pages, scripts, configuration) is [MIT](LICENSE).
- **Content** (text in `src/translations/`, the specification in `spec/`, and files in `public/media/`) is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribute simpli.global.

By sending a translation or a content change, you agree it can be published under CC BY 4.0. By sending a code change, you agree it can be published under MIT.

## Translations

Translations are managed with [Weblate](https://hosted.weblate.org/). That is the way to amend a locale. The project page will be linked from the README once it is open.

Chinese, Japanese, Korean, Vietnamese, Thai, Khmer, Lao, Filipino, Indonesian, and Malay are machine-translated drafts. They are there so you correct wording rather than start from an empty file. French and Spanish were written for the site.

Rules while you translate:

- English (`src/translations/en.json`) is the source. Add a new string there, and only there.
- Do not translate the name **Simpli**, Simpli words (`yesterde`, `tumoro`, `woter`, …), phonetic notation, or example spellings inside `<em>` and `<strong>`.
- Keep HTML tags. Do not add tags, and do not change an `href`.
- A new locale also needs an entry in `astro.config.mjs` and `src/locales.ts`, plus an empty `src/translations/{locale}.json`. Ask a maintainer before adding one.

Nothing is published to simpli.global until a pull request is approved and merged into `main`. Merge Weblate pull requests with a merge commit, not a squash or rebase.

## Code

Open a pull request. `npm run build` checks the translation files and then builds the site. The check fails if a locale file is invalid JSON, contains a key that English does not have, or introduces HTML that the English string does not allow.
