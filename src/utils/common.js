export const betterRequire = (absPath) => {
	let module = require(absPath);
	if (module.default) {
		return module.default;
	}
	return module;
};
