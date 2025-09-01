import { readFile } from "fs/promises"
import { join } from "node:path"
import { parseEnv } from "node:util"
import type { LoadedEnv } from "./loaded_env.ts"

export interface LoadEnvOptions {
	/** Where to find `.env` files. */
	readonly path?: string | undefined
}

interface SafeParsed {
	readonly errors: Error[]

	parsed: Record<string, unknown>
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
 * @param options Additional options to use where `path` is where to find `.env`
 * files.
 */
export async function loadEnv(options?: LoadEnvOptions): Promise<LoadedEnv> {
	const NODE_ENV = process.env["NODE_ENV"]?.trim() || "development"

	const files = [
		`.env.${NODE_ENV}.local`,
		`.env.${NODE_ENV}`,
		".env.local",
		".env",
	]

	const paths = files.map(file => prepend(file, options?.path))

	const promises = paths.map(path =>
		readFile(path, "utf-8").then(parseEnv).catch(
			toError("An unknown error occurred while reading a file", {
				NODE_ENV,
				path,
			}),
		),
	)

	const contents = await Promise.all(promises)

	const { parsed, errors } = contents.reduce<SafeParsed>(
		(merged, current) => {
			if (current instanceof Error) merged.errors.push(current)
			else merged.parsed = Object.assign(current, merged.parsed)
			return merged
		},
		{ parsed: {}, errors: [] },
	)

	if (!Object.keys(parsed).length)
		throw new Error("Environment variables could not be loaded.", {
			cause: errors,
		})

	const merged = Object.assign(parsed, process.env, { NODE_ENV })
	process.env = merged
	return merged
}

function prepend(file: string, path: string | undefined): string {
	return path ? join(path, file) : file
}

/**
 * Converts a non-error into an error or supplements the cause of an error
 * without overriding the original cause.
 *
 * @example
 * const error = await readFile(path, "utf-8").catch(toError("Couldn't read a file"))
 */
function toError(
	message: string,
	cause?: Record<string, unknown>,
): (error: unknown) => Error {
	return (error: unknown): Error => {
		// Non-errors are converted to errors
		if (!(error instanceof Error))
			return new Error(message, { cause: { ...cause, error } })

		// Anonymous objects can be augmented with additional properties
		if (error.cause?.constructor === Object) {
			error.cause = { ...cause, ...error.cause }
			return error
		}

		// Falsy values don't matter
		if (!error.cause) {
			error.cause = cause
			return error
		}

		// If the cause is already set and has a brittle type, then let's just leave
		// it at that.
		return error
	}
}
