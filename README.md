# AirUI

A comprehensive UI design system and utilities library for air-institute projects.

## Project Structure

```
air-ui/
├── docs/                      # Documentation site (Nuxt)
├── packages/
│   ├── air-ui-ds/            # Design System component library
│   └── air-ui-utils/         # Utilities library
├── scripts/
│   ├── rebuild-release-history.mjs    # Generate changelog from git history
│   ├── check-git-clean.mjs            # Verify clean git working tree
│   └── finalize-release.mjs           # Interactive commit for releases
└── package.json              # Root workspace configuration
```

## Development

### Setup

```bash
npm install
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
   
   ✅ Commit message: "chore: release @imaginario27/air-ui-ds v1.4.3"
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

- **Git must be clean**: All changes must be committed before publishing. The script will prevent publishing with uncommitted changes.
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

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

type: feat, fix, docs, style, refactor, perf, test, chore
scope: ds, utils, docs, etc.

Examples:
- feat(ds): add button component
- fix(utils): resolve array sorting bug
- docs: update readme
- chore: update dependencies
```

Commits are automatically classified into changelog sections:
- **Added**: `feat:` commits
- **Fixed**: `fix:` commits
- **Changed**: other commits
- **Breaking**: commits with `!:` or "breaking"

## Release History

Release history and changelogs are automatically generated from:
- Git commit history
- npm publish dates
- Conventional commit messages

See `docs/data/releases/release-history.json` for the full data structure.

## Contributing

When making changes:

1. Follow commit conventions
2. Test your changes locally
3. Commit and push to your branch
4. Create a pull request
5. After merge, follow the Publishing workflow to create a release

## Links

- [Documentation](./docs)
- [Design System](./packages/air-ui-ds)
- [Utils](./packages/air-ui-utils)
