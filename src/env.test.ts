import { beforeAll, describe, test } from "vitest"
import {
	envBool,
	envDate,
	envEnum,
	envFloat,
	envInt,
	envString,
	envStrings,
	envUrl,
	envUuid,
} from "./env.ts"
import { loadEnv } from "./load_env.ts"
import { NodeEnv } from "./node_env.ts"

beforeAll(() => loadEnv())

describe("envBool", () => {
	test("valid", ({ expect }) => {
		const actual = envBool("EXAMPLE_BOOL")
		expect(actual).toBe(true)
	})

	test("falsy", ({ expect }) => {
		const actual = envBool("EXAMPLE_FALSY_BOOL")
		expect(actual).toBe(false)
	})

	test("fallback", ({ expect }) => {
		const actual = envBool("EXAMPLE_NO_BOOL", true)
		expect(actual).toBe(true)
	})

	test("invalid", ({ expect }) => {
		expect(() => envBool("EXAMPLE_INVALID_BOOL")).toThrow(
			"$EXAMPLE_INVALID_BOOL is not a boolean: EXAMPLE_INVALID_BOOL",
		)
	})

	test("empty", ({ expect }) => {
		expect(() => envBool("EXAMPLE_NO_BOOL")).toThrow(
			"$EXAMPLE_NO_BOOL is missing",
		)
	})
})

describe("envFloat", () => {
	test("valid", ({ expect }) => {
		const actual = envFloat("EXAMPLE_FLOAT")
		expect(actual).toBe(1.618033988749895)
	})

	test("falsy", ({ expect }) => {
		const actual = envFloat("EXAMPLE_FALSY_FLOAT")
		expect(actual).toBe(0)
	})

	test("fallback", ({ expect }) => {
		const phi = (1 + Math.sqrt(5)) / 2
		const actual = envFloat("EXAMPLE_NO_FLOAT", phi)
		expect(actual).toBe(1.618033988749895)
	})

	test("empty", ({ expect }) => {
		expect(() => envFloat("EXAMPLE_NO_FLOAT")).toThrow(
			"$EXAMPLE_NO_FLOAT is missing",
		)
	})

	test("invalid", ({ expect }) => {
		expect(() => envFloat("EXAMPLE_INVALID_FLOAT")).toThrow(
			"$EXAMPLE_INVALID_FLOAT is not a number: EXAMPLE_INVALID_FLOAT",
		)
	})
})

describe("envInt", () => {
	test("valid", ({ expect }) => {
		const actual = envInt("EXAMPLE_INT")
		expect(actual).toBe(42)
	})

	test("falsy", ({ expect }) => {
		const actual = envInt("EXAMPLE_FALSY_INT")
		expect(actual).toBe(0)
	})

	test("fallback", ({ expect }) => {
		const actual = envInt("EXAMPLE_NO_INT", 42)
		expect(actual).toBe(42)
	})

	test("empty", ({ expect }) => {
		expect(() => envInt("EXAMPLE_NO_INT")).toThrow("$EXAMPLE_NO_INT is missing")
	})

	test("invalid", ({ expect }) => {
		expect(() => envInt("EXAMPLE_INVALID_INT")).toThrow(
			"$EXAMPLE_INVALID_INT is not a number: EXAMPLE_INVALID_INT",
		)
	})
})

describe("envString", () => {
	test("valid", ({ expect }) => {
		const actual = envString("EXAMPLE_STRING")
		expect(actual).toBe("example")
	})

	test("fallback", ({ expect }) => {
		const actual = envString("EXAMPLE_NO_STRING", "example")
		expect(actual).toBe("example")
	})

	test("optional", ({ expect }) => {
		expect(() => envString("EXAMPLE_NO_STRING", "")).toThrow(
			"$EXAMPLE_NO_STRING is missing",
		)
	})

	test("empty", ({ expect }) => {
		expect(() => envString("EXAMPLE_NO_STRING")).toThrow(
			"$EXAMPLE_NO_STRING is missing",
		)
	})
})

