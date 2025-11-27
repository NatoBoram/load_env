import type { UUID } from "node:crypto"
import { toBool } from "./boolean.ts"
import { isEnum } from "./enum.ts"
import { isUuid } from "./uuid.ts"

/**
 * Obtains an environment variable as a boolean.
 *
 * @example
 *
 * export const CI = envBool("CI", false)
 */
export function envBool(key: string, fallback?: boolean): boolean {
	const value = process.env[key]?.trim() || fallback?.toString().trim()
	if (value === undefined) throw new Error(`$${key} is missing`)

	return toBool(key, value)
}

/**
 * Obtains an environment variable as a Date.
 *
 * @example
 *
 * export const START_DATE = envDate("START_DATE")
 */
export function envDate(key: string, fallback?: Date): Date {
	const str = process.env[key]?.trim() || fallback?.toISOString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	const date = new Date(str)
	if (isNaN(date.getTime()))
		throw new TypeError(`$${key} is not a valid Date: ${str}`)

	return date
}

/**
 * Obtains an environment variable constrained to an enumerated list of string
 * values.
 *
 * @example
 *
 * export const NODE_ENV = envEnum(
 *   "NODE_ENV",
 *   ["development", "production", "test"] as const,
 *   "development",
 * )
 */
export function envEnum<const T extends string[]>(
	key: string,
	values: T,
	fallback?: T[number],
): T[number] {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)
	if (!isEnum(str, values))
		throw new TypeError(`$${key} is not one of ${values.join(", ")}: ${str}`)
	return str
}

/**
 * Obtains an environment variable as a floating-point number.
 *
 * @example
 *
 * export const ZOOM = envFloat("ZOOM", 1.0)
 */
export function envFloat(key: string, fallback?: number): number {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	const num = parseFloat(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an environment variable as an integer.
 *
 * @example
 *
 * export const PORT = envInt("PORT", 3000)
 */
export function envInt(key: string, fallback?: number): number {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	const num = parseInt(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number: ${str}`)
	return num
}

/**
 * Obtains an environment variable as a string.
 *
 * @example
 *
 * export const NODE_ENV = envString("NODE_ENV", "development")
 */
export function envString(key: string, fallback?: string): string {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	if (!str) throw new Error(`$${key} is missing`)
	return str
}

/**
 * Obtains an environment variable as a comma-separated list of strings.
 *
 * @example
 *
 * export const ALLOWED_ORIGINS = envStrings("ALLOWED_ORIGINS", ["*"])
 */
export function envStrings(key: string, fallback?: string[]): string[] {
	const str = process.env[key]?.trim() || fallback?.join(",").trim()
	if (str === undefined) throw new Error(`$${key} is missing`)
	return str
		.split(",")
		.map(s => s.trim())
		.filter(s => s)
}

/**
 * Obtains an environment variable as a URL.
 *
 * @example
 *
 * export const DATABASE_URL = envUrl("DATABASE_URL", new URL("http://localhost"))
 */
export function envUrl(key: string, fallback?: URL): URL {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	try {
		return new URL(str)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL: ${str}`, { cause: error })
	}
}

/**
 * Obtains an environment variable as a UUID.
 *
 * @example
 *
 * export const TOKEN = envUuid("TOKEN")
 */
export function envUuid(key: string, fallback?: UUID): UUID {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID: ${str}`)
	return str
}
