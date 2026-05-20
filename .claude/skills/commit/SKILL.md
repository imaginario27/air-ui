---
name: commit
description: Create a git commit for the AirUI repo following its husky/commitlint Conventional Commit rules. Use whenever the user asks to commit changes in this project.
---

# commit

Creates commits that satisfy this repo's husky + commitlint setup.

## Rules (must follow exactly)

1. **Title**: Conventional Commit with mandatory scope.
   - Format: `<type>(<scope>): <subject>`
   - Allowed scopes: `ds`, `utils`, `docs`, `root`
   - Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`, `build`, `ci`
   - Subject: imperative mood, lowercase, no trailing period.
2. **Body**: a bulleted list — one `- ` item per change. Never a paragraph.
   - Each bullet: short, imperative, describes one concrete change.
3. **Never** add `Co-Authored-By` or any co-author trailer.
4. **Never** add tool-attribution lines (e.g. "Generated with Claude Code").
5. **Always show the full commit message to the user and wait for confirmation before running `git commit`.**
6. Pick the scope from the actual files touched:
   - `packages/air-ui-ds/**` → `ds`
   - `packages/air-ui-utils/**` → `utils`
   - `docs/**` → `docs`
   - Root configs / multi-workspace / tooling → `root`
   - If changes span multiple workspaces, use `root`.

## Procedure

1. Run `git status` and `git diff --staged` (and `git diff` if nothing is staged yet) to understand what will be committed.
2. If nothing is staged, ask the user whether to stage specific files or all changes. Never `git add -A` blindly when untracked files could contain secrets.
3. Draft the message following the rules above.
4. Show the user the **exact** message you intend to use, formatted as it will appear, and ask for confirmation or edits.
5. On approval, commit using a HEREDOC so multi-line formatting is preserved:

   ```bash
   git commit -m "$(cat <<'EOF'
   feat(ds): add ContextMenu component

   - add ContextMenu.vue under components/menus
   - add ContextMenuItem enum + types
   - add unit tests for keyboard navigation
   EOF
   )"
   ```
6. Report the resulting commit hash via `git log -1 --oneline`.

## Examples

Good title + body:

```
fix(utils): handle null input in toDate

- guard toDate against null/undefined
- add regression test for empty string
```

Bad (do not produce):

- `update stuff` — no type/scope
- `feat: add thing` — missing scope
- `feat(ds): Added Thing.` — past tense + trailing period
- Body as prose paragraph instead of bullets
- Any `Co-Authored-By:` trailer
