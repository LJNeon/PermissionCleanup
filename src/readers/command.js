"use strict";
const {TypeReader, TypeReaderResult} = require("patron.js");
const registry = require("../services/registry.js");

module.exports = new class CommandReader extends TypeReader {
	constructor() {
		super({type: "command"});
	}

	read(cmd, msg, arg, args, val) {
		const match = registry.commands.find(c => c.names.includes(val.toLowerCase()));

		if(match === undefined)
			return TypeReaderResult.fromError(cmd, `"${val}" isn't a command.`);

		return TypeReaderResult.fromSuccess(match);
	}
}();
