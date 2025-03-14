import { FC, PropsWithChildren } from "react";
import computer from "../../assets/computer-wrapper.png";
import phone from "../../assets/phone-wrapper.png";
import useEnvironmentStore, { Environment } from "../../store/environment"; // 如果环境在 store，也可以 props 传入！

type CommonWrapperProps = {
	ref?: React.RefObject<HTMLDivElement | null>;
	scale?: number;
};
const CommonWrapper: FC<PropsWithChildren<CommonWrapperProps>> = ({ children, ref, scale = 1 }) => {
	const { environment } = useEnvironmentStore();
	const isPC = environment === Environment.PC;
	const wrapperImage = isPC ? computer : phone;
	const animateClass = "transition-all duration-300 ease-in-out";
	const imageClass = isPC
		? "w-[754px] h-[434px] max-w-[754px]"
		: "w-[264px] h-[434px] max-w-[264px]";
	const contentClass = isPC
		? "absolute w-[569px] h-[355px] left-[92px] top-[27px] bg-white"
		: "absolute w-[192px] h-[414px] left-[36px] top-[10px] bg-white";

	return (
		<div className="relative" ref={ref} style={{ scale: scale }}>
			<img
				src={wrapperImage}
				alt={isPC ? "mac_computer_img" : "mac_phone_wrapper"}
				className={imageClass + " " + animateClass}
			/>
			<div className={contentClass + " " + animateClass}>{children}</div>
		</div>
	);
};

export default CommonWrapper;
