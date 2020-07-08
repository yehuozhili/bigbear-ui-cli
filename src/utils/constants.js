export const { version } = require("../../package.json");

export const RCNAME = ".bigbearclirc";

export const downLoadDirectory = `${
	process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
}\\.template`;
export const HOME =
	process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

export const RC = `${HOME}/${RCNAME}`;

export const DEFAULTS = {
	registry: "yehuozhili",
	type: "orgs",
	template: ["bigbear-ui-tsthunk-template"],
};
