# Copilot Instructions

This is `@natoboram/load_env`, a standalone implementation of Vite's `loadEnv` with type-safe environment variable parsing and Docker secrets support.

## Architecture

- `src/env.ts`: Sync `env*` getters reading from `process.env` with fallback support
- `src/maybe_env.ts`: Sync `maybeEnv*` variants returning `undefined` when missing
- `src/secret.ts`: Async `secret*` getters reading files (path from env or `/run/secrets/{key}`)
- `src/maybe_secret.ts`: Async `maybeSecret*` variants returning `undefined` when missing
- `src/load_env.ts`: Main `loadEnv()` function loading `.env` files in priority order

## Development Commands

```sh
pnpm build         # Build with tsgo (TypeScript Go compiler preview)
pnpm test          # Run Vitest tests
pnpm test:coverage # Coverage report
pnpm lint          # ESLint + markdownlint-cli2 + Prettier check
pnpm lint:fix      # Auto-fix lint issues
```

## Code Patterns

### Function Naming Convention

- `env*` → sync, reads `process.env`, accepts fallback as 2nd param
- `maybeEnv*` → sync, returns `undefined` instead of throwing
- `secret*` → async, reads filesystem, accepts fallback as 2nd param
- `maybeSecret*` → async, returns `undefined` instead of throwing

### Adding New Types

Add all four variants in this order:

1. `env<Type>` in `src/env.ts`
2. `maybeEnv<Type>` in `src/maybe_env.ts`
3. `secret<Type>` in `src/secret.ts` (calls `maybeSecret<Type>` for fallback logic)
4. `maybeSecret<Type>` in `src/maybe_secret.ts`
5. Export from `src/index.ts`
6. Add tests following existing patterns
   - Add the `SECRET_<Test>_<Type>` secrets in `test`

### Error Handling

```ts
// Missing value → Error
if (str === undefined) throw new Error(`$${key} is missing`)

// Invalid format → TypeError with cause
if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
throw new TypeError(`$${key} is not a URL`, { cause: { error, value } })
```

### Test Structure

- Test files are colocated: `src/*.test.ts`
- All tests call `beforeAll(() => loadEnv())` to load `.env` files
- Secret fixtures live in `test/SECRET_*` files, referenced via env vars
- Test case naming: `valid`, `falsy`, `fallback`, `invalid`, `empty`, `unset` (secrets only)

## TypeScript Configuration

- Use `.ts` extensions in imports: `import { toBool } from "./boolean.ts"`
- Use `type` keyword for type-only imports: `import type { UUID } from "node:crypto"`
- ESLint bans type assertions (`as` keyword) — use type guards instead
- All strict checks enabled: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.
