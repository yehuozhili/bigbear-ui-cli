"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _git = require("./utils/git");

var _constants = require("./utils/constants");

var _rc = require("./utils/rc");

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let { promisify } = require("util");
let MetalSmith = require("metalsmith");
let path = require("path");
let fs = require("fs");
let { render } = require("consolidate").ejs;
render = promisify(render);
let ncp = require("ncp");
ncp = promisify(ncp);

let install = async () => {
	let testRC = (0, _ora2.default)("use config");
	testRC.start();
	await (0, _rc.writeRC)();
	testRC.succeed();
	let loading = (0, _ora2.default)("use template ......");
	loading.start();
	let list = await (0, _git.repoList)();
	loading.succeed();
	let answer = await _inquirer2.default.prompt([{
		type: "list",
		name: "project",
		choices: list,
		questions: "pleace choice template"
	}]);
	// console.log(answer.project);
	//拿到当前项目
	let project = answer.project;
	//获取当前的项目的版本号
	loading = (0, _ora2.default)("fetching tag ......");
	loading.start();
	list = await (0, _git.tagList)(project);
	loading.succeed();
	list = list.map(({ name }) => name);
	let answer2 = await _inquirer2.default.prompt([{
		type: "list",
		name: "tag",
		choices: list,
		questions: "pleace choice tag"
	}]);
	let tag = answer2.tag;

	loading = (0, _ora2.default)("download project ......");
	loading.start();
	await (0, _git.downloadLocal)(project, tag);
	loading.succeed();
	let answer3 = await _inquirer2.default.prompt([{
		type: "input",
		name: "projectName",
		questions: "pleace input ProjectName"
	}]);
	let projectName = answer3.projectName;
	if (!fs.existsSync(path.join(_constants.downLoadDirectory + "/" + project, "ask.js"))) {
		await ncp(_constants.downLoadDirectory + "/" + project, path.resolve(projectName));
	} else {
		await new Promise((resolve, reject) => {
			MetalSmith(__dirname).source(_constants.downLoadDirectory + "/" + project).destination(path.resolve(projectName)).use(async (files, metal, done) => {
				let args = require(path.join(_constants.downLoadDirectory + "/" + project, "ask.js"));
				let obj = await _inquirer2.default.prompt(args);
				let meta = metal.metadata();
				Object.assign(meta, obj, { projectName: projectName });
				delete files["ask.js"];
				done();
			}).use((files, metal, done) => {
				let obj = metal.metadata();
				Reflect.ownKeys(files).forEach(async file => {
					if (file.includes("js") || file.includes("json")) {
						let content = files[file].contents.toString(); //文件的内容
						if (content.includes("<%")) {
							content = await render(content, obj);
							files[file].contents = Buffer.from(content); //渲染结果
						}
					}
				});
				done();
			}).build(err => {
				if (err) {
					reject();
				} else {
					resolve();
				}
			});
		});
	}
};

exports.default = install;