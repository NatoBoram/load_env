import { beforeAll, describe, test } from "vitest"
import { loadEnv } from "./load_env.ts"
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
import { NodeEnv } from "./node_env.ts"

beforeAll(() => loadEnv())

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

describe("maybeSecretEnum", () => {
	test("valid", async ({ expect }) => {
		const actual = await maybeSecretEnum("SECRET_ENUM", Object.values(NodeEnv))
		expect(actual).toBe("development")
	})

	test("empty", async ({ expect }) => {
		const actual = await maybeSecretEnum(
			"SECRET_NO_ENUM",
			Object.values(NodeEnv),
		)
		expect(actual).toBe(undefined)
	})

	test("invalid", async ({ expect }) => {
		await expect(() =>
			maybeSecretEnum("SECRET_INVALID_ENUM", Object.values(NodeEnv)),
		).rejects.toThrow(
			"$SECRET_INVALID_ENUM is not one of development, production, test",
		)
	})

	test("unset", async ({ expect }) => {
		const actual = await maybeSecretEnum(
			"SECRET_UNSET_ENUM",
			Object.values(NodeEnv),
		)
		expect(actual).toBe(undefined)
	})
})
