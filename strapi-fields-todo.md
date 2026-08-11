# Strapi fields to fix

Generated from the `stub.ts` diff (frontend session that moved hardcoded UI copy
into Strapi content) plus the `employmentType` → `employmentTypeLabel` change,
plus the `*Md` fields added in commit `fa20180` ("convert plain-text description
fields to markdown"). Check the box once the field is fixed in Strapi.

## `block.feed` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| detailsTitle (text) | add | [x] |
| standardsTitle (text) | add | [x] |

## `footer` (single type / global)

| field_name | action | status |
|---|---|---|
| contactLabel (text) | add | [x] |

## `block.video-embed` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| videoTitle (text) | add | [x] |

## `block.contact-form` (component, used on Contact page)

| field_name | action | status |
|---|---|---|
| mapTitle (text) | add | [x] |

## `article` (collection type)

| field_name | action | status |
|---|---|---|
| relatedArticlesTitle (text) | add | [x] |

## `block.job-board` (component, used on Join Us page)

| field_name | action | status |
|---|---|---|
| formTitle (text) | add | [x] |

## job item (component nested in `block.job-board.jobs`)

| field_name | action | status |
|---|---|---|
| employmentTypeLabel (text) | add | [x] |
| employmentType (enumeration: full_time / part_time / full_part_time) | remove | [x] |
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

## contact (component nested in `block.feed` / `block.farm` / `block.food`)

| field_name | action | status |
|---|---|---|
| brochure (media, single image) | add | [x] |
| brochureUrl (text) | remove | [x] |

---

## From commit `fa20180` — plain-text → markdown fields

**Update:** the frontend's `xMd ?? x` fallback has now been removed from code
— every component below reads `xMd` only. The plain `x` field is no longer
read at all, so it's safe to delete from Strapi as soon as `xMd` is filled in
(no more "fill in first, remove later" two-step — do both at once).

### `block.farm` — steps (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| bodyMd (rich text / markdown) | add | [x] |
| body (text) | remove | [x] |

### `block.farm` — items (component)

| field_name | action | status |
|---|---|---|
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

### `block.farm` — cards (component)

| field_name | action | status |
|---|---|---|
| bodyMd (rich text / markdown) | add | [x] |
| body (text) | remove | [x] |

### `block.founder` (component, used on About Company page)

| field_name | action | status |
|---|---|---|
| bioMd (rich text / markdown) | add | [x] |
| bio (text) | remove | [x] |

### `block.timeline` — items (component)

| field_name | action | status |
|---|---|---|
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

### `block.brand-name` (component, used on About Company page)

| field_name | action | status |
|---|---|---|
| bodyMd (rich text / markdown) | add | [x] |
| body (text) | remove | [x] |

### `block.vision-mission` (component, used on About Company page)

| field_name | action | status |
|---|---|---|
| visionBodyMd (rich text / markdown) | add | [x] |
| visionBody (text) | remove | [x] |
| missionBodyMd (rich text / markdown) | add | [x] |
| missionBody (text) | remove | [x] |

---

## Follow-up — `stepsDesc` missed by the `fa20180` audit, fixed afterward

`block.farm`'s `stepsDesc` also had multi-paragraph content getting silently
dropped (plain-text render) but wasn't caught by the original audit. Fixed the
same way, then the plain field was dropped from code entirely (no fallback
kept) — so unlike the sections above, `stepsDescription` (the renamed plain
field) never needs to exist in Strapi at all. Only `stepsDescriptionMd` is
read by the frontend now.

### `block.farm` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| stepsDescriptionMd (rich text / markdown) | add | [x] |
| stepsDesc (text) | remove | [x] |

---

## Follow-up — `block.feed`/`block.farm`/`block.food` top-level `description`

Audited all three: Feed and Farm already rendered `description` through
`RichText` (worked correctly, just wasn't named `descriptionMd`). Food's
`description` was destructured in `FoodSection.astro` but never rendered
anywhere — a dead prop, even though Strapi already had real multi-paragraph
content in it. Fixed Food to actually render it (added a description block
above the bento grid, matching how Feed/Farm show theirs), then renamed the
field to `descriptionMd` on all three for naming consistency — same
convention as every other markdown field in this doc.

### `block.feed` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

### `block.farm` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

### `block.food` (component, used on About Product page)

| field_name | action | status |
|---|---|---|
| descriptionMd (rich text / markdown) | add | [x] |
| description (text) | remove | [x] |

Same as the `fa20180` fields above — no fallback in code, so `descriptionMd`
is required and `description` can be removed as soon as its content is
migrated over.

---

Notes:
- Fields in the top sections (`block.feed` through job item) are all short text
  and are **required** by the frontend now — no more hardcoded fallback, so those
  pages render an empty string until filled in.
- `contact.brochure` is a media (image) field, not text — clicking the CTA button
  opens the image directly in a new tab (`target="_blank"`), so no extra viewer/
  lightbox logic is needed. Swap `brochureUrl` out for `brochure` on all three
  contact components (feed/farm/food) at the same time so the frontend keeps
  working — it now reads `contact.brochure`, not `contact.brochureUrl`.
- `employmentType` enum is being replaced outright by `employmentTypeLabel` — once the
  new field is filled in on every job entry, delete the old enum field so editors don't
  fill in a value that's no longer read by the frontend.
- The `fa20180` section fields (and the `stepsDesc` follow-up) are now
  **required** — the frontend's `xMd ?? x` fallback was removed from code, so
  it only reads `xMd`. An entry missing `xMd` renders blank, not the old text.
  Add + remove can happen together per entry now; no more two-pass migration.
