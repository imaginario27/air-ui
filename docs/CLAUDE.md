# docs/ — Claude rules

The `docs/` workspace is a Nuxt 4 + Nuxt Content (v3) site. It Nuxt-extends both `packages/air-ui-ds` and `packages/air-ui-utils`, so every DS component and utility is auto-imported and available inside MDC.

## Content vs routes

Each component or util has two files that must stay in sync:

| Location | Purpose |
|---|---|
| `docs/content/docs/<section>/<kebab>.md` | MDC body — `::component-code`, `::props-table`, `::options-table` blocks + prose. **No front matter.** |
| `docs/pages/docs/<section>/<kebab>.vue` | Route wrapper that calls `queryCollection('content').path(cleanPath)` and sets `definePageMeta`. |

`<section>` ∈ `components` \| `utils` \| `getting-started` \| `blocks`.

## Page meta (in `.vue`, not `.md`)

| Field | Type | Example |
|---|---|---|
| `title` | string | `'Alert'` |
| `layout` | string | `'docs'` |
| `overtitle` | string | `'Components'` \| `'Utilities'` \| `'Getting started'` \| `'Blocks'` |
| `description` | string | one-line summary rendered in page header + meta tags |

## MDC component-demo pattern

Every component page begins with `## Component` followed by `::component-code`. `srcDir` is a path relative to `packages/air-ui-ds/components/`:

```md
## Component

::component-code
---
srcDir: 'alerts/Alert.vue'
props:
    type: "info"
    title: "Title"
items:
    type:
        - value: info
          text: INFO
        - value: success
          text: SUCCESS
emits:
    close: "() => console.log('Close alert')"
enums:
    type: "AlertType"
previewBackground: 'white'
---
::
```

Other MDC blocks used site-wide: `::props-table`, `::options-table`, `::grid`, `::feature-card`, `::card-actions`, `::action-button`, `::content-alert`, `::generic-table`. Block pages use `componentSource: 'docs'` to load from `docs/components/content/blocks/**`.

## Heading hierarchy

- `##` `Component` — live demo (always first)
- `##` `Props` — `::props-table`
- `##` `Usage` — one `### <propName>` per prop, in `Props` order; each contains a short sentence, a fenced `vue` snippet, `- **Type:**` / `- **Default:**` lines, plus `#### Options` + `::options-table` for enum props
- `##` `Emits` — `::options-table` + `#### Example`
- `##` `Slots` — only when slots exist

Never skip levels (no `##` → `####`). Never use `#` — the page title comes from `definePageMeta`.

## Writing conventions

- Second-person, imperative, present tense: "Sets the title of the alert."
- One idea per paragraph; code-to-text ratio is high.
- Vue/TS fenced blocks only. Enum values in prose use UPPER_CASE (`AlertType.SUCCESS`); `::component-code` `props:` use the literal string value (`type: "info"`).

## What to avoid

- Front matter in any `docs/content/**/*.md`.
- Raw HTML in MDC (inline `<strong>`/`<a>` inside a `description` string is tolerated).
- Empty `## Usage` or `## Emits` sections.
- Skipping heading levels or using `#`.
- Placeholder demo props ("Lorem ipsum", `TODO`) — use the component's real defaults.
- Hardcoded sidebar routes — register new pages in [docs/data/menu-items/sidebar/](data/menu-items/sidebar/).
