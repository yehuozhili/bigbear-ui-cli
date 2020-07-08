import { get, set, remove, getAll } from "./utils/rc.js";
let config = async (action, k, v) => {
	switch (action) {
		case "get":
			if (k) {
				let key = await get(k);
				console.log(key);
			} else {
				let obj = await getAll();
				Object.keys(obj).forEach((key) => {
					console.log(`${key}=${obj[key]}`);
				});
			}
			break;
		case "set":
			set(k, v);
			break;
		case "remove":
			remove(k);
			break;
	}
};
export default config;
