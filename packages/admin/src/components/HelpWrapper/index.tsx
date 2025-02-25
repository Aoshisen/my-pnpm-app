import { FC, Fragment, PropsWithChildren } from "react";

// sm	40rem (640px)	@media (width >= 40rem) { ... }
// md	48rem (768px)	@media (width >= 48rem) { ... }
// lg	64rem (1024px)	@media (width >= 64rem) { ... }
// xl	80rem (1280px)	@media (width >= 80rem) { ... }
// 2xl	96rem (1536px)	@media (width >= 96rem) { ... }


// @see https://tailwindcss.com/docs/responsive-design
const HelpWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const isDevelop = import.meta.env.MODE === "development";
	if (!isDevelop) {
		return <Fragment>{children}</Fragment>
	}
	return <div id="help-wrapper" className="grid grid-rows-[64px_1fr] h-screen w-screen grid-cols-[0px_1fr] lg:grid-cols-[200px_1fr]  sm:grid-cols-[100px_1fr]">
		<div className="col-span-full bg-[#001529] overflow-y-auto"></div>
		<div className="bg-black overflow-y-auto max-h-full"></div>
		<div className="overflow-y-auto max-h-full">{children}</div>
	</div>

}
export default HelpWrapper