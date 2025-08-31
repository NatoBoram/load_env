import type { UUID } from "node:crypto"
import { access, readFile } from "node:fs/promises"
import { toBool } from "./boolean.ts"
import { isUuid } from "./uuid.ts"

async function maybeSecret(key: string): Promise<string | undefined> {
	return secret(key).catch(() => undefined)
}

/**
 * Obtains an optional secret as a boolean.
 */
export async function maybeSecretBool(
	key: string,
): Promise<boolean | undefined> {
	const str = await maybeSecret(key)
	if (!str) return undefined

	return toBool(key, str)
}

/**
 * Obtains an optional secret as a {@link Date}.
 */
export async function maybeSecretDate(key: string): Promise<Date | undefined> {
	const str = await maybeSecret(key)
	if (!str) return undefined

	const date = new Date(str)
	if (isNaN(date.getTime()))
		throw new TypeError(`$${key} is not a valid Date: ${str}`)
	return date
}

/**
 * Obtains an optional secret as a floating-point number.
 */
export async function maybeSecretFloat(
	key: string,
): Promise<number | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined

	const num = parseFloat(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an optional secret as an integer.
 */
export async function maybeSecretInt(key: string): Promise<number | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined

	const num = parseInt(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an optional secret as a string.
 */
export async function maybeSecretString(
	key: string,
): Promise<string | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined
	return str
}

/**
 * Obtains an optional secret as an array of strings.
 */
export async function maybeSecretStrings(
	key: string,
): Promise<string[] | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined

	return str
		.split(",")
		.map(s => s.trim())
		.filter(Boolean)
}

/**
 * Obtains an optional secret as a URL.
 *
 * @example
 *
 * const API_URL = maybeSecretUrl("API_URL")
 */
export async function maybeSecretUrl(key: string): Promise<URL | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined

	try {
		return new URL(str)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL: ${str}`, { cause: error })
	}
}

/**
 * Obtains an optional secret as a UUID.
 *
 * @example
 *
 * const API_TOKEN = maybeSecretUuid("API_TOKEN")
 */
export async function maybeSecretUuid(key: string): Promise<UUID | undefined> {
	const str = await maybeSecret(key)
	if (!str) return undefined
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID: ${str}`)
	return str
}

/**
 * Loads a secret from the filesystem.
 */
async function secret(key: string): Promise<string> {
	const envPath = process.env[key]?.trim()
	const path = envPath || `/run/secrets/${key}`

	const accessed = await access(path).catch((error: unknown) => {
		if (!envPath)
			return new Error(`$${key} is missing`, {
				cause: { error, key, path: envPath },
			})

		return new Error(`Couldn't access secret at "${path}"`, {
			cause: { error, key, path },
		})
	})
	if (accessed instanceof Error) throw accessed

	const content = await readFile(path, "utf8")
		.then(content => content.trim())
		.catch((error: unknown) => {
			return new Error(`Couldn't read secret at "${path}"`, {
				cause: { error, key, path },
			})
		})
	if (content instanceof Error) throw content

	if (!content) {
		if (!envPath)
			throw new Error(`$${key} is missing`, {
				cause: { content, key, path: envPath },
			})

		throw new Error(`The secret at "${path}" is empty`, {
			cause: { content, key, path },
		})
	}

	return content
}

/**
 * Obtains a secret as a boolean.
 */
export async function secretBool(
	key: string,
	fallback?: boolean,
): Promise<boolean> {
	if (fallback !== undefined) {
		const value = await maybeSecretBool(key)
		if (value !== undefined) return value
		return fallback
	}

	const value = await secret(key)
	if (!value) throw new Error(`$${key} is missing`)

	return toBool(key, value)
}

/**
 * Obtains a secret as a {@link Date}.
 */
export async function secretDate(key: string, fallback?: Date): Promise<Date> {
	if (fallback) {
		const date = await maybeSecretDate(key)
		if (date) return date
		return fallback
	}

	const str = await secret(key)
	if (!str) throw new Error(`$${key} is missing`)

	const date = new Date(str)
	if (isNaN(date.getTime()))
		throw new TypeError(`$${key} is not a valid Date: ${str}`)

	return date
}

/**
 * Obtains a secret as a floating-point number.
 */
export async function secretFloat(
	key: string,
	fallback?: number,
): Promise<number> {
	if (fallback !== undefined) {
		const num = await maybeSecretFloat(key)
		if (num !== undefined) return num
		return fallback
	}

	const str = await secret(key)
	if (!str) throw new Error(`$${key} is missing`)

	const num = parseFloat(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains a secret as an integer.
 */
export async function secretInt(
	key: string,
	fallback?: number,
): Promise<number> {
	if (fallback !== undefined) {
		const num = await maybeSecretInt(key)
		if (num !== undefined) return num
		return fallback
	}

	const str = await secret(key)
	if (!str) throw new Error(`$${key} is missing`)

	const num = parseInt(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains a secret as a string.
 */
export async function secretString(
	key: string,
	fallback?: string,
): Promise<string> {
	if (fallback !== undefined) {
		const str = await maybeSecretString(key)
		if (str !== undefined) return str
		return fallback
	}

	const str = await secret(key)
	if (!str) throw new Error(`$${key} is missing`)
	return str
}

/**
 * Obtains a secret as an array of strings.
 */
export async function secretStrings(
	key: string,
	fallback?: string[],
): Promise<string[]> {
	if (fallback) {
		const strings = await maybeSecretStrings(key)
		if (strings) return strings
		return fallback
	}

	const str = await secret(key)
	if (!str) throw new Error(`$${key} is missing`)

	return str
		.split(",")
		.map(s => s.trim())
		.filter(Boolean)
}

/**
 * Obtains a secret as a URL.
 *
 * @example
 *
 * export const API_URL = secretUrl("API_URL", new URL("https://example.com"))
 */
export async function secretUrl(key: string, fallback?: URL): Promise<URL> {
	if (fallback) {
		const url = await maybeSecretUrl(key)
		if (url) return url
		return fallback
	}

	const str = await secret(key)
	try {
		return new URL(str)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL: ${str}`, { cause: error })
	}
}

/**
 * Obtains a secret as a UUID.
 *
 * @example
 *
 * export const TOKEN = secretUuid("TOKEN")
 */
export async function secretUuid(key: string, fallback?: UUID): Promise<UUID> {
	if (isUuid(fallback)) {
		const str = await maybeSecretUuid(key)
		if (str) return str
		return fallback
	}

	const str = await secret(key)
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID: ${str}`)
	return str
}
