import type { UUID } from "crypto"

/**
 * Obtains an environment variable as a boolean.
 *
 * @example
 *
 * export const CI = envBool("CI", false)
 */
export function envBool(key: string, fallback?: boolean): boolean {
	const str = process.env[key]?.trim() || fallback?.toString().trim()
	if (str === undefined) throw new Error(`$${key} is missing`)

	switch (str) {
		case true.toString():
			return true
		case false.toString():
			return false
		default:
			throw new Error(`$${key} is not a boolean: ${str}`)
	}
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
	if (isNaN(num)) throw new Error(`$${key} is not a number: ${str}`)
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
	if (isNaN(num)) throw new Error(`$${key} is not a number: ${str}`)
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
		throw new Error(`$${key} is not a URL: ${str}`, { cause: error })
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

	return str as UUID
}
