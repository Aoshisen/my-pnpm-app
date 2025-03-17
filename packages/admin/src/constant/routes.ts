import { RouteProps } from 'react-router';
import { camelCase } from "lodash-es";
const pages = await import("../pages/index.ts")

const routes = Object.keys(pages).reduce((previousValue, currentValue) => {
	const path = camelCase(currentValue);
	const currentPath = `/${path}`;
	const currentRoute = {
		path: currentPath,
		//@ts-expect-error 不确定的类型
		Component: pages[currentValue],
	};
	return [
		...previousValue,
		currentRoute
	];
}, [] as RouteProps[]);


export default routes;