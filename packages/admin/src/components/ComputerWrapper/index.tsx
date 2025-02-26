import { FC, PropsWithChildren } from "react"
import computer from "../../assets/computer-wrapper.png"

const ComputerWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div className="position-relative">
		<img src={computer} alt="mac_computer_img" className="w-[754px] h-[434px] max-w-[754px]"/>
		<div className="pos-absolute w-[569px] h-[355px] left-92px top-27px bg-white">{children}</div>
	</div>
}

export default ComputerWrapper;
