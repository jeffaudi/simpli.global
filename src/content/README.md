# Page markdown (`src/page-markdown/`)

Long-form pedagogy copy for locale pages. **Not** routed directly — loaded by [`src/content/load.ts`](load.ts) and rendered in `[locale]/*.astro` templates.

## Layout

```
page-markdown/
  spelling/
    en.md
    fr.md
    …
  spelling/alphabet-rationale/
    en.md
    …
```

- **Path:** `page-markdown/{slug}/{locale}.md`
- **Slug** matches the site route (e.g. `spelling`, `spelling/alphabet-rationale`).
- **Fallback:** if `{locale}.md` is missing, `en.md` is used.

## Links

Use relative paths in markdown; they are rewritten at render time:

- `./alphabet-rationale` → locale-prefixed spelling subpage
- `..` → parent slug (e.g. spelling overview)

## Regenerating from legacy `.astro`

`scripts/extract-markdown-pages.mjs` can extract bodies from old per-locale page files (one-off migration aid).
