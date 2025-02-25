import { FC, PropsWithChildren, ReactNode } from "react";

type LayoutProps<T = ReactNode> = {
	header: T;
	side: T
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, header, side }) => {
	return (<div id="layout" className="grid grid-rows-[40px_1fr] grid-cols-[200px_10px_1fr] h-full">
		<header className="col-span-full bg-white overflow-y-auto  shadow-xl z-10">{header}</header>
		<div className="bg-fuchsia overflow-y-auto shadow-[3px_0px_10px] shadow-gray-3">{side}</div>
		<span></span>
		<div className=" bg-white overflow-y-auto shadow-[-3px_0_10px] shadow-gray-3">{children}</div>
	</div>)
};

export default Layout