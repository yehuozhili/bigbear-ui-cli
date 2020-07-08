"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
const { version } = require("../../package.json");

exports.version = version;
const RCNAME = exports.RCNAME = ".bigbearclirc";

const downLoadDirectory = exports.downLoadDirectory = `${process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]}\\.template`;
const HOME = exports.HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

const RC = exports.RC = `${HOME}/${RCNAME}`;

const DEFAULTS = exports.DEFAULTS = {
	registry: "yehuozhili",
	type: "orgs",
	template: ["bigbear-ui-tsthunk-template"]
};