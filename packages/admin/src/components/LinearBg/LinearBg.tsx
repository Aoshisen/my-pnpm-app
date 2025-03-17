import { FC, PropsWithChildren } from "react"


const LinearBg: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div
		className="
		bg-[linear-gradient(to_right,_#f6f6f6_1px,_transparent_1px),_linear-gradient(to_bottom,_#f6f6f6_1px,_transparent_1px)]
		bg-[size:14px_14px]
		"
	>{children}</div>
}
export default LinearBg