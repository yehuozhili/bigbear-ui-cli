import program from "commander";
import { version, RCNAME } from "./utils/constants";
import main from "./index";

const actionMap = {
	install: {
		alias: "i",
		description: "install template",
		examples: ["bigbear-ui-cli i", "bigbear-ui-cli install"],
	},
	config: {
		alias: "c",
		description: `config ${RCNAME}`,
		examples: [
			"bigbear-ui-cli config set <k> <v>",
			"bigbear-ui-cli config get <k>",
			"bigbear-ui-cli config remove <k>",
		],
	},
};

Object.keys(actionMap).forEach((action) => {
	program
		.command(action)
		.description(actionMap[action].description)
		.alias(actionMap[action].alias)
		.action(() => {
			if (action === "config") {
				main(action, ...process.argv.slice(3));
			} else if (action === "install") {
				main(action);
			}
		});
});

function help() {
	console.log("\r\n  " + "how to use command");
	Object.keys(actionMap).forEach((action) => {
		actionMap[action].examples.forEach((example) => {
			console.log("  - " + example);
		});
	});
}
program.on("-h", help);
program.on("--help", help);

program.version(version).parse(process.argv);
