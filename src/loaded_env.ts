import type { ProcessEnv } from "./process_env.ts"

export interface LoadedEnv extends ProcessEnv {
	readonly NODE_ENV: string
}
