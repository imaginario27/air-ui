# packages/air-ui-utils — Claude rules

Utility + composable library for `@imaginario27/air-ui-utils`. Leaf Nuxt layer with no internal package dependencies. Auto-imports `models/**`; composables and utils are picked up by the Nuxt layer system when the package is extended.

## Composable vs util

- **Composable** (`composables/use*.ts`) — reactive state, lifecycle, or Nuxt/Vue runtime dependency (`ref`, `computed`, `useRouter`, VueUse). Exported as `export const useX = () => { … }` or `export function useX<T>(…)`. See [composables/useTable.ts](composables/useTable.ts) and [composables/useNavigation.ts](composables/useNavigation.ts).
- **Util** (`utils/*.ts`) — pure function, no Vue reactivity, no Nuxt runtime. Exported as `export const verbNoun = (…): ReturnType => …` (arrow form preferred). See [utils/strings.ts](utils/strings.ts), [utils/numbers.ts](utils/numbers.ts), [utils/dates.ts](utils/dates.ts).

Decision rule: if removing `ref`/`computed`/Nuxt calls would leave an identical function, it is a util, not a composable.

## Function signatures

- Positional parameters with JSDoc for every parameter. No options objects for ≤3 args (see `trimText(inputString, maxLength, readMoreText?, readMoreLink?)`).
- Optional parameters with defaults belong at the tail with `= defaultValue`, not `| undefined`.
- Always declare the return type explicitly (`: string`, `: string | null`, `: void`).
- One exported function per logical concern; group related functions in one file named for the domain (`strings.ts`, `dates.ts`, `passwords.ts`).

## Generics

- Composables use `<T extends Record<string, string>>` or similar narrow constraints when operating on tabular/data shapes (see `useTable<T extends Record<string, string>>`).
- Utils use unconstrained `<T>` only when the function is genuinely parametric; otherwise prefer concrete types.
- Use `Ref<T>` / `ComputedRef<T>` explicitly in composable parameter types when accepting reactive input.

## Error handling

- **Programmer errors** (wrong input type) → `throw new Error('…')` with a descriptive message. Example: `trimText` throws when `inputString` is not a string.
- **Empty / sentinel inputs** → return a safe empty value (`''`, `null`, `'TU'`) without throwing. Example: `getInitials('')` → `'TU'`.
- **Validators** return `string | null` — the error message on failure, `null` on success. Compose them via `composeArrayValidators` ([utils/formValidation.ts](utils/formValidation.ts)).
- Never `console.error` from a util; surface information through the return value or a thrown error.

## JSDoc

Every exported symbol has a JSDoc block with `@param` for every argument, a `@returns` line, and an `@example` block where behavior is non-obvious (see `formatNumberWithThousands`). `@throws` is mandatory when the function can throw.

## Shared types

Utils-only types live in [models/types/](models/types/) (e.g. `formValidation.ts`). They are auto-imported because `nuxt.config.ts` declares `imports.dirs: ['models/**']`. Do not re-export them from a barrel — import by type name directly.

## Tests

- Location: [tests/utils/\<name\>.test.ts](tests/utils/) mirroring the util file path.
- Import under test via relative path: `import { foo } from '../../utils/<file>'` (matches existing `tests/utils/formValidation.test.ts`).
- Vitest with globals; environment is `nuxt` (see [vitest.config.ts](vitest.config.ts)).
- Every exported util and composable should have a spec. The current coverage is a known gap — only `formValidation.ts` has a test file. When you add or modify a util, also add its test.
- Assertions target the return value directly (`expect(result).toBe(...)`, `expect(result).toBeNull()`). Do not mock other utils in the same package.
