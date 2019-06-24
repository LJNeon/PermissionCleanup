"use strict";
const {Library, Registry} = require("patron.js");

module.exports = new Registry({
	caseSensitive: false,
	library: Library.Eris
});
