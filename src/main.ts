#!/usr/bin/env node
import { parseArgs } from "node:util"
import pkg from "../package.json" with { type: "json" }
import { loadEnv } from "./load/load_env.ts"

const { bin, version, description } = pkg

const name = Object.keys(bin).find(Boolean)
if (!name)
	throw new Error("No executable name found in package.json", { cause: pkg })

const { values } = parseArgs({
	options: {
		help: { type: "boolean", short: "h" },
		path: { type: "string", short: "p", default: "." },
		version: { type: "boolean", short: "v" },
	},
})

// Help
if (values.help) {
	console.log(`
Usage: ${name} [options]

${description}

Options:
  -h, --help         display help for command
  -p, --path <path>  a folder to load env files from (default: ".")
  -v, --version      output the version number
`)
	process.exit(0)
}

// Version
if (values.version) {
	console.log(version)
	process.exit(0)
}

// Path
const env = await loadEnv({ path: values.path })
const json = JSON.stringify(env, null, "\t")
console.log("Loaded:", json)
