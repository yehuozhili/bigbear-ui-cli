import { repoList, tagList, downloadLocal } from "./utils/git";
import { downLoadDirectory } from "./utils/constants";
import { writeRC } from "./utils/rc";
import ora from "ora";
import inquirer from "inquirer";
let { promisify } = require("util");
let MetalSmith = require("metalsmith");
let path = require("path");
let fs = require("fs");
let { render } = require("consolidate").ejs;
render = promisify(render);
let ncp = require("ncp");
ncp = promisify(ncp);

let install = async () => {
	let testRC = ora("use config");
	testRC.start();
	await writeRC();
	testRC.succeed();
	let loading = ora("use template ......");
	loading.start();
	let list = await repoList();
	loading.succeed();
	let answer = await inquirer.prompt([
		{
			type: "list",
			name: "project",
			choices: list,
			questions: "pleace choice template",
		},
	]);
	// console.log(answer.project);
	//拿到当前项目
	let project = answer.project;
	//获取当前的项目的版本号
	loading = ora("fetching tag ......");
	loading.start();
	list = await tagList(project);
	loading.succeed();
	list = list.map(({ name }) => name);
	let answer2 = await inquirer.prompt([
		{
			type: "list",
			name: "tag",
			choices: list,
			questions: "pleace choice tag",
		},
	]);
	let tag = answer2.tag;

	loading = ora("download project ......");
	loading.start();
	await downloadLocal(project, tag);
	loading.succeed();
	let answer3 = await inquirer.prompt([
		{
			type: "input",
			name: "projectName",
			questions: "pleace input ProjectName",
		},
	]);
	let projectName = answer3.projectName;
	if (
		!fs.existsSync(path.join(downLoadDirectory + "/" + project, "ask.js"))
	) {
		await ncp(downLoadDirectory + "/" + project, path.resolve(projectName));
	} else {
		await new Promise((resolve, reject) => {
			MetalSmith(__dirname)
				.source(downLoadDirectory + "/" + project)
				.destination(path.resolve(projectName))
				.use(async (files, metal, done) => {
					let args = require(path.join(
						downLoadDirectory + "/" + project,
						"ask.js"
					));
					let obj = await inquirer.prompt(args);
					let meta = metal.metadata();
					Object.assign(meta, obj, { projectName: projectName });
					delete files["ask.js"];
					done();
				})
				.use((files, metal, done) => {
					let obj = metal.metadata();
					Reflect.ownKeys(files).forEach(async (file) => {
						if (file.includes("js") || file.includes("json")) {
							let content = files[file].contents.toString(); //文件的内容
							if (content.includes("<%")) {
								content = await render(content, obj);
								files[file].contents = Buffer.from(content); //渲染结果
							}
						}
					});
					done();
				})
				.build((err) => {
					if (err) {
						reject();
					} else {
						resolve();
					}
				});
		});
	}
};

export default install;
