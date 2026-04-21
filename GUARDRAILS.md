# Guardrails

1. ALWAYS use `<script setup lang="ts">` with runtime `defineProps({ key: { type: … as PropType<T>, default, validator } })`. NEVER use `defineProps<Interface>()` generic form.
2. ALWAYS type enum-like props with an enum from `packages/air-ui-ds/models/enums/` and a `validator: (v) => Object.values(Enum).includes(v)`.
2a. ALWAYS bind the enum member when consuming such a prop: `<ActionButton :size="ButtonSize.MD" :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED" />`, never `size="md"` / `styleType="primary-brand-filled"`. Applies in DS sources, `docs/pages/**`, `docs/components/**`, and downstream apps. Exception: MDC `::component-code` `props:` YAML inside `docs/content/**/*.md` uses string literals by design.
3. NEVER use the Options API, `defineComponent({ data() … })`, or `.tsx` components. The repo is `<script setup>` only.
4. NEVER add a `<style>` or `<style scoped>` block to DS components. Styling is Tailwind utility-first via `:class="[…]"` arrays.
5. NEVER hardcode colors, radii, or spacings (`bg-red-500`, `#fff`, `rounded-lg` with a raw value instead of `rounded-button`). Use semantic tokens: `bg-background-*`, `text-text-*`, `border-border-*`, `text-icon-*`, `rounded-button`, `opacity-disabled`, `spacing-section-*`.
6. NEVER edit a nonexistent `tailwind.config.*`. Tailwind v4 config lives in `packages/air-ui-ds/assets/css/main.css` under `@theme { … }` with variables from `assets/css/theme/*.css`.
7. NEVER create a barrel `index.ts` in any package. Nuxt auto-imports every component (`pathPrefix: false`), composable, and `models/**` file.
8. NEVER deep-import another package with relative `../../packages/...` paths from source. Rely on auto-import or Nuxt layer `extends`.
9. ALWAYS mirror a component's path in tests: `components/<cat>/<Name>.vue` → `tests/components/<cat>/<Name>.test.ts` using `mount` from `@vue/test-utils` and imports from `@/…`.
10. ALWAYS co-create a test file for every new util in `packages/air-ui-utils/utils/*.ts` → `packages/air-ui-utils/tests/utils/<name>.test.ts`.
11. ALWAYS co-create a docs pair for every new component: content at `docs/content/docs/components/<kebab>.md` (no front matter, begins with `## Component` + `::component-code`) and route at `docs/pages/docs/components/<kebab>.vue` with `definePageMeta({ title, layout: 'docs', overtitle, description })`.
12. NEVER add YAML front matter (`---\ntitle: …\n---`) to files in `docs/content/docs/**`. Page meta goes in the `.vue` route file, not in MDC content.
13. ALWAYS declare `defineOptions({ inheritAttrs: false })` when a component spreads `$attrs` on an inner element via `v-bind`.
14. ALWAYS name a component's enum prop consistently across file → enum → docs `enums:` key (e.g. `styleType` prop → `BadgeStyle` enum → docs `enums: { styleType: "BadgeStyle" }`).
15. ALWAYS encode variants as a `computed` returning an `Object.values`-validated map keyed by the enum; NEVER use CVA, `class-variance-authority`, or ad-hoc string concatenation.
16. ALWAYS emit events via `defineEmits(['eventName'])` (array form) or with typed object form, matching existing components in the same category. Kebab-case event names (`update:modelValue`, `close`).
17. NEVER add demo or story content using placeholder text like "Lorem ipsum" or `TODO`. Use realistic default prop values (see existing `text: 'Badge'`, `title: 'Title'`).
18. NEVER introduce slots in a DS component without reflecting them in the corresponding `docs/content/docs/components/<name>.md` page.
19. NEVER skip husky/commitlint with `--no-verify`. Commits must follow `<type>(ds|utils|docs|root): <subject>`.
20. ALWAYS import test subjects via the `@/` alias (e.g. `import Alert from '@/components/alerts/Alert.vue'`), never relative paths.
