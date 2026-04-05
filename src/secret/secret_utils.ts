import { access, readFile } from "node:fs/promises"

export async function maybeSecret(key: string): Promise<string | undefined> {
	return secret(key).catch(() => undefined)
}

/**
 * Loads a secret from the filesystem.
 */
export async function secret(key: string): Promise<string> {
	const envPath = process.env[key]?.trim()
	const path = envPath || `/run/secrets/${key}`

	const accessed = await access(path).catch((error: unknown) => {
		if (!envPath)
			return new Error(`$${key} is missing`, {
				cause: { error, key, path: envPath },
			})

		return new Error(`Couldn't access secret at "${path}"`, {
			cause: { error, key, path },
		})
	})
	if (accessed instanceof Error) throw accessed

	const content = await readFile(path, "utf8")
		.then(content => content.trim())
		.catch((error: unknown) => {
			return new Error(`Couldn't read secret at "${path}"`, {
				cause: { error, key, path },
			})
		})
	if (content instanceof Error) throw content

	if (!content) {
		if (!envPath)
			throw new Error(`$${key} is missing`, {
				cause: { content, key, path: envPath },
			})

		throw new Error(`The secret at "${path}" is empty`, {
			cause: { content, key, path },
		})
	}

	return content
}
