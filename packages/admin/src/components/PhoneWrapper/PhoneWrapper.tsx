import { FC, PropsWithChildren } from "react"
import phone from "../../assets/phone-wrapper.png"

const PhoneWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div className="position-relative">
		<img src={phone} alt="mac_phone_wrapper" className="w-[264px] h-[434px] max-w-[264px]"/>
		<div className="position-absolute bg-white w-[192px]  h-[414px] left-36px top-10px">{children}</div>
	</div>
}

export default PhoneWrapper;