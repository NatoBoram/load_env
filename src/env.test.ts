import { beforeAll, describe, test } from "vitest"
import {
	envBool,
	envFloat,
	envInt,
	envString,
	envUrl,
	envUuid,
	maybeEnvBool,
	maybeEnvFloat,
	maybeEnvInt,
	maybeEnvString,
	maybeEnvUrl,
	maybeEnvUuid,
} from "./env.ts"
import { loadEnv } from "./load_env.ts"

beforeAll(loadEnv)

describe("envBool", () => {
	test("valid", ({ expect }) => {
		const actual = envBool("EXAMPLE_BOOL")
		expect(actual).toBe(true)
	})

	test("fallback", ({ expect }) => {
		const actual = envBool("EXAMPLE_NO_BOOL", true)
		expect(actual).toBe(true)
	})

	test("invalid", ({ expect }) => {
		expect(() => envBool("EXAMPLE_INVALID_BOOL")).toThrow()
	})

	test("empty", ({ expect }) => {
		expect(() => envBool("EXAMPLE_NO_BOOL")).toThrow()
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
		expect(() => envFloat("EXAMPLE_NO_FLOAT")).toThrow()
	})

	test("invalid", ({ expect }) => {
		expect(() => envFloat("EXAMPLE_INVALID_FLOAT")).toThrow()
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
		expect(() => envInt("EXAMPLE_NO_INT")).toThrow()
	})

	test("invalid", ({ expect }) => {
		expect(() => envInt("EXAMPLE_INVALID_INT")).toThrow()
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
		expect(() => envString("EXAMPLE_NO_STRING", "")).toThrow()
	})

	test("empty", ({ expect }) => {
		expect(() => envString("EXAMPLE_NO_STRING")).toThrow()
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
		expect(() => envUrl("EXAMPLE_INVALID_URL")).toThrow()
	})

	test("empty", ({ expect }) => {
		expect(() => envUrl("EXAMPLE_NO_URL")).toThrow()
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
		expect(() => envUuid("EXAMPLE_NO_UUID")).toThrow()
	})

	test("invalid", ({ expect }) => {
		expect(() => envUuid("EXAMPLE_INVALID_UUID")).toThrow()
	})
})

describe("maybeEnvBool", () => {
	test("valid", ({ expect }) => {
		const actual = maybeEnvBool("EXAMPLE_BOOL")
		expect(actual).toBe(true)
	})

	test("invalid", ({ expect }) => {
		expect(() => maybeEnvBool("EXAMPLE_INVALID_BOOL")).toThrow()
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
		expect(() => maybeEnvFloat("EXAMPLE_INVALID_FLOAT")).toThrow()
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
		expect(() => maybeEnvInt("EXAMPLE_INVALID_INT")).toThrow()
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
		expect(() => maybeEnvUrl("EXAMPLE_INVALID_URL")).toThrow()
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
		expect(() => maybeEnvUuid("EXAMPLE_INVALID_UUID")).toThrow()
	})
})
