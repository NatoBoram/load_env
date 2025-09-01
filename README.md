# `@natoboram/load_env`

[![Node.js CI](https://github.com/NatoBoram/load_env/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/node.js.yaml) [![Coverage](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnatoboram.github.io%2Fload_env%2Fcoverage%2Fcoverage-summary.json&query=total.branches.pct&suffix=%25&logo=vitest&label=coverage&color=acd268)](https://natoboram.github.io/load_env/coverage) [![CodeQL](https://github.com/NatoBoram/load_env/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/github-code-scanning/codeql) [![GitHub Pages](https://github.com/NatoBoram/load_env/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/github-pages.yaml) [![Dependabot Updates](https://github.com/NatoBoram/load_env/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/dependabot/dependabot-updates) [![GitHub Downloads](https://img.shields.io/github/downloads/natoboram/load_env/total?logo=github&color=0969da)](https://github.com/natoboram/load_env/releases) [![NPM Downloads](https://img.shields.io/npm/dt/%40natoboram/load_env?logo=npm&color=CB3837)](https://www.npmjs.com/package/@natoboram/load_env) [![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/NatoBoram/load_env?logo=CodeRabbit&logoColor=FF570A&label=CodeRabbit%20Reviews&labelColor=171717&color=FF570A)](https://github.com/NatoBoram/load_env/pulls?q=reviewed-by%3Acoderabbitai%5Bbot%5D)

A standalone implementation of Vite's `loadEnv`.

## Installation

`@natoboram/load_env` is available on the [npm public registry](https://www.npmjs.com/package/@natoboram/load_env), on [GitHub Packages](https://github.com/NatoBoram/load_env/pkgs/npm/load_env) and in [GitHub Releases](https://github.com/NatoBoram/load_env/releases).

```sh
pnpm add @natoboram/load_env
```

## Usage

The `loadEnv` function loads environment variables from the current directory's `.env` files. `NODE_ENV` has to be set in the environment and will not be picked up from the filesystem.

If `NODE_ENV` is not set, it defaults to `development`.

Environment variables are loaded in the following order:

1. `.env.${NODE_ENV}.local`
2. `.env.${NODE_ENV}`
3. `.env.local`
4. `.env`

Additional functions are provided for the type safety of environment variables. See the [documentation](https://natoboram.github.io/load_env) for the full list of available functions.

```ts
import {
	envBool,
	envDate,
	envFloat,
	envInt,
	envString,
	envStrings,
	envUrl,
	envUuid,
	loadEnv,
	maybeEnvBool,
	maybeEnvDate,
	maybeEnvFloat,
	maybeEnvInt,
	maybeEnvString,
	maybeEnvStrings,
	maybeEnvUrl,
	maybeEnvUuid,
} from "@natoboram/load_env"
import type { UUID } from "node:crypto"

await loadEnv()

export const EXAMPLE_BOOLEAN: boolean = envBool("EXAMPLE_BOOLEAN")
export const EXAMPLE_DATE: Date = envDate("EXAMPLE_DATE")
export const EXAMPLE_FLOAT: number = envFloat("EXAMPLE_FLOAT")
export const EXAMPLE_INT: number = envInt("EXAMPLE_INT")
export const EXAMPLE_STRING: string = envString("EXAMPLE_STRING")
export const EXAMPLE_STRINGS: string[] = envStrings("EXAMPLE_STRINGS")
export const EXAMPLE_URL: URL = envUrl("EXAMPLE_URL")
export const EXAMPLE_UUID: UUID = envUuid("EXAMPLE_UUID")

export const OPTIONAL_BOOL: boolean | undefined = maybeEnvBool("OPTIONAL_BOOL")
export const OPTIONAL_DATE: Date | undefined = maybeEnvDate("OPTIONAL_DATE")
export const OPTIONAL_FLOAT: number | undefined =
	maybeEnvFloat("OPTIONAL_FLOAT")
export const OPTIONAL_INT: number | undefined = maybeEnvInt("OPTIONAL_INT")
export const OPTIONAL_STR: string | undefined = maybeEnvString("OPTIONAL_STR")
export const OPTIONAL_STRS: string[] | undefined =
	maybeEnvStrings("OPTIONAL_STRS")
export const OPTIONAL_URL: URL | undefined = maybeEnvUrl("OPTIONAL_URL")
export const OPTIONAL_UUID: UUID | undefined = maybeEnvUuid("OPTIONAL_UUID")
```

There is also support for loading secrets from the filesystem.

Secrets are files containing a single value. An environment variable is used to specify the path to the secret file.

Learn more about secrets:

- [Manage secrets securely in Docker Compose](https://docs.docker.com/compose/how-tos/use-secrets)
- [Secrets](https://docs.docker.com/reference/compose-file/secrets)

See the [documentation](https://natoboram.github.io/load_env) for the full list of available functions.

```ts
import {
	maybeSecretBool,
	maybeSecretDate,
	maybeSecretFloat,
	maybeSecretInt,
	maybeSecretString,
	maybeSecretStrings,
	maybeSecretUrl,
	maybeSecretUuid,
	secretBool,
	secretDate,
	secretFloat,
	secretInt,
	secretString,
	secretStrings,
	secretUrl,
	secretUuid,
} from "@natoboram/load_env"
import type { UUID } from "node:crypto"

await loadEnv()

export const SECRET_BOOLEAN: boolean = await secretBool("SECRET_BOOLEAN")
export const SECRET_DATE: Date = await secretDate("SECRET_DATE")
export const SECRET_FLOAT: number = await secretFloat("SECRET_FLOAT")
export const SECRET_INT: number = await secretInt("SECRET_INT")
export const SECRET_STRING: string = await secretString("SECRET_STRING")
export const SECRET_STRINGS: string[] = await secretStrings("SECRET_STRINGS")
export const SECRET_URL: URL = await secretUrl("SECRET_URL")
export const SECRET_UUID: UUID = await secretUuid("SECRET_UUID")

export const OPT_SECRET_BOOL: boolean | undefined =
	await maybeSecretBool("OPT_SECRET_BOOL")
export const OPT_SECRET_DATE: Date | undefined =
	await maybeSecretDate("OPT_SECRET_DATE")
export const OPT_SECRET_FLOAT: number | undefined =
	await maybeSecretFloat("OPT_SECRET_FLOAT")
export const OPT_SECRET_INT: number | undefined =
	await maybeSecretInt("OPT_SECRET_INT")
export const OPT_SECRET_STR: string | undefined =
	await maybeSecretString("OPT_SECRET_STR")
export const OPT_SECRET_STRINGS: string[] | undefined =
	await maybeSecretStrings("OPT_SECRET_STRINGS")
export const OPT_SECRET_URL: URL | undefined =
	await maybeSecretUrl("OPT_SECRET_URL")
export const OPT_SECRET_UUID: UUID | undefined =
	await maybeSecretUuid("OPT_SECRET_UUID")
```

Non-optional functions support a default value as the second argument.

```ts
export const EXAMPLE_STRING: string = envString("EXAMPLE_STRING", "default")
export const SECRET_STRING: string = await secretString(
	"SECRET_STRING",
	"default",
)
```

## License

This _Source Code Form_ is subject to the terms of the _Mozilla Public License v2.0_. If a copy of the MPL was not distributed with this file, you can obtain one at <https://mozilla.org/MPL/2.0>.