describe("envStrings", () => {
	test("valid", ({ expect }) => {
		const actual = envStrings("EXAMPLE_STRINGS")
		expect(actual).toStrictEqual(["example1", "example2", "example3"])
	})

	test("fallback", ({ expect }) => {
		const actual = envStrings("EXAMPLE_NO_STRINGS", ["default1", "default2"])
		expect(actual).toStrictEqual(["default1", "default2"])
	})

	test("empty", ({ expect }) => {
		expect(() => envStrings("EXAMPLE_NO_STRINGS")).toThrow(
			"$EXAMPLE_NO_STRINGS is missing",
		)
	})
})

describe("envUrl", () => {
	const url = new URL("https://github.com/NatoBoram/load_env")

	test("valid", ({ expect }) => {
		const actual = envUrl("EXAMPLE_URL")
		expect(actual).toBeInstanceOf(URL)
		expect(actual.href).toBe(url.href)
	})

	test("fallback", ({ expect }) => {
		const actual = envUrl("EXAMPLE_NO_URL", url)
		expect(actual).toBeInstanceOf(URL)
		expect(actual.href).toBe(url.href)
	})

	test("invalid", ({ expect }) => {
		expect(() => envUrl("EXAMPLE_INVALID_URL")).toThrow(
			"$EXAMPLE_INVALID_URL is not a URL: EXAMPLE_INVALID_URL",
		)
	})

	test("empty", ({ expect }) => {
		expect(() => envUrl("EXAMPLE_NO_URL")).toThrow("$EXAMPLE_NO_URL is missing")
	})
})

describe("envUuid", () => {
	test("valid", ({ expect }) => {
		const actual = envUuid("EXAMPLE_UUID")
		expect(actual).toBe("eb4cd2db-7250-40b2-948f-436b628ee8e2")
	})

	test("fallback", ({ expect }) => {
		const actual = envUuid(
			"EXAMPLE_NO_UUID",
			"579e5114-ae99-4c41-a0d1-ea061ac815f5",
		)
		expect(actual).toBe("579e5114-ae99-4c41-a0d1-ea061ac815f5")
	})

	test("empty", ({ expect }) => {
		expect(() => envUuid("EXAMPLE_NO_UUID")).toThrow(
			"$EXAMPLE_NO_UUID is missing",
		)
	})

	test("invalid", ({ expect }) => {
		expect(() => envUuid("EXAMPLE_INVALID_UUID")).toThrow(
			"$EXAMPLE_INVALID_UUID is not a UUID: EXAMPLE_INVALID_UUID",
		)
	})
})

describe("envDate", () => {
	const date = new Date("2025-05-28T00:50:58.816Z")

	test("valid", ({ expect }) => {
		const actual = envDate("EXAMPLE_DATE")
		expect(actual).toBeInstanceOf(Date)
		expect(actual.toISOString()).toBe(date.toISOString())
	})

	test("fallback", ({ expect }) => {
		const actual = envDate("EXAMPLE_NO_DATE", date)
		expect(actual).toBeInstanceOf(Date)
		expect(actual.toISOString()).toBe(date.toISOString())
	})

	test("invalid", ({ expect }) => {
		expect(() => envDate("EXAMPLE_INVALID_DATE")).toThrow(
			"$EXAMPLE_INVALID_DATE is not a valid Date: EXAMPLE_INVALID_DATE",
		)
	})

	test("empty", ({ expect }) => {
		expect(() => envDate("EXAMPLE_NO_DATE")).toThrow(
			"$EXAMPLE_NO_DATE is missing",
		)
	})
})

describe("envEnum", () => {
	test("valid", ({ expect }) => {
		const actual = envEnum("EXAMPLE_ENUM", Object.values(NodeEnv))
		expect(actual).toBe("development")
	})

	test("fallback", ({ expect }) => {
		const actual = envEnum(
			"EXAMPLE_NO_ENUM",
			Object.values(NodeEnv),
			"production",
		)
		expect(actual).toBe("production")
	})

	test("invalid", ({ expect }) => {
		expect(() =>
			envEnum("EXAMPLE_INVALID_ENUM", Object.values(NodeEnv)),
		).toThrow(
			"$EXAMPLE_INVALID_ENUM is not one of development, production, test: EXAMPLE_INVALID_ENUM",
		)
	})

	test("empty", ({ expect }) => {
		expect(() => envEnum("EXAMPLE_NO_ENUM", Object.values(NodeEnv))).toThrow(
			"$EXAMPLE_NO_ENUM is missing",
		)
	})
})
