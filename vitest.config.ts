import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

const config: ViteUserConfig = defineConfig({
	test: {
		reporters: ["default", "github-actions"],
		include: ["src/**/*.test.ts"],
		coverage: {
			include: ["src/**/*.ts"],
			reporter: ["text", "json-summary"],
		},
	},
})

export default config
