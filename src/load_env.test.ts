import { afterEach, describe, test } from "vitest"
import { envString } from "./env.ts"
import { loadEnv } from "./load_env.ts"

describe("loadEnv", () => {
	test("cwd", async ({ expect }) => {
		await loadEnv()

		const ENV_FILE = envString("ENV_FILE")
		expect(ENV_FILE).toBe("cwd")
	})

	test("path", async ({ expect }) => {
		await loadEnv({ path: "test" })

		const ENV_FILE = envString("ENV_FILE")
		expect(ENV_FILE).toBe("test")
	})

	test("development", async ({ expect }) => {
		delete process.env["NODE_ENV"]
		await loadEnv()

		const ENV_FILE = envString("ENV_FILE")
		expect(ENV_FILE).toBe("development")
	})
})

afterEach(() => {
	for (const key of Object.keys(process.env)) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (key.startsWith("EXAMPLE_")) delete process.env[key]
	}

	delete process.env["ENV_FILE"]
	process.env["NODE_ENV"] = "test"
})
