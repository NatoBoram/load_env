export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv]

export function isNodeEnv(value: unknown): value is NodeEnv {
	return Object.values<unknown>(NodeEnv).includes(value)
}

export function toNodeEnv(value: unknown, fallback?: NodeEnv): NodeEnv {
	if (isNodeEnv(value)) return value
	if (fallback !== undefined) return fallback
	throw new TypeError(`Invalid NodeEnv`, { cause: value })
}

export const NodeEnv = {
	development: "development",
	production: "production",
	test: "test",
} as const
