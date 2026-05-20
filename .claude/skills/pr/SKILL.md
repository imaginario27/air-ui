---
name: pr
description: Create a GitHub pull request for the AirUI repo following its conventional commit + scope rules. Use whenever the user asks to open a PR in this project.
---

# pr

Creates a pull request via `gh pr create` that matches AirUI's commit/scope conventions and the user's preferred description style.

## Rules (must follow exactly)

1. **Title**: Conventional Commit with mandatory scope, same rules as commits.
   - Format: `<type>(<scope>): <subject>`
   - Allowed scopes: `ds`, `utils`, `docs`, `root`
   - If the branch touches multiple workspaces, use `root`.
   - Subject: imperative mood, lowercase, no trailing period. Keep under ~70 chars.
2. **Description body**:
   - **Single-scope PR** → one flat bulleted list of changes:
     ```
     - change 1
     - change 2
     ```
   - **Mixed-scope PR** → group bullets under a heading per scope. Use these exact headings:
     - `Design system changes:` (for `ds`)
     - `Utils changes:` (for `utils`)
     - `Docs changes:` (for `docs`)
     - `Root / tooling changes:` (for `root`)
     - Only include the headings that actually have changes. Order them as they appear above.
3. **Never** add `Co-Authored-By`, "Generated with Claude Code", or any tool-attribution trailer.
4. **No "Summary" / "Test plan" / emoji sections** — only the bulleted list (or scoped groups).
5. **Always show the full title + body to the user and wait for confirmation before running `gh pr create`.**

## Procedure

1. Gather context (run in parallel where possible):
   - `git status` — uncommitted changes
   - `git rev-parse --abbrev-ref HEAD` — current branch
   - `git log main..HEAD --oneline` — commits to include
   - `git diff main...HEAD --stat` — files touched (use to determine scope mix)
   - `gh pr view --json number 2>$null` (PowerShell) or `gh pr view --json number 2>/dev/null` (bash) — check if PR already exists
2. Determine scope(s) from the touched paths:
   - `packages/air-ui-ds/**` → `ds`
   - `packages/air-ui-utils/**` → `utils`
   - `docs/**` → `docs`
   - Root configs / multi-workspace tooling → `root`
3. If the branch is not pushed or not tracking a remote, push with `-u` to `origin`.
4. Draft the title + body following the rules. For mixed scopes, sort each change into the correct group based on which workspace its files live in.
5. Show the user the **exact** title and body as they will appear, then ask for confirmation or edits.
6. On approval, create the PR using a HEREDOC so multi-line formatting is preserved:

   ```bash
   gh pr create --title "feat(root): unify token pipeline across ds and utils" --body "$(cat <<'EOF'
   Design system changes:
   - move semantic color tokens into ui-theme.css
   - update Button to use bg-background-brand-bold

   Utils changes:
   - add hexToRgb helper for theme resolution
   - export tokenName type
   EOF
   )"
   ```
7. Print the returned PR URL so the user can open it.

## Examples

Single-scope (ds):

```
Title: feat(ds): add ContextMenu component

- add ContextMenu.vue under components/menus
- add ContextMenuItem enum + types
- add unit tests for keyboard navigation
- add docs page + sidebar entry
```

Mixed-scope (ds + utils + docs → `root`):

```
Title: refactor(root): extract date helpers and update Calendar

Design system changes:
- replace inline date formatting in Calendar with toDate util
- update Calendar tests for new prop shape

Utils changes:
- add toDate(value, locale?) helper
- add tests for toDate edge cases

Docs changes:
- update Calendar docs page with new examples
```

Bad (do not produce):

- `Update stuff` — no type/scope
- `feat: add thing` — missing scope
- Mixed-scope PR with a flat bulleted list (no group headings)
- Body containing `## Summary` / `## Test plan` sections
- Any `Co-Authored-By:` or "Generated with Claude Code" trailer
