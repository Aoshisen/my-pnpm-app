import { FC, PropsWithChildren, ReactNode } from "react";

type LayoutProps<T = ReactNode> = {
	header: T;
	side: T
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, header, side }) => {
	return (
		<div id="layout" className="p-4 bg-gray-1 h-screen">
			<div className="grid grid-rows-[62px_1fr]  grid-cols-[380px_1fr] h-full shadow-lg rounded-b-md overflow-hidden">
				<header className="col-span-full bg-white overflow-y-auto  shadow-sm z-1">{header}</header>
				<aside className="bg-white overflow-y-auto">{side}</aside>
				<main className="overflow-y-auto bg-white m-2">{children}</main>
			</div>
		</div>
	)
};
