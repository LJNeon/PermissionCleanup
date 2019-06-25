"use strict";
const client = require("../services/client.js");
const config = require("../../config.json");
const handler = require("../services/handler.js");

client.on("messageCreate", async msg => {
	// TODO: mention as a valid prefix, and per-guild prefixes
	if(msg.embeds.length !== 0 || msg.author === undefined || msg.author.bot || !msg.content.startsWith(config.prefix))
		return;

	const result = await handler.run(msg, config.prefix.length);

	// TODO: Handle result better if failure.
	if (!result.success)
		console.error(result);
});
