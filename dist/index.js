"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _common = require("./utils/common");

var _path = require("path");

const apply = (action, ...args) => {
	(0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${action}`))(...args); //默认导出
}; //动态加载文件
exports.default = apply;