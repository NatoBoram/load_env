import { afterEach, describe, test } from "vitest"
import { envString } from "./env.ts"
import { loadEnv } from "./load_env.ts"

describe("loadEnv", () => {
	test("cwd", ({ expect }) => {
		loadEnv()

		const ENV_FILE = envString("ENV_FILE")
		expect(ENV_FILE).toBe("cwd")
	})

	test("test", ({ expect }) => {
		loadEnv({ path: "test" })

		const ENV_FILE = envString("ENV_FILE")
		expect(ENV_FILE).toBe("test")
	})
})

afterEach(() => {
	for (const key of Object.keys(process.env)) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (key.startsWith("EXAMPLE_")) delete process.env[key]
	}

	delete process.env["ENV_FILE"]
})
