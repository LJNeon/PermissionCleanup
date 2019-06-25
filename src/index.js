"use strict";
process.env.TZ = "UTC";

const {RequireAll} = require("patron.js");

function logError(err) {
	console.error(err);
	process.exit(1);
}

process.on("uncaughtException", logError);
process.on("unhandledRejection", logError);

const path = require("path");

function requireAll(dir) {
	return RequireAll(path.join(__dirname, dir));
}

(async function() {
	const client = require("./services/client.js");
	const registry = require("./services/registry.js");

	registry
		// .registerArgumentPreconditions(await requireAll("./preconditions/argument/"))
		.registerPreconditions(await requireAll("./preconditions/command/"))
		.registerTypeReaders(await requireAll("./readers/"))
		.registerGroups(await requireAll("./groups/"))
		.registerCommands(await requireAll("./commands/"));
	await requireAll("./events/");
	await client.connect();
})().catch(logError);
