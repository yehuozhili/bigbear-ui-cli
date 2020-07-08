"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.downloadLocal = exports.download = exports.repoList = exports.tagList = undefined;

var _rc = require("./rc");

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _constants = require("./constants");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fetch = async url => {
	return new Promise((resolve, reject) => {
		_axios2.default.get(url).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		});
	});
};

let tagList = exports.tagList = async repo => {
	let config = await (0, _rc.getAll)();
	let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
	return await fetch(api);
};

let repoList = exports.repoList = async () => {
	let config = await (0, _rc.getAll)();
	return config.template;
};

let download = exports.download = async (src, dest) => {
	return new Promise((resolve, reject) => {
		(0, _downloadGitRepo2.default)(src, dest, err => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};

let downloadLocal = exports.downloadLocal = async (project, version) => {
	let config = await (0, _rc.getAll)();
	let api = `${config.registry}/${project}`;
	if (version) {
		api += `#${version}`;
	}
	return await download(api, _constants.downLoadDirectory + "/" + project);
};