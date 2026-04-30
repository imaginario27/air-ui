# AirUI — Claude project rules

## Project

AirUI is a Vue 3 + Nuxt 4 + Tailwind CSS v4 design system published as two npm packages (`@imaginario27/air-ui-ds`, `@imaginario27/air-ui-utils`) with a Nuxt Content documentation site. It is a mature, actively-released library (DS at v1.12.1) using npm workspaces, Conventional Commits with scope validation (`ds` / `utils` / `docs` / `root`), Changesets, Vitest + `@vue/test-utils`, and ESLint via Nuxt. Vue 3.5.30, Nuxt 4.4.2, Tailwind 4.2.2, TypeScript 5.9.3.

## Workspace map

| Workspace | Purpose | Key entry | Run |
|---|---|---|---|
| [docs/](docs/) | Documentation site (Nuxt Content + MDC) | [docs/nuxt.config.ts](docs/nuxt.config.ts) | `npm run docs` |
| [packages/air-ui-ds/](packages/air-ui-ds/) | Component library | [packages/air-ui-ds/nuxt.config.ts](packages/air-ui-ds/nuxt.config.ts) | `npm run ds` |
| [packages/air-ui-utils/](packages/air-ui-utils/) | Utilities + composables | [packages/air-ui-utils/nuxt.config.ts](packages/air-ui-utils/nuxt.config.ts) | `npm run utils` |

`docs` Nuxt-extends both packages; `air-ui-ds` Nuxt-extends `air-ui-utils`. There is no bundler barrel — Nuxt auto-import is authoritative.

## Monorepo commands

Run from repo root:

- `npm run docs` / `npm run ds` / `npm run utils` — dev server per workspace
- `npm run test:ds` / `npm run test:utils` / `npm run test:docs` — vitest
- `npm run typecheck:ds` / `npm run typecheck:utils` / `npm run typecheck:all` — `vue-tsc --noEmit -p tsconfig.typecheck.json`
- `npm run publish:ds:patch|minor|major` / `npm run publish:utils:*` — full release pipeline (typecheck → version → publish → rebuild changelog → finalize)
- `npm run changeset` / `npm run version-packages` / `npm run release`

Commits: Conventional Commits enforced by commitlint + husky. Scope must be `ds`, `utils`, `docs`, or `root`. Example: `feat(ds): add ContextMenu`.

## Cross-workspace rules

- **Imports in components/composables/utils**: use `@/` (package root) — e.g. `import Alert from '@/components/alerts/Alert.vue'`. Do NOT deep-import another package's files with relative `../../` paths; rely on Nuxt layer `extends` (already configured in each workspace's `nuxt.config.ts`).
- **No barrel `index.ts`**. Components (`components/**`, `pathPrefix: false`), composables, and `models/**` are auto-imported by Nuxt. Do not create or expect barrel exports.
- **Shared enums + types** live in [packages/air-ui-ds/models/](packages/air-ui-ds/models/) (`enums/`, `types/`). Utils-only types live in [packages/air-ui-utils/models/types/](packages/air-ui-utils/models/types/). Both are globally available via `imports.dirs: ["models/**"]`.
- **Design tokens** flow: [packages/air-ui-ds/assets/css/theme/](packages/air-ui-ds/assets/css/theme/) (primitives.css → colors.css → ui-theme.css CSS vars) → declared under `@theme { … }` in [packages/air-ui-ds/assets/css/main.css](packages/air-ui-ds/assets/css/main.css) (Tailwind v4, no `tailwind.config.*`) → consumed as `bg-background-*`, `text-text-*`, `border-border-*`, `text-icon-*` utilities. Never introduce a new raw color; extend the theme tokens instead.

## Reuse before creating (no duplicates, no overengineering)

Before writing any new util, composable, store, component, enum, or type, **search the workspace for an existing equivalent and reuse/extend it**. Duplicates are easy to introduce here because Nuxt auto-import spans `air-ui-utils` → `air-ui-ds` → `docs`.

- **Utils / composables / stores** — grep [packages/air-ui-utils/utils/](packages/air-ui-utils/utils/), [packages/air-ui-utils/composables/](packages/air-ui-utils/composables/), and any `stores/` dir before adding a new file. Search by name *and* by behavior (e.g. before adding `formatDate`, also look for `toDate`, `dateString`, `humanizeDate`).
- **Components** — check the relevant [packages/air-ui-ds/components/](packages/air-ui-ds/components/) `<category>/` dir before adding a new component. Prefer extending an existing component with a prop/slot over forking a near-duplicate.
- **Enums / types** — check [packages/air-ui-ds/models/enums/](packages/air-ui-ds/models/enums/), [packages/air-ui-ds/models/types/](packages/air-ui-ds/models/types/), and [packages/air-ui-utils/models/types/](packages/air-ui-utils/models/types/) before declaring a new one.
- **Smallest viable change** — don't add abstractions, options, wrappers, or generic helpers the task didn't ask for. Three similar lines is fine; a premature abstraction is not.
- **If a new piece of code is genuinely needed**, briefly state what was searched and why no existing one fit before writing it.

## Adding a new component (checklist)

1. Create `packages/air-ui-ds/components/<category>/<ComponentName>.vue` (PascalCase filename = auto-imported name). Category dirs already exist (alerts, badges, buttons, modals, …).
2. If a prop uses a fixed value set, add or reuse an enum in [packages/air-ui-ds/models/enums/](packages/air-ui-ds/models/enums/). If it needs a shared object shape, add an `interface` in [packages/air-ui-ds/models/types/](packages/air-ui-ds/models/types/).
3. Write tests at `packages/air-ui-ds/tests/components/<category>/<ComponentName>.test.ts` (mirror the source path).
4. Create the docs page content at `docs/content/docs/components/<kebab-name>.md` starting with `## Component` + `::component-code` MDC block — no front matter.
5. Create the matching route at `docs/pages/docs/components/<kebab-name>.vue` with `definePageMeta({ title, layout: 'docs', overtitle: 'Components', description })`.
6. Add a sidebar entry in [docs/data/menu-items/sidebar/](docs/data/menu-items/sidebar/).
7. Add a changeset: `npm run changeset`.

## Common Claude mistakes to avoid

1. Writing `<script setup lang="ts">` with TS-generic `defineProps<{…}>()`. This repo uses runtime `defineProps({ key: { type: …, default: …, validator: … } })` with `PropType<T>` casts. Match the existing style.
2. Adding `<style scoped>` blocks. Components are Tailwind utility-first with `:class="[ … ]"` arrays — no `<style>` block is expected.
3. Hardcoding colors (`bg-red-500`, `text-white`, `#fff`). Always use semantic tokens (`bg-background-danger-bold`, `text-text-neutral-on-filled`).
4. Creating a barrel `index.ts` or adding manual exports. Nuxt auto-import handles everything; a barrel file will duplicate registration.
5. Importing across packages with relative paths (`../../air-ui-ds/...`). Use the auto-imported name or rely on Nuxt `extends` — no relative deep imports.
6. Writing docs `.md` with YAML front matter (`---\ntitle: …\n---`). The docs collection uses no front matter — page meta lives in the matching `docs/pages/**/*.vue` via `definePageMeta`.
7. Assuming a `tailwind.config.ts`. Tailwind v4 uses `@theme { … }` in [packages/air-ui-ds/assets/css/main.css](packages/air-ui-ds/assets/css/main.css) — edit CSS variables and the `@theme` declaration, never a JS config file.
8. Omitting a test file. Every component gets a test under `tests/components/<category>/<Name>.test.ts`; every new util gets a test under `tests/utils/<name>.test.ts`.
