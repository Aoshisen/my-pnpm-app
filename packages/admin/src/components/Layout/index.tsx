import { FC, PropsWithChildren, ReactNode } from "react";

type LayoutProps<T = ReactNode> = {
	header: T;
	side: T
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, header, side }) => {
	return (<div id="layout" className="grid grid-rows-[40px_1fr_10px] grid-cols-[200px_10px_1fr] h-screen">
		<header className="col-span-full bg-white overflow-y-auto  shadow-lg z-1">{header}</header>
		<div className="bg-white overflow-y-auto shadow-gray-1 shadow-[3px_2px_5px]">{side}</div>
		<span></span>
		<div className=" bg-white overflow-y-auto shadow-gray-1 shadow-[-3px_2px_5px]">{children}</div>
	</div>)
};

export default Layout