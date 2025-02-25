import { FC, PropsWithChildren, ReactNode } from "react";

type LayoutProps<T = ReactNode> = {
	header: T;
	side: T
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, header, side }) => {
	return (<div id="layout" className="grid grid-rows-[40px_1fr] grid-cols-[200px_10px_1fr] h-full">
		<header className="col-span-full bg-white overflow-y-auto  shadow-xl z-10">{header}</header>
		<div className="bg-fuchsia overflow-y-auto shadow-[3px_0px_10px] shadow-blue z-8">{side}</div>
		<div className="bg-white"></div>
		<div className=" bg-blueGray overflow-y-auto shadow-yellow z-6 shadow-[-3px_0_10px]">{children}</div>
	</div>)
};

export default Layout