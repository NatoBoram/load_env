import { beforeAll, describe, test } from "vitest"
import { loadEnv } from "./load_env.ts"
import {
	maybeEnvBool,
	maybeEnvDate,
	maybeEnvEnum,
	maybeEnvFloat,
	maybeEnvInt,
	maybeEnvString,
	maybeEnvStrings,
	maybeEnvUrl,
	maybeEnvUuid,
} from "./maybe_env.ts"
import { NodeEnv } from "./node_env.ts"

beforeAll(() => loadEnv())

describe("maybeEnvBool", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvBool("EXAMPLE_BOOL")
		expect(actual).toBe(true)
	})

	test("falsy", ({ expect }) => {
		const actual = maybeEnvBool("EXAMPLE_FALSY_BOOL")
		expect(actual).toBe(false)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvBool("EXAMPLE_INVALID_BOOL")).toThrow(
			"$EXAMPLE_INVALID_BOOL is not a boolean: EXAMPLE_INVALID_BOOL",
		)
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvBool("EXAMPLE_NO_BOOL")
		expect(actual).toBe(undefined)
	})
})

describe("maybeEnvFloat", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvFloat("EXAMPLE_FLOAT")
		expect(actual).toBe(1.618033988749895)
	})

	test("falsy", ({ expect }) => {
		const actual = maybeEnvFloat("EXAMPLE_FALSY_FLOAT")
		expect(actual).toBe(0)
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvFloat("EXAMPLE_NO_FLOAT")
		expect(actual).toBe(undefined)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvFloat("EXAMPLE_INVALID_FLOAT")).toThrow(
			"$EXAMPLE_INVALID_FLOAT is not a number: EXAMPLE_INVALID_FLOAT",
		)
	})
})

describe("maybeEnvInt", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvInt("EXAMPLE_INT")
		expect(actual).toBe(42)
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvInt("EXAMPLE_NO_INT")
		expect(actual).toBe(undefined)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvInt("EXAMPLE_INVALID_INT")).toThrow(
			"$EXAMPLE_INVALID_INT is not a number: EXAMPLE_INVALID_INT",
		)
	})
})

describe("maybeEnvString", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvString("EXAMPLE_STRING")
		expect(actual).toBe("example")
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvString("EXAMPLE_NO_STRING")
		expect(actual).toBe(undefined)
	})
})

describe("maybeEnvStrings", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvStrings("EXAMPLE_STRINGS")
		expect(actual).toStrictEqual(["example1", "example2", "example3"])
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvStrings("EXAMPLE_NO_STRINGS")
		expect(actual).toBe(undefined)
	})
})

describe("maybeEnvUrl", () => {
	const url = new URL("https://github.com/NatoBoram/load_env")

	test("valid", ({ expect }) => {
		const actual = maybeEnvUrl("EXAMPLE_URL")
		expect(actual).toBeInstanceOf(URL)
		expect(actual?.href).toBe(url.href)
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvUrl("EXAMPLE_NO_URL")
		expect(actual).toBe(undefined)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvUrl("EXAMPLE_INVALID_URL")).toThrow(
			"$EXAMPLE_INVALID_URL is not a URL: EXAMPLE_INVALID_URL",
		)
	})
})

describe("maybeEnvUuid", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvUuid("EXAMPLE_UUID")
		expect(actual).toBe("eb4cd2db-7250-40b2-948f-436b628ee8e2")
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvUuid("EXAMPLE_NO_UUID")
		expect(actual).toBe(undefined)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvUuid("EXAMPLE_INVALID_UUID")).toThrow(
			"$EXAMPLE_INVALID_UUID is not a UUID: EXAMPLE_INVALID_UUID",
		)
	})
})

describe("maybeEnvDate", () => {
	const date = new Date("2025-05-28T00:50:58.816Z")

	test("valid", ({ expect }) => {
		const actual = maybeEnvDate("EXAMPLE_DATE")
		expect(actual).toBeInstanceOf(Date)
		expect(actual?.toISOString()).toBe(date.toISOString())
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvDate("EXAMPLE_NO_DATE")
		expect(actual).toBe(undefined)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvDate("EXAMPLE_INVALID_DATE")).toThrow(
			"$EXAMPLE_INVALID_DATE is not a valid Date: EXAMPLE_INVALID_DATE",
		)
	})
})

describe("maybeEnvEnum", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvEnum("EXAMPLE_ENUM", Object.values(NodeEnv))
		expect(actual).toBe("development")
	})

	test("invalid", ({ expect }) => {
		expect(() =>
			maybeEnvEnum("EXAMPLE_INVALID_ENUM", Object.values(NodeEnv)),
		).toThrow(
			"$EXAMPLE_INVALID_ENUM is not one of development, production, test: EXAMPLE_INVALID_ENUM",
		)
	})

	test("empty", ({ expect }) => {
		const actual = maybeEnvEnum("EXAMPLE_NO_ENUM", Object.values(NodeEnv))
		expect(actual).toBe(undefined)
	})
})
