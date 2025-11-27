import type { UUID } from "node:crypto"
import { toBool } from "./boolean.ts"
import { isEnum } from "./enum.ts"
import {
	maybeSecretBool,
	maybeSecretDate,
	maybeSecretEnum,
	maybeSecretFloat,
	maybeSecretInt,
	maybeSecretString,
	maybeSecretStrings,
	maybeSecretUrl,
	maybeSecretUuid,
} from "./maybe_secret.ts"
import { secret } from "./secret_utils.ts"
import { isUuid } from "./uuid.ts"

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
		throw new TypeError(`$${key} is not a valid Date`, { cause: str })

	return date
}

export async function secretEnum<const T extends string[]>(
	key: string,
	values: T,
	fallback?: T[number],
): Promise<T[number]> {
	if (fallback !== undefined) {
		const str = await maybeSecretEnum(key, values)
		if (str !== undefined) return str
		return fallback
	}

	const str = await secret(key)
	if (!isEnum(str, values))
		throw new TypeError(`$${key} is not one of ${values.join(", ")}`, {
			cause: str,
		})
	return str
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
	if (isNaN(num)) throw new TypeError(`$${key} is not a number`, { cause: str })
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
	if (isNaN(num)) throw new TypeError(`$${key} is not a number`, { cause: str })
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

	const value = await secret(key)
	try {
		return new URL(value)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL`, { cause: { error, value } })
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
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID`, { cause: str })
	return str
}
