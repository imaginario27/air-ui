# packages/air-ui-ds — Claude rules

Component library for `@imaginario27/air-ui-ds`. Nuxt 4 layer consumed by `docs/` and by downstream apps. Components, composables, and `models/**` are auto-imported by name (`components: [{ path: './components', pathPrefix: false }]`). There is no barrel.

## Component anatomy

Order: `<template>` first, `<script setup lang="ts">` second, no `<style>` block. See [components/alerts/Alert.vue](components/alerts/Alert.vue) and [components/badges/Badge.vue](components/badges/Badge.vue) as canonical examples.

```
<template>
  <element :class="[ base utilities, ...computedVariantClasses, conditional && 'class' ]">
    …use auto-imported DS children (Icon, AlertButton, NuxtLink) without imports…
  </element>
</template>

<script setup lang="ts">
// 1. Optional: import components that are not auto-imported (e.g. NuxtLink from '#components')
// 2. defineOptions({ inheritAttrs: false }) — only when spreading $attrs
// 3. defineProps({ … }) — runtime object form
// 4. defineEmits([...])
// 5. computed variant class maps (one per visual axis)
</script>
```

## Props

- Use the **runtime object form** exclusively: `{ type: … as PropType<T>, default, validator }`. Do not use the TS-generic `defineProps<…>()` form.
- Cast every type with `PropType<T>`, including `String as PropType<string>` for pass-through string props (see [components/kbds/Kbd.vue](components/kbds/Kbd.vue)).
- Required-ness is implicit: if there is no `default` and the prop is `String as PropType<string>`, it is optional. Required props are rare in this DS; prefer sensible defaults (`text: { default: 'Button text' }`).
- Any prop whose value set is fixed must use an enum from [models/enums/](models/enums/) + a `validator: (v) => Object.values(Enum).includes(v)`. See `ButtonStyleType`, `AlertType`, `ColorAccent`, `ButtonSize`.
- `PropType<number | string>` is the pattern for props that accept either (e.g. `positionXOffset` in [components/dropdowns/ContextMenu.vue](components/dropdowns/ContextMenu.vue)). Declare the type as `[Number, String]`.
- Two-way binding uses `modelValue: { type: Boolean/String/…, default }` paired with `update:modelValue` in emits.

## Emits

- `defineEmits(['eventName'])` array form in most components. Use `update:modelValue` for v-model, `close` for dismissals, `click` for click forwarding.
- Wrap emission in a guarded handler when the event depends on state (see `emitClick` in [components/buttons/ActionButton.vue](components/buttons/ActionButton.vue)).
- Event names are kebab-case or single-word; never camelCase in the emit string.

## Slots

- Default slot: just `<slot />`.
- Named slots use `v-if="$slots.<name>"` fallback followed by a default block (see [components/dropdowns/ContextMenu.vue](components/dropdowns/ContextMenu.vue) `#items` slot).
- Scoped slots pass named bindings, not a single object: `<slot name="items" :onClose="onClose" />`.
- Any slot added to a component must be documented in the matching `docs/content/docs/components/<name>.md` with an `## Slots` section.

## Tailwind & token policy

- Utility-first. Classes live in `:class="[ … ]"` arrays, never in `class="long string"` when variants are involved. No `@apply`.
- Approved token families (semantic):
  - Backgrounds: `bg-background-{surface|overlay|container-surface|neutral-*|primary-brand-*|secondary-brand-*|success-*|warning-*|danger-*|info-*|delete-*}`
  - Text: `text-text-{default|neutral-*|primary-brand-*|secondary-brand-*|success|warning*|danger|info|delete|error}`
  - Icons: `text-icon-{neutral-*|primary-brand-*|secondary-brand-*|success*|warning*|danger*|info*|rating}` (often with `!` prefix when overriding a child `<Icon>`'s color)
  - Borders: `border-border-{default|neutral-*|primary-brand-*|secondary-brand-*|success*|warning*|danger|info*|delete*|inactive|error}`
  - Radius: `rounded`, `rounded-full`, `rounded-lg`, `rounded-button`
  - Spacing: `spacing-column-gap`, `spacing-section-*`, `spacing-content-*`
  - Opacity: `opacity-disabled`
- Banned in components: raw Tailwind palette (`bg-red-500`, `text-gray-700`, `border-blue-600`), hex literals, arbitrary color expressions. If a token is missing, add it to [assets/css/theme/](assets/css/theme/) + [assets/css/main.css](assets/css/main.css) first.
- Arbitrary values are acceptable for non-color primitives (`h-[24px]`, `w-[16px]`, `min-w-[20px]`, `z-9999`) — see sizing maps in [components/buttons/ActionButton.vue](components/buttons/ActionButton.vue).

## Variants — how to add one

1. Add the new value to the corresponding enum in [models/enums/](models/enums/) (e.g. adding `GHOST` to `ButtonStyleType`).
2. In each `computed` class map inside the component, add a key for the new enum value returning its utility list. Every axis (background / text / icon / border) needs a branch.
3. Leave the `|| [fallback]` at the end untouched — it preserves safe rendering when an unknown value slips in.
4. Update the docs page's `::component-code` `items:` block and `::props-table` to include the new option.
5. Add at least one test case exercising the new variant (prefer `it.each` — see `Alert.test.ts`).

## File & export naming

- File: `PascalCase.vue` (e.g. `DropdownSelect.vue`). File basename becomes the auto-import name. No `index.ts`, no manual export.
- Category directory: `kebab-plural` (`alerts/`, `buttons/`, `dropdowns/`, `modals/`). One component family per directory; sub-dirs allowed (`buttons/toggle/`, `buttons/options/`).
- Docs filename: `kebab-singular` matching the component (`Alert.vue` → `alert.md` → `alert.vue`).

Example: `components/badges/IconTextBadge.vue` is auto-imported as `<IconTextBadge />`; its test lives at `tests/components/badges/IconTextBadge.test.ts`; its docs live at `docs/content/docs/components/icon-text-badge.md` and `docs/pages/docs/components/icon-text-badge.vue`.

## Tests

- Location: [tests/components/\<category\>/\<Name\>.test.ts](tests/components/) — mirror the component path.
- Import from the `@/` alias: `import Alert from '@/components/alerts/Alert.vue'`.
- Environment is `nuxt` (see [vitest.config.ts](vitest.config.ts)); globals enabled (no `import { describe, it, expect }` needed).
- `tests/setup.ts` stubs `MdiIcon`, `NuxtLink`, `MaxWidthContainer`. Do not restub them per test.
- Prefer `it.each` for matrix-style variant assertions (see Alert's icon-per-type test).
