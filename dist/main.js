"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _constants = require("./utils/constants");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const actionMap = {
	install: {
		alias: "i",
		description: "install template",
		examples: ["bigbear-ui-cli i", "bigbear-ui-cli install"]
	},
	config: {
		alias: "c",
		description: `config ${_constants.RCNAME}`,
		examples: ["bigbear-ui-cli config set <k> <v>", "bigbear-ui-cli config get <k>", "bigbear-ui-cli config remove <k>"]
	}
};

Object.keys(actionMap).forEach(action => {
	_commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
		if (action === "config") {
			(0, _index2.default)(action, ...process.argv.slice(3));
		} else if (action === "install") {
			(0, _index2.default)(action);
		}
	});
});

function help() {
	console.log("\r\n  " + "how to use command");
	Object.keys(actionMap).forEach(action => {
		actionMap[action].examples.forEach(example => {
			console.log("  - " + example);
		});
	});
}
_commander2.default.on("-h", help);
_commander2.default.on("--help", help);

_commander2.default.version(_constants.version).parse(process.argv);