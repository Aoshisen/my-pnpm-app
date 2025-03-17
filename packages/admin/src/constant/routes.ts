import { RouteProps } from 'react-router';
import { camelCase } from "lodash-es";

const pages = await import('../pages/index.ts');

const routes: RouteProps[] =
	Object.keys(pages).
		reduce((perviousValue, currentValue) => {
			const path = camelCase(currentValue);
			const currentPath = path === "home" ? "/" : `/${path}`;
			const currentRoute =
			{
				path: currentPath,
				//@ts-expect-error 类型错误
				Component: pages[currentValue]
			}
			return [
				...perviousValue,
				currentRoute
			]
		}, [] as RouteProps[])

export default routes;