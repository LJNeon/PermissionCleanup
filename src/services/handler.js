"use strict";
const {Handler} = require("patron.js");
const registry = require("./registry.js");

module.exports = new Handler({registry});
