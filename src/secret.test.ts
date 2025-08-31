import { beforeAll, describe, test } from "vitest"
import { loadEnv } from "./load_env.ts"
import {
	maybeSecretBool,
	maybeSecretDate,
	maybeSecretFloat,
	maybeSecretInt,
	maybeSecretString,
	maybeSecretStrings,
	maybeSecretUrl,
	maybeSecretUuid,
	secretBool,
	secretDate,
	secretFloat,
	secretInt,
	secretString,
	secretStrings,
	secretUrl,
	secretUuid,
} from "./secret.ts"

beforeAll(() => loadEnv())

describe("secretBool", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretBool("SECRET_BOOL")
		expect(actual).toBe(true)
	})

	test("falsy", async ({ expect }) => {
		const actual = await secretBool("SECRET_FALSY_BOOL")
		expect(actual).toBe(false)
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretBool("SECRET_NO_BOOL", true)
		expect(actual).toBe(true)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretBool("SECRET_INVALID_BOOL")).rejects.toThrow(
			"$SECRET_INVALID_BOOL is not a boolean",
		)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretBool("SECRET_NO_BOOL")).rejects.toThrow(
			'The secret at "test/SECRET_NO_BOOL" is empty',
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretBool("SECRET_UNSET_BOOL")).rejects.toThrow(
			"$SECRET_UNSET_BOOL is missing",
		)
	})
})

describe("secretFloat", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretFloat("SECRET_FLOAT")
		expect(actual).toBe(1.618033988749895)
	})

	test("falsy", async ({ expect }) => {
		const actual = await secretFloat("SECRET_FALSY_FLOAT")
		expect(actual).toBe(0)
	})

	test("fallback", async ({ expect }) => {
		const phi = (1 + Math.sqrt(5)) / 2
		const actual = await secretFloat("SECRET_NO_FLOAT", phi)
		expect(actual).toBe(1.618033988749895)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretFloat("SECRET_NO_FLOAT")).rejects.toThrow(
			'The secret at "test/SECRET_NO_FLOAT" is empty',
		)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretFloat("SECRET_INVALID_FLOAT")).rejects.toThrow(
			"$SECRET_INVALID_FLOAT is not a number",
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretFloat("SECRET_UNSET_FLOAT")).rejects.toThrow(
			"$SECRET_UNSET_FLOAT is missing",
		)
	})
})

describe("secretInt", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretInt("SECRET_INT")
		expect(actual).toBe(42)
	})

	test("falsy", async ({ expect }) => {
		const actual = await secretInt("SECRET_FALSY_INT")
		expect(actual).toBe(0)
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretInt("SECRET_NO_INT", 42)
		expect(actual).toBe(42)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretInt("SECRET_NO_INT")).rejects.toThrow(
			'The secret at "test/SECRET_NO_INT" is empty',
		)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretInt("SECRET_INVALID_INT")).rejects.toThrow(
			"$SECRET_INVALID_INT is not a number",
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretInt("SECRET_UNSET_INT")).rejects.toThrow(
			"$SECRET_UNSET_INT is missing",
		)
	})
})

describe("secretString", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretString("SECRET_STRING")
		expect(actual).toBe("SECRET")
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretString("SECRET_NO_STRING", "SECRET")
		expect(actual).toBe("SECRET")
	})

	test("optional", async ({ expect }) => {
		await expect(() => secretString("SECRET_NO_STRING")).rejects.toThrow(
			'The secret at "test/SECRET_NO_STRING" is empty',
		)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretString("SECRET_NO_STRING")).rejects.toThrow(
			'The secret at "test/SECRET_NO_STRING" is empty',
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretString("SECRET_UNSET_STRING")).rejects.toThrow(
			"$SECRET_UNSET_STRING is missing",
		)
	})
})

describe("secretStrings", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretStrings("SECRET_STRINGS")
		expect(actual).toStrictEqual(["SECRET1", "SECRET2", "SECRET3"])
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretStrings("SECRET_NO_STRINGS", [
			"default1",
			"default2",
		])
		expect(actual).toStrictEqual(["default1", "default2"])
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretStrings("SECRET_NO_STRINGS")).rejects.toThrow(
			'The secret at "test/SECRET_NO_STRINGS" is empty',
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretStrings("SECRET_UNSET_STRINGS")).rejects.toThrow(
			"$SECRET_UNSET_STRINGS is missing",
		)
	})
})

describe("secretUrl", () => {
	const url = new URL("https://github.com/NatoBoram/load_env")

	test("valid", async ({ expect }) => {
		const actual = await secretUrl("SECRET_URL")
		expect(actual).toBeInstanceOf(URL)
		expect(actual.href).toBe(url.href)
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretUrl("SECRET_NO_URL", url)
		expect(actual).toBeInstanceOf(URL)
		expect(actual.href).toBe(url.href)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretUrl("SECRET_INVALID_URL")).rejects.toThrow(
			"$SECRET_INVALID_URL is not a URL",
		)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretUrl("SECRET_NO_URL")).rejects.toThrow(
			'The secret at "test/SECRET_NO_URL" is empty',
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretUrl("SECRET_UNSET_URL")).rejects.toThrow(
			"$SECRET_UNSET_URL is missing",
		)
	})
})

