"use strict";
const {Argument, Command} = require("patron.js");

module.exports = new class HelpCommand extends Command {
	constructor() {
		super({
			args: [new Argument({
				defaultValue: undefined,
				example: "autoclean",
				key: "command",
				name: "command",
				type: "command"
			})],
			description: "This command.",
			groupName: "info",
			names: ["help"]
		});
		this.fullDescription = "Gives information about all commands or a specific command.";
	}

	async run(msg, args) {
		// args.command is either a valid Command object or undefined.
	}
}();
