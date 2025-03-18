import { FC, PropsWithChildren } from "react";

const ArtText: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div
		className="text-5em color-transparent font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa"
	>{children}</div>
}
export default ArtText;