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
} from "@natoboram/load_env"
import type { UUID } from "crypto"

loadEnv()

export const API_URL: URL = envUrl("API_URL")
export const ENABLE_TELEMETRY: boolean = envBool("ENABLE_TELEMETRY")
export const OFFSET: number = envFloat("OFFSET")
export const PORT: number = envInt("PORT")
export const TOKEN: UUID = envUuid("TOKEN")
export const USERNAME: string = envString("USERNAME")
```

Note that `envUuid` doesn't actually check if the string is a valid UUID.
