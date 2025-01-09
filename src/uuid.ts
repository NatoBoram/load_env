import type { UUID } from "node:crypto"

/**
 * @see https://github.com/uuidjs/uuid/blob/050cd5b9df5aa73097a1677b9e7c3482eb4367fc/src/validate.ts#L3-L5
 */
export function isUuid(uuid: unknown): uuid is UUID {
	return typeof uuid === "string" && regex.test(uuid)
}

/**
 * @see https://github.com/uuidjs/uuid/blob/050cd5b9df5aa73097a1677b9e7c3482eb4367fc/src/regex.ts#L1C1-L1C171
 */
const regex =
	/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