describe("secretUuid", () => {
	test("valid", async ({ expect }) => {
		const actual = await secretUuid("SECRET_UUID")
		expect(actual).toBe("eb4cd2db-7250-40b2-948f-436b628ee8e2")
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretUuid(
			"SECRET_NO_UUID",
			"579e5114-ae99-4c41-a0d1-ea061ac815f5",
		)
		expect(actual).toBe("579e5114-ae99-4c41-a0d1-ea061ac815f5")
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretUuid("SECRET_NO_UUID")).rejects.toThrow(
			'The secret at "test/SECRET_NO_UUID" is empty',
		)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretUuid("SECRET_INVALID_UUID")).rejects.toThrow(
			"$SECRET_INVALID_UUID is not a UUID",
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretUuid("SECRET_UNSET_UUID")).rejects.toThrow(
			"$SECRET_UNSET_UUID is missing",
		)
	})
})

describe("secretDate", () => {
	const date = new Date("2025-05-28T00:50:58.816Z")

	test("valid", async ({ expect }) => {
		const actual = await secretDate("SECRET_DATE")
		expect(actual).toBeInstanceOf(Date)
		expect(actual.toISOString()).toBe(date.toISOString())
	})

	test("fallback", async ({ expect }) => {
		const actual = await secretDate("SECRET_NO_DATE", date)
		expect(actual).toBeInstanceOf(Date)
		expect(actual.toISOString()).toBe(date.toISOString())
	})

	test("invalid", async ({ expect }) => {
		await expect(() => secretDate("SECRET_INVALID_DATE")).rejects.toThrow(
			"$SECRET_INVALID_DATE is not a valid Date",
		)
	})

	test("empty", async ({ expect }) => {
		await expect(() => secretDate("SECRET_NO_DATE")).rejects.toThrow(
			'The secret at "test/SECRET_NO_DATE" is empty',
		)
	})

	test("unset", async ({ expect }) => {
		await expect(() => secretDate("SECRET_UNSET_DATE")).rejects.toThrow(
			"$SECRET_UNSET_DATE is missing",
		)
	})
})

describe("maybeSecretBool", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretBool("SECRET_BOOL")
		expect(actual).toBe(true)
	})

	test("falsy", async ({ expect }) => {
		const actual = await maybeSecretBool("SECRET_FALSY_BOOL")
		expect(actual).toBe(false)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => maybeSecretBool("SECRET_INVALID_BOOL")).rejects.toThrow(
			"$SECRET_INVALID_BOOL is not a boolean",
		)
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretBool("SECRET_NO_BOOL")
		expect(actual).toBe(undefined)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretBool("SECRET_UNSET_BOOL")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretFloat", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretFloat("SECRET_FLOAT")
		expect(actual).toBe(1.618033988749895)
	})

	test("falsy", async ({ expect }) => {
		const actual = await maybeSecretFloat("SECRET_FALSY_FLOAT")
		expect(actual).toBe(0)
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretFloat("SECRET_NO_FLOAT")
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() =>
			maybeSecretFloat("SECRET_INVALID_FLOAT"),
		).rejects.toThrow("$SECRET_INVALID_FLOAT is not a number")
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretFloat("SECRET_UNSET_FLOAT")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretInt", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretInt("SECRET_INT")
		expect(actual).toBe(42)
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretInt("SECRET_NO_INT")
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => maybeSecretInt("SECRET_INVALID_INT")).rejects.toThrow(
			"$SECRET_INVALID_INT is not a number",
		)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretInt("SECRET_UNSET_INT")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretString", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretString("SECRET_STRING")
		expect(actual).toBe("SECRET")
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretString("SECRET_NO_STRING")
		expect(actual).toBe(undefined)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretString("SECRET_UNSET_STRING")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretStrings", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretStrings("SECRET_STRINGS")
		expect(actual).toStrictEqual(["SECRET1", "SECRET2", "SECRET3"])
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretStrings("SECRET_NO_STRINGS")
		expect(actual).toBe(undefined)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretStrings("SECRET_UNSET_STRINGS")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretUrl", () => {
	const url = new URL("https://github.com/NatoBoram/load_env")

	test("valid", async ({ expect }) => {
		const actual = await maybeSecretUrl("SECRET_URL")
		expect(actual).toBeInstanceOf(URL)
		expect(actual?.href).toBe(url.href)
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretUrl("SECRET_NO_URL")
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => maybeSecretUrl("SECRET_INVALID_URL")).rejects.toThrow(
			"$SECRET_INVALID_URL is not a URL",
		)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretUrl("SECRET_UNSET_URL")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretUuid", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretUuid("SECRET_UUID")
		expect(actual).toBe("eb4cd2db-7250-40b2-948f-436b628ee8e2")
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretUuid("SECRET_NO_UUID")
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => maybeSecretUuid("SECRET_INVALID_UUID")).rejects.toThrow(
			"$SECRET_INVALID_UUID is not a UUID",
		)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretUuid("SECRET_UNSET_UUID")
		expect(actual).toBe(undefined)
	})
})

describe("maybeSecretDate", () => {
	const date = new Date("2025-05-28T00:50:58.816Z")

	test("valid", async ({ expect }) => {
		const actual = await maybeSecretDate("SECRET_DATE")
		expect(actual).toBeInstanceOf(Date)
		expect(actual?.toISOString()).toBe(date.toISOString())
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretDate("SECRET_NO_DATE")
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() => maybeSecretDate("SECRET_INVALID_DATE")).rejects.toThrow(
			"$SECRET_INVALID_DATE is not a valid Date",
		)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretDate("SECRET_UNSET_DATE")
		expect(actual).toBe(undefined)
	})
})
