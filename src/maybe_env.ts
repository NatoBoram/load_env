import type { UUID } from "node:crypto"
import { toBool } from "./boolean.ts"
import { isEnum } from "./enum.ts"
import { isUuid } from "./uuid.ts"

/**
 * Obtains an optional environment variable as a boolean.
 *
 * @example
 *
 * export const CI = maybeEnvBool("CI")
 */
export function maybeEnvBool(key: string): boolean | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined

	return toBool(key, str)
}

/**
 * Obtains an optional environment variable as a Date.
 *
 * @example
 *
 * export const END_DATE = maybeEnvDate("END_DATE")
 */
export function maybeEnvDate(key: string): Date | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined

	const date = new Date(str)
	if (isNaN(date.getTime()))
		throw new TypeError(`$${key} is not a valid Date: ${str}`)

	return date
}

/**
 * Obtains an optional environment variable constrained to an enumerated list
 * of string values.
 *
 * @example
 *
 * export const LOG_LEVEL = maybeEnvEnum(
 *   "LOG_LEVEL",
 *   ["debug", "info", "warn", "error"] as const,
 * )
 */
export function maybeEnvEnum<const T extends string[]>(
	key: string,
	values: T,
): T[number] | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined
	if (!isEnum(str, values))
		throw new TypeError(`$${key} is not one of ${values.join(", ")}: ${str}`)
	return str
}

/**
 * Obtains an optional environment variable as a floating-point number.
 *
 * @example
 *
 * export const ZOOM = maybeEnvFloat("ZOOM")
 */
export function maybeEnvFloat(key: string): number | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined

	const num = parseFloat(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an optional environment variable as an integer.
 *
 * @example
 *
 * export const PORT = maybeEnvInt("PORT")
 */
export function maybeEnvInt(key: string): number | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined

	const num = parseInt(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an optional environment variable as a string.
 *
 * @example
 *
 * export const NODE_ENV = maybeEnvString("NODE_ENV")
 */
export function maybeEnvString(key: string): string | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined
	return str
}

/**
 * Obtains an optional environment variable as a comma-separated list of
 * strings.
 *
 * @example
 *
 * export const ALLOWED_ORIGINS = maybeEnvStrings("ALLOWED_ORIGINS")
 */
export function maybeEnvStrings(key: string): string[] | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined
	return str
		.split(",")
		.map(s => s.trim())
		.filter(s => s)
}

/**
 * Obtains an optional environment variable as a URL.
 *
 * @example
 *
 * export const DATABASE_URL = maybeEnvUrl("DATABASE_URL")
 */
export function maybeEnvUrl(key: string): URL | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined

	try {
		return new URL(str)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL: ${str}`, { cause: error })
	}
}

/**
 * Obtains an optional environment variable as a UUID.
 *
 * @example
 *
 * export const TOKEN = maybeEnvUuid("TOKEN")
 */
export function maybeEnvUuid(key: string): UUID | undefined {
	const str = process.env[key]?.trim()
	if (!str) return undefined
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID: ${str}`)
	return str
}
