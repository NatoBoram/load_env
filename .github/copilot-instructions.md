# Copilot Instructions

This is `@natoboram/load_env`, a standalone implementation of Vite's `loadEnv` with type-safe environment variable parsing and Docker secrets support.

## Architecture

- `src/env.ts`: Type-safe getters with `maybe*` variants for optional values.
- `src/secret.ts`: Async file-based type-safe secrets. Reads from path in env var or `/run/secrets/{key}`.

## Development Commands

```sh
pnpm build         # Build with tsgo (TypeScript Go compiler preview)
pnpm docs          # Generate TypeDoc documentation
pnpm lint          # ESLint + markdownlint-cli2 + Prettier check
pnpm lint:fix      # Auto-fix lint issues
pnpm test          # Run Vitest tests
pnpm test:coverage # Coverage report
pnpm test:watch    # Watch mode
```

## Code Patterns

### Function Naming Convention

- `env*` functions read from `process.env` (sync)
- `secret*` functions read from filesystem (async)
- `maybe*` prefix returns `undefined` instead of throwing when missing
- Non-optional functions accept a fallback as second parameter

### Adding New Types

When introducing a new typed accessor:

- Add the synchronous `env<Type>` variant
- Add the optional `maybeEnv<Type>` variant
- Add the asynchronous secret `secret<Type>` variant (reads filesystem)
- Add the optional secret `maybeSecret<Type>` variant

### Error Handling

Throw `Error` for missing values, `TypeError` for invalid format:

```ts
if (str === undefined) throw new Error(`$${key} is missing`)
if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
```

### Test Structure

Tests use Vitest with `beforeAll(() => loadEnv())`. Test files mirror source files (`*.test.ts` alongside `*.ts`). The `test/` directory contains secret fixture files (e.g., `test/SECRET_STRING`). Environment variables are loaded from `.env` files, secrets from `test/SECRET_*` files via env var paths.

Test cases follow the pattern: `valid`, `falsy`, `fallback`, `invalid`, `empty`, and for secrets: `unset`.

## TypeScript Configuration

- Strict mode with all additional checks enabled (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.)
- Use `.ts` extensions in imports (`import { toBool } from "./boolean.ts"`)
- ESLint bans type assertions (`assertionStyle: "never"`)
- Use `type` imports for types only: `import type { UUID } from "node:crypto"`
