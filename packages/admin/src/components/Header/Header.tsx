import { FC } from "react";
import { Status } from "../../store/status";
import { Environment } from "../../store/environment";

type ButtonStatus = {
	loading: boolean,
	hidden: boolean,
	disabled: boolean,
	onClick: () => void,
}

type HeaderProps = {
	status: Status
	environment: Environment,
	cancel_button: ButtonStatus,
	confirm_button: ButtonStatus,
}

const Left: FC<HeaderProps> = () => {
	return <>centered</>

}

const Centered: FC<HeaderProps> = () => {
	return <>Centered</>
}

const Buttons: FC<HeaderProps> = () => {
	return <>buttons</>
}

const Header: FC<HeaderProps> = (props) => {
	return <div className="grid grid-cols-[380px_1fr] h-full">
		<div className="h-full flex flex-items-center px-5"><Left {...props} /></div>
		<div className="h-full flex flex-items-center pos-relative">
			<div className="mx-a"><Centered {...props} /></div>
			<div className="pos-absolute px-5 right-0">
				<Buttons {...props} />
			</div>
		</div>
	</div>
}
export default Header