import { config } from "dotenv"
import { join } from "path"
import type { LoadedEnv } from "./loaded_env.ts"

/** Loads environment variables from the `.env` files. `NODE_ENV` has to be
 * set in the environment and will not be picked up from the filesystem.
 *
 * If `NODE_ENV` is not set, it defaults to `development`.
 *
 * Environment variables are loaded in the following order:
 *
 * 1. `.env.${NODE_ENV}.local`
 * 2. `.env.${NODE_ENV}`
 * 3. `.env.local`
 * 4. `.env`
 */
export function loadEnv(): LoadedEnv {
	const cwd = process.cwd()
	const NODE_ENV = process.env["NODE_ENV"]?.trim() || "development"

	const { parsed, error } = config({
		path: [
			join(cwd, `.env.${NODE_ENV}.local`),
			join(cwd, `.env.${NODE_ENV}`),
			join(cwd, ".env.local"),
			join(cwd, ".env"),
		],
	})

	if (!parsed)
		throw new Error("Environment variables could not be loaded.", {
			cause: error,
		})

	const merged = Object.assign(parsed, process.env, { NODE_ENV })
	process.env = merged
	return merged
}
