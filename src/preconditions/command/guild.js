"use strict";
const {Precondition, PreconditionResult} = require("patron.js");

module.exports = new class GuildPrecondition extends Precondition {
	constructor() {
		super({name: "guild"});
	}

	run(command, msg) {
		if (msg.channel.guild)
			return PreconditionResult.fromSuccess();

		return PreconditionResult.fromError(command, "This command can only be used from within a server.");
	}
}();
