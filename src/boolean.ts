export function toBool(key: string, value: string): boolean {
	switch (value) {
		case true.toString():
			return true
		case false.toString():
			return false
		default:
			throw new Error(`$${key} is not a boolean: ${value}`)
	}
}
