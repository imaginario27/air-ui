---
name: docs-page
description: Create or update an AirUI documentation page for a component (content .md + route .vue + registry entry) following the repo's fixed section order and per-prop Usage pattern. Use whenever the user asks to document a component, add a docs page, or fix/extend an existing page under docs/content/docs/components.
---

# docs-page

Creates `docs/content/docs/components/<kebab>.md` + `docs/pages/docs/components/<kebab>.vue` + the registry entry. Reference pages: `action-button.md` (simple), `tree-view.md` (composable-backed, slots, interfaces, accessibility, emits, methods).

## Before writing

1. Read the component source in `packages/air-ui-ds/components/<category>/<Name>.vue`: every prop (type, default, validator), slot, emit, and exposed method.
2. Find enums used by props in `packages/air-ui-ds/models/enums/` and interfaces in `models/types/`.
3. Check whether the component is backed by a composable (`packages/air-ui-ds/composables/` or `packages/air-ui-utils/composables/`). Grep for `use<Name>`.
4. Read one existing page from the same category to match tone.

## Content file structure (strict order)

No front matter. Never `#`. Never skip heading levels. Omit a section only where marked optional.

| # | Heading | When | Content |
|---|---|---|---|
| 1 | `## Component` | always | `::component-code` block |
| 2 | `## Composable` | only if the component ships/uses a public composable | what it does, returned API in an `::options-table`, one `vue`/`ts` example |
| 3 | `## Props` | always | one `::props-table`, props in source order |
| 4 | `## Slots` | only if slots exist | `::slots-table` + one `vue` example |
| 5 | `## Usage` | always | one `### <propName>` per prop, same order as `## Props` |
| 6 | `## Accessibility` | when there is something to say (roles, keyboard, aria-label guidance). Not always | short prose, `::options-table` for keyboard shortcuts |
| 7 | `## Emits` | only if emits exist | `::options-table` + `#### Example` |
| 8 | `## Methods` | only if `defineExpose` exposes methods | `::options-table` + one example |

Extra topical sections (e.g. `## Metadata`) go between Accessibility and Emits only when really needed.

### 1. `## Component`

```md
## Component

::component-code
---
srcDir: '<category>/<Name>.vue'
props:
    styleType: "primary-brand-filled"
    text: "Button label"
items:
    styleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
emits:
    click: "() => console.log('Button clicked')"
enums:
    styleType: "ButtonStyleType"
---
::
```

- `props:` uses real defaults and literal string values (not enum members; the one allowed exception to GUARDRAILS 2a). No lorem ipsum.
- Every enum prop gets an `items:` list (`value` = literal, `text` = enum key) and an `enums:` entry. The enum name must match the source.
- Add `emits:` for each emit worth demoing; `previewBackground: 'white'` when the component needs it.

### 3. `## Props`

```md
::props-table
---
props: [
    {
        "name": "size",
        "default": "ButtonSize.LG",
        "type": "ButtonSize"
    },
    {
        "name": "iconClass",
        "type": "string"
    },
]
---
::
```

Omit `default` when the prop has none. Enum defaults are written as `Enum.MEMBER`; string defaults keep their quotes (`"'button'"`).

### 5. `## Usage` — one `###` per prop

Every prop gets its own title, a one-sentence description (second person, imperative, present tense), a `vue` snippet and the type/default lines.

````md
### size

Controls sizing via the `ButtonSize` enum.

```vue
<template>
    <ActionButton :size="ButtonSize.XL" />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.LG`

#### Options

::options-table
---
options: [
    { value: "XS", description: "xs" },
]
---
::
````

Rules:

- Snippet shows the prop in `<template>`. Add a `<script setup lang="ts">` block when it needs data/handlers (see `nodes` in tree-view.md).
- Enum props bind the enum member (`:size="ButtonSize.XL"`), never the literal string. Booleans: `disabled` or `:isRounded="true"` as the surrounding page does.
- Enum or union props add `#### Options` + `::options-table` (values in UPPER_CASE for enums, literal for string unions).
- Omit `- **Default:**` when there is no default.
- Closely coupled props (e.g. `isFullWidth` and `isMobileFullWidth`) may share one `###`; otherwise one prop = one title.
- **Whenever a prop uses a specific interface**, add `#### TypeScript Interface` right after the Type/Default lines (and after Options, if any) with a `ts` block of the interface, with short inline comments for non-obvious fields. Same rule for an emit payload or slot-prop interface: add it under that section.
- Link related props with `[loadChildren](#loadchildren)`.

### 6. `## Accessibility`

State what is built in, when `aria-label` is needed, and keyboard behaviour (table). Include a `vue` example if the consumer must add attributes. Skip the section only when there is genuinely nothing to document.

### 7. `## Emits`

````md
## Emits

::options-table
---
options: [
    { value: "@click", description: "Triggers a callback while using actionType: `ACTION`." },
]
---
::

#### Example

```vue
<template>
    <ActionButton @click="handleClick" />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log("Button clicked")
}
</script>
```
````

Use `@event` names in kebab-case (`@load-error`, `@update:expandedValue`). Describe the payload.

## Route file

`docs/pages/docs/components/<kebab>.vue` — copy `kbd.vue` exactly, changing only `title`, `description`. `overtitle: 'Components'`, `layout: 'docs'`. For a family of related components, copy the tabbed variant in `action-button.vue` (`TabBar` + `tabs: TabItem[]`).

## Registry (so it shows in sidebar and the components grid)

Add an entry to [docs/data/portfolio/components.ts](../../../docs/data/portfolio/components.ts) (`title`, `to`, `imgUrl`; the sidebar in `docs/data/menu-items/sidebar/components.ts` derives from it). Reuse an existing thumbnail if no new image exists and tell the user.

For utils, the registry is [docs/data/portfolio/utils.ts](../../../docs/data/portfolio/utils.ts).

**Alphabetical order:** whenever you create or edit a component or util, its entry must sit in alphabetical order by `title` (case-insensitive) within its section (`// LAYOUT`, `// ELEMENT`, …). Place new entries at the right spot, and if you rename a `title`, move the entry. Do not reorder other entries or move entries between sections unless asked; if you notice existing entries out of order, mention it instead of fixing it silently.

## Also

- Do NOT create a changeset (user preference).
- Do not commit unless asked; when asked use the `commit` skill (`docs(docs): …` for docs-only changes).

## Checklist before finishing

- [ ] Section order matches the table above; no empty sections
- [ ] `## Props` and `## Usage` list the same props in the same order, and match the source
- [ ] Each enum prop has `items`/`enums` in the demo, and `#### Options` in Usage
- [ ] Each interface-typed prop/emit has `#### TypeScript Interface`
- [ ] No front matter, no `#`, no skipped heading levels, no raw HTML
- [ ] Route file and registry entry exist, and the entry is in alphabetical order within its section
