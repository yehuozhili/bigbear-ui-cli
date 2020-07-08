"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAll = exports.remove = exports.set = exports.get = exports.writeRC = undefined;

var _constants = require("./constants.js");

var _ini = require("ini");

var _util = require("util");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let exists = (0, _util.promisify)(_fs2.default.exists);
let readFile = (0, _util.promisify)(_fs2.default.readFile);
let writeFile = (0, _util.promisify)(_fs2.default.writeFile);

let writeRC = exports.writeRC = async () => {
	let has = await exists(_constants.RC);
	let opts;
	if (!has) {
		opts = _constants.DEFAULTS;
		await writeFile(_constants.RC, (0, _ini.encode)(opts), "utf8");
	}
};

let get = exports.get = async k => {
	let has = await exists(_constants.RC);
	let opts;
	if (has) {
		opts = await readFile(_constants.RC, "utf8");
		opts = (0, _ini.decode)(opts);
		return opts[k];
	}
	return "";
};
let set = exports.set = async (k, v) => {
	let has = await exists(_constants.RC);
	let opts;
	if (has) {
		opts = await readFile(_constants.RC, "utf8");
		opts = (0, _ini.decode)(opts);
		Object.assign(opts, { [k]: v });
	} else {
		opts = Object.assign(_constants.DEFAULTS, { [k]: v });
	}
	await writeFile(_constants.RC, (0, _ini.encode)(opts), "utf8");
};
let remove = exports.remove = async k => {
	let has = await exists(_constants.RC);
	let opts;
	if (has) {
		opts = await readFile(_constants.RC, "utf8");
		opts = (0, _ini.decode)(opts);
		delete opts[k];
		await writeFile(_constants.RC, (0, _ini.encode)(opts), "utf8");
	}
};
let getAll = exports.getAll = async () => {
	let has = await exists(_constants.RC);
	let opts;
	if (has) {
		opts = await readFile(_constants.RC, "utf8");
		opts = (0, _ini.decode)(opts);
		return opts;
	}
	return {};
};