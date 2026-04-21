# Architecture

## Repo structure

```
air-ui/
├── docs/                                  # Nuxt Content documentation site
│   ├── components/                        # docs-only Vue components (ComponentCode, Prose*, …)
│   ├── composables/                       # docs-only composables
│   ├── content/docs/                      # MDC pages — components/, utils/, getting-started/, blocks/
│   ├── data/                              # menu-items, tabs, portfolio (auto-imported)
│   ├── layouts/                           # docs.vue, default.vue
│   ├── models/                            # docs-only types + enums
│   ├── pages/docs/                        # Vue route files mapping 1:1 to content/docs/*.md
│   ├── plugins/                           # vue3-toastify, prettier
│   └── nuxt.config.ts                     # extends both packages as Nuxt layers
├── packages/
│   ├── air-ui-ds/                         # @imaginario27/air-ui-ds
│   │   ├── assets/css/                    # main.css + theme/ (primitives, colors, ui-theme)
│   │   ├── components/<category>/*.vue    # PascalCase, auto-imported, pathPrefix: false
│   │   ├── composables/use*.ts            # auto-imported
│   │   ├── models/enums/*.ts              # runtime-enum string unions
│   │   ├── models/types/*.ts              # interfaces + type aliases
│   │   ├── plugins/                       # vue3-toastify
│   │   ├── tests/components/<category>/   # *.test.ts mirroring source
│   │   └── tests/composables/             # use*.test.ts
│   └── air-ui-utils/                      # @imaginario27/air-ui-utils
│       ├── composables/use*.ts            # Nuxt/Vue-dependent helpers
│       ├── utils/*.ts                     # pure functions, JSDoc'd
│       ├── models/types/*.ts              # utils-only types
│       └── tests/utils/                   # vitest specs (coverage gap: see below)
├── scripts/                               # release automation (.mjs)
├── .changeset/                            # Changesets state
└── package.json                           # npm workspaces root
```

## Token / data flow

```
primitives.css ──► colors.css ──► ui-theme.css   (CSS custom properties)
                                       │
                                       ▼
                   main.css @theme { --color-* : var(...) }   (Tailwind v4 theme)
                                       │
                                       ▼
             DS components use semantic utilities (bg-background-*, text-text-*, …)
                                       │
                                       ▼
             docs/ renders real DS components through ::component-code MDC blocks
```

No `tailwind.config.{ts,js}` exists. Tailwind v4 is configured via `@import "tailwindcss"` + `@theme { … }` in [packages/air-ui-ds/assets/css/main.css](packages/air-ui-ds/assets/css/main.css). The docs site loads the same CSS via Nuxt layer extension.

## Dependency graph

| From | Depends on | How |
|---|---|---|
| `docs/` | `@imaginario27/air-ui-ds` | Nuxt `extends: ['../packages/air-ui-ds', '../packages/air-ui-utils']` |
| `docs/` | `@imaginario27/air-ui-utils` | same (via extends) |
| `packages/air-ui-ds` | `@imaginario27/air-ui-utils` | Nuxt `extends: ['../air-ui-utils']` |
| `packages/air-ui-utils` | — | leaf package, no internal deps |

## Key files

| File | Role | Edit when… |
|---|---|---|
| [package.json](package.json) | Root scripts (dev/test/typecheck/publish:* per package) | Adding a cross-workspace script or release flow |
| [packages/air-ui-ds/assets/css/main.css](packages/air-ui-ds/assets/css/main.css) | Tailwind v4 entry + `@theme` token declaration | Adding/removing a semantic token exposed as a utility |
| [packages/air-ui-ds/assets/css/theme/](packages/air-ui-ds/assets/css/theme/) | CSS-variable theme layers (primitives → colors → ui-theme) | Rebranding, dark-mode values, new semantic color |
| [packages/air-ui-ds/nuxt.config.ts](packages/air-ui-ds/nuxt.config.ts) | DS layer config, auto-import dirs, icon bundle | Registering modules, changing auto-import scope |
| [docs/nuxt.config.ts](docs/nuxt.config.ts) | Docs layer, `extends`, nuxt-llms, mcp, runtimeConfig | Adding modules or env-driven config |
| [docs/content.config.ts](docs/content.config.ts) | `@nuxt/content` collection definition (`type: 'page', source: '**/*.md'`) | Splitting collections or adding schema |
| [packages/air-ui-ds/tests/setup.ts](packages/air-ui-ds/tests/setup.ts) | Vitest global stubs (`MdiIcon`, `NuxtLink`, `MaxWidthContainer`) | Stubbing a new ubiquitous component |
| [.commitlintrc.json](.commitlintrc.json) | Conventional commit scope validation | Introducing a new workspace/scope |
| [scripts/](scripts/) | Release pipeline (`check-git-clean`, `rebuild-release-history`, `finalize-release`) | Changing how versions or changelogs are produced |
