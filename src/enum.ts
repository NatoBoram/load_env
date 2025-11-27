export function isEnum<const T extends string[]>(
	value: string,
	enumeration: T,
): value is T[number] {
	return enumeration.includes(value)
}
