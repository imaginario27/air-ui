# AirUI

**A lightweight, flexible component library for Nuxt — built with Tailwind CSS and TypeScript.**

AirUI was designed and built from scratch as a personal project to solve a real problem: 
the lack of a production-ready, fully typed UI framework optimized for Nuxt with 
first-class Figma integration and semantic theming.

It is currently in production use and under active development.

> Designed in Figma. Built in Nuxt. Maintained by [@imaginario27](https://github.com/imaginario27).

## Why AirUI?

Most UI libraries are framework-agnostic or React-first. AirUI is built specifically 
for Nuxt — with auto-imported components, composables, and stores, zero config needed, 
and a design token system that syncs directly from Figma via script.

- **Figma-first** — Design tokens sync from Figma to code without rebuilding
- **Nuxt-optimized** — Auto-imports, SSR-ready, zero config
- **Fully typed** — TypeScript API surface throughout
- **Semantic theming** — Light/dark mode with meaningful color names
- **i18n ready** — Internationalization built in from the start

## Packages

| Package | Version | Description |
|---|---|---|
| `@imaginario27/air-ui-ds` | v1.13.3 | Component library |
| `@imaginario27/air-ui-utils` | v1.2.4 | Utilities + composables |

## Quick start

```bash
npm create air-ui-app@latest <project_name>
```

📖 [Full documentation](https://air-ui.netlify.app) · 
🎨 [Figma design system](#) · 
📦 [npm](https://www.npmjs.com/package/@imaginario27/air-ui-ds)

---

## Project Structure

```
air-ui/
├── docs/                      # Documentation site (Nuxt Content + MDC)
├── guidelines/                # Architecture, guardrails, and style guides
├── packages/
│   ├── air-ui-ds/            # Design System component library
│   └── air-ui-utils/         # Utilities + composables library
├── scripts/
│   ├── rebuild-release-history.mjs    # Generate changelog from git history
│   ├── check-git-clean.mjs            # Verify clean git working tree
│   ├── check-single-area-commit.mjs   # Validate single-area commits
│   ├── check-single-publish.mjs       # Validate single-package publish
│   └── finalize-release.mjs           # Interactive commit for releases
└── package.json              # Root workspace configuration
```

## Development

### Setup

```bash
npm install
```

### Commit Conventions

This project enforces **Conventional Commits** with scope validation to keep commits properly organized by package.

#### Format

```
<type>(<scope>): <subject>
```

**Example commits:**
```bash
feat(ds): add new button component
fix(utils): resolve type definitions
docs(docs): update installation guide
refactor(root): improve build process
```

#### Valid Scopes

- `ds` — Design System package (`@imaginario27/air-ui-ds`)
- `utils` — Utils package (`@imaginario27/air-ui-utils`) 
- `docs` — Documentation site
- `root` — Repository-wide changes (dependencies, tooling, etc.)

#### Valid Types

- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation changes
- `style` — Code style changes (formatting, semicolons, etc.)
- `refactor` — Code refactor without feature/fix
- `perf` — Performance improvements
- `test` — Adding or updating tests
- `chore` — Build, dependencies, tooling
- `revert` — Revert previous commit

#### Validation

Husky automatically validates commits using commitlint. Invalid commits will be rejected:

```bash
❌ git commit -m "add new feature"              # Missing type and scope
❌ git commit -m "feat: new feature"            # Missing scope
❌ git commit -m "feat(invalid): feature"       # Invalid scope

✅ git commit -m "feat(ds): new button"         # Valid
✅ git commit -m "fix(utils): type issue"       # Valid  
```

**Tip:** Keep each commit focused when possible. If changes span multiple packages or folders, use the scope that best represents the change you want to describe.

### Environment Variables

The docs site requires environment variables for GitHub, Cloudflare Turnstile, and Cloudinary integrations. Copy the example and fill in your values:

```bash
cp docs/.env.example docs/.env
```

### Development Servers

Run individual workspaces:

```bash
npm run docs        # Documentation site (localhost:3000)
npm run ds          # Design System dev server
npm run utils       # Utils dev server
```

### Testing

```bash
npm run test:docs       # Test docs workspace
npm run test:ds         # Test design system
npm run test:utils      # Test utils
```

### Type Checking

```bash
npm run typecheck:ds     # Check types in design system
npm run typecheck:utils  # Check types in utils
npm run typecheck:all    # Check all packages
```

## Publishing

### Release Workflow

The publishing process is automated with checks and confirmation steps:

1. **Make your changes**
   ```bash
   git add .
   git commit -m "feat(ds): add new component"
   ```

2. **Publish package** (patch/minor/major)
   ```bash
   npm run publish:ds:patch
   # or
   npm run publish:ds:minor
   npm run publish:ds:major
   ```

   The script will:
   - ✅ Verify git working tree is clean
   - 📦 Bump package version
   - 📤 Publish to npm
   - 📝 Regenerate changelog from git history
   - ❓ Prompt you to confirm the commit message

3. **Review & confirm**
   ```
   📝 Changes to commit:
      docs/data/releases/release-history.json
      packages/air-ui-ds/CHANGELOG.md
   
   ✅ Commit message: "chore(ds): release @imaginario27/air-ui-ds v1.13.3"
   Proceed? (y/n): y
   ```

4. **Push to GitHub**
   ```bash
   git push
   ```

### Available Commands

**Design System (@imaginario27/air-ui-ds)**
```bash
npm run publish:ds:patch
npm run publish:ds:minor
npm run publish:ds:major
```

**Utils (@imaginario27/air-ui-utils)**
```bash
npm run publish:utils:patch
npm run publish:utils:minor
npm run publish:utils:major
```

### Important Notes

- **Publishing is restricted**: Only maintainers with npm publish access can release packages. External contributors should open a pull request and a maintainer will handle the release.
- **Git must be clean**: All changes must be committed before publishing. The script will prevent publishing with uncommitted changes.
- **Push after releases**: Push to GitHub after publishing so release commits and generated changelogs stay synchronized with the remote branch.
- **Commits are filtered**: 
  - `chore:` commits are excluded from changelogs
  - `fix(docs)`, `feat(docs)` scoped only to docs are excluded
  - `feat(docs + design system)` are included (mixed scopes)
- **Changelog generation**: Automatically reads git history and npm publish dates to reconstruct historical releases
- **Docs are independent**: The `docs` workspace can be updated independently without affecting package releases

## Scripts Reference

### Publishing Helpers
- `npm run rebuild-release-history` — Regenerate changelogs & release history
- `npm run check-git-clean` — Verify no uncommitted changes
- `npm run finalize-release <package-name>` — Interactive commit for release (called automatically by publish scripts)

### Utilities
- `npm run version-packages` — Changeset version management
- `npm run release` — Changeset publish (alternative flow)

## Packages

### @imaginario27/air-ui-ds

Design System - Vue 3 components, composables, and design utilities.

- **Location**: `packages/air-ui-ds/`
- **Registry**: [npm](https://www.npmjs.com/package/@imaginario27/air-ui-ds)
- **Changelog**: `packages/air-ui-ds/CHANGELOG.md`

### @imaginario27/air-ui-utils

Utility functions and helpers.

- **Location**: `packages/air-ui-utils/`
- **Registry**: [npm](https://www.npmjs.com/package/@imaginario27/air-ui-utils)
- **Changelog**: `packages/air-ui-utils/CHANGELOG.md`

## Release History

Release history and changelogs are automatically generated from git commit history, npm publish dates, and conventional commit messages. Commits are classified into changelog sections:

- **Added**: `feat:` commits
- **Fixed**: `fix:` commits
- **Changed**: other commits
- **Breaking**: commits with `!:` or "breaking"

See `docs/data/releases/release-history.json` for the full data structure.

## Contributing

When making changes:

1. Follow commit conventions
2. Test your changes locally
3. Commit and push to your branch
4. Create a pull request
5. After merge, follow the Publishing workflow to create a release

## License

This project is licensed under the [MIT License](./LICENSE).

## Links

- [Documentation](./docs)
- [Design System](./packages/air-ui-ds)
- [Utils](./packages/air-ui-utils)
