import { PropsWithChildren, FC } from "react";


export const BaseWrapper: FC<PropsWithChildren<unknown>> = ({
	children,
}) => {
	return (
		<div className="w-screen h-screen flex flex-items-center flex-justify-center">
			<div className="w-xl h-xl  overflow-hidden shadow-xl shadow-gray-2">
				{children}
			</div>
		</div>
	);
};