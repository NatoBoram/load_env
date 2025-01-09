# `@natoboram/load_env`

[![Node.js CI](https://github.com/NatoBoram/load_env/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/node.js.yaml) [![GitHub Pages](https://github.com/NatoBoram/load_env/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/github-pages.yaml) [![Dependabot Updates](https://github.com/NatoBoram/load_env/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/NatoBoram/load_env/actions/workflows/dependabot/dependabot-updates) [![GitHub Downloads](https://img.shields.io/github/downloads/natoboram/load_env/total?logo=github&color=0969da)](https://github.com/natoboram/load_env/releases) [![NPM Downloads](https://img.shields.io/npm/dt/%40natoboram/load_env?logo=npm&color=CB3837)](https://www.npmjs.com/package/@natoboram/load_env)

A standalone implementation of Vite's `loadEnv`.

## Installation

`@natoboram/load_env` is available on [npmjs](https://www.npmjs.com/package/@natoboram/load_env), [GitHub Packages](https://github.com/NatoBoram/load_env/pkgs/npm/load_env), and [GitHub Releases](https://github.com/NatoBoram/load_env/releases).

```sh
pnpm i @natoboram/load_env
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
	envFloat,
	envInt,
	envString,
	envUrl,
	envUuid,
	loadEnv,
	maybeEnvBool,
	maybeEnvFloat,
	maybeEnvInt,
	maybeEnvString,
	maybeEnvUrl,
	maybeEnvUuid,
} from "@natoboram/load_env"
import type { UUID } from "crypto"

loadEnv()

export const EXAMPLE_BOOLEAN: boolean = envBool("EXAMPLE_BOOLEAN")
export const EXAMPLE_FLOAT: number = envFloat("EXAMPLE_FLOAT")
export const EXAMPLE_INT: number = envInt("EXAMPLE_INT")
export const EXAMPLE_STRING: string = envString("EXAMPLE_STRING")
export const EXAMPLE_URL: URL = envUrl("EXAMPLE_URL")
export const EXAMPLE_UUID: UUID = envUuid("EXAMPLE_UUID")

export const OPTIONAL_BOOL: boolean | undefined = maybeEnvBool("EXAMPLE_BOOL")
export const OPTIONAL_FLOAT: number | undefined = maybeEnvFloat("EXAMPLE_FLOAT")
export const OPTIONAL_INT: number | undefined = maybeEnvInt("EXAMPLE_INT")
export const OPTIONAL_STR: string | undefined = maybeEnvString("EXAMPLE_STR")
export const OPTIONAL_URL: URL | undefined = maybeEnvUrl("EXAMPLE_URL")
export const OPTIONAL_UUID: UUID | undefined = maybeEnvUuid("EXAMPLE_UUID")
```

Non-optional functions support a default value as the second argument.

```ts
export const EXAMPLE_STRING: string = envString("EXAMPLE_STRING", "default")
```
