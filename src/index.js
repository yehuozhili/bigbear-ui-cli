import { betterRequire } from "./utils/common"; //动态加载文件
import { resolve } from "path";

const apply = (action, ...args) => {
	betterRequire(resolve(__dirname, `./${action}`))(...args); //默认导出
};
export default apply;
