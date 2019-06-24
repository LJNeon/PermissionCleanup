"use strict";
const config = require("../../config.json");
const {Client} = require("eris");

module.exports = new Client(config.token, {
	defaultImageFormat: "png",
	defaultImageSize: 256,
	disableEvents: {
		TYPING_START: true,
		VOICE_STATE_UPDATE: true
	},
	getAllUsers: true,
	latencyThreshold: 1e3,
	restMode: true
});
