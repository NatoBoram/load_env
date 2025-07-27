import type { DotenvConfigOptions } from "dotenv"
import { config } from "dotenv"
import { join } from "path"
import type { LoadedEnv } from "./loaded_env.ts"

export interface LoadEnvOptions extends Omit<DotenvConfigOptions, "path"> {
	/** Where to find `.env` files. */
	readonly path?: string | undefined
}

/** Loads environment variables from the `.env` files. `NODE_ENV` has to be set
 * in the environment and will not be picked up from the filesystem.
 *
 * If `NODE_ENV` is not set, it defaults to `development`.
 *
 * Environment variables are loaded in the following order:
 *
 * 1. `.env.${NODE_ENV}.local`
 * 2. `.env.${NODE_ENV}`
 * 3. `.env.local`
 * 4. `.env`
 *
 * @param options Additional options to be passed to `dotenv.config` where
 * `path` is where to find `.env` files.
 */
export function loadEnv(options?: LoadEnvOptions): LoadedEnv {
	const NODE_ENV = process.env["NODE_ENV"]?.trim() || "development"

	const paths = [
		`.env.${NODE_ENV}.local`,
		`.env.${NODE_ENV}`,
		".env.local",
		".env",
	].map(file => prepend(file, options?.path))

	const { parsed, error } = config({ ...options, path: paths })

	if (!parsed)
		throw new Error("Environment variables could not be loaded.", {
			cause: error,
		})

	const merged = Object.assign(parsed, process.env, { NODE_ENV })
	process.env = merged
	return merged
}

function prepend(file: string, path: string | undefined): string {
	return path ? join(path, file) : file
}
