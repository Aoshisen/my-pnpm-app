import { FC, PropsWithChildren } from "react";

const HelpWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div className="grid grid-rows-[45px_1fr] grid-cols-[40px_1fr] h-screen w-screen">
		<div className="col-span-full bg-black overflow-y-auto max-h-[45px]"></div>
		<div className="bg-black overflow-y-auto max-h-full"></div>
		<div className="overflow-y-auto max-h-full">{children}</div>
	</div>

}
export default HelpWrapper