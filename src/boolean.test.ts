import { describe, test } from "vitest"
import { toBool } from "./boolean.ts"

describe("toBool", () => {
	test("true", ({ expect }) => {
		const actual = toBool("EXAMPLE_BOOL", "true")
		expect(actual).toBe(true)
	})

	test("false", ({ expect }) => {
		const actual = toBool("EXAMPLE_FALSY_BOOL", "false")
		expect(actual).toBe(false)
	})

	test("empty", ({ expect }) => {
		expect(() => toBool("EXAMPLE_NO_BOOL", "")).toThrow(
			"$EXAMPLE_NO_BOOL is not a boolean: ",
		)
	})

	test("invalid", ({ expect }) => {
		expect(() =>
			toBool("EXAMPLE_INVALID_BOOL", "EXAMPLE_INVALID_BOOL"),
		).toThrow("$EXAMPLE_INVALID_BOOL is not a boolean: EXAMPLE_INVALID_BOOL")
	})
})
