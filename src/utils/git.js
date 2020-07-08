import { getAll } from "./rc";
import downLoadGit from "download-git-repo";
import { downLoadDirectory } from "./constants";
import axios from "axios";

let fetch = async (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export let tagList = async (repo) => {
	let config = await getAll();
	let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
	return await fetch(api);
};

export let repoList = async () => {
	let config = await getAll();
	return config.template;
};

export let download = async (src, dest) => {
	return new Promise((resolve, reject) => {
		downLoadGit(src, dest, (err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};

export let downloadLocal = async (project, version) => {
	let config = await getAll();
	let api = `${config.registry}/${project}`;
	if (version) {
		api += `#${version}`;
	}
	return await download(api, downLoadDirectory + "/" + project);
};
