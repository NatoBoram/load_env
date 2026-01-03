import type { UUID } from "node:crypto"
import { toBool } from "./boolean.ts"
import { isEnum } from "./enum.ts"
import { maybeSecret } from "./secret_utils.ts"
import { isUuid } from "./uuid.ts"

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
		throw new TypeError(`$${key} is not a valid Date`, { cause: str })
	return date
}

/**
 * Obtains an optional secret as an enum.
 */
export async function maybeSecretEnum<const T extends string[]>(
	key: string,
	values: T,
): Promise<T[number] | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined
	if (!isEnum(str, values))
		throw new TypeError(`$${key} is not one of ${values.join(", ")}`, {
			cause: str,
		})
	return str
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
	if (isNaN(num)) throw new TypeError(`$${key} is not a number`, { cause: str })
	return num
}

/**
 * Obtains an optional secret as an integer.
 */
export async function maybeSecretInt(key: string): Promise<number | undefined> {
	const str = await maybeSecret(key)
	if (str === undefined) return undefined

	const num = parseInt(str)
	if (isNaN(num)) throw new TypeError(`$${key} is not a number`, { cause: str })
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
	const value = await maybeSecret(key)
	if (value === undefined) return undefined

	try {
		return new URL(value)
	} catch (error) {
		throw new TypeError(`$${key} is not a URL`, { cause: { error, value } })
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
	if (!isUuid(str)) throw new TypeError(`$${key} is not a UUID`, { cause: str })
	return str
}
