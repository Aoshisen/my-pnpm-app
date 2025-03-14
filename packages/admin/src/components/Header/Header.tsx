import { FC } from "react";
import { Status } from "../../store/status";
import useEnvironmentStore, { Environment } from "../../store/environment";
import classNames from "classnames";

type ButtonStatus = {
	loading: boolean,
	hidden: boolean,
	disabled: boolean,
	onClick: () => void,
}

type HeaderProps = Partial<{
	status: Status
	cancel_button: ButtonStatus,
	confirm_button: ButtonStatus,
}>

const Left: FC<HeaderProps> = () => {
	return <>centered</>
}

const Centered: FC<HeaderProps> = () => {
	const { pc, mobile, environment } = useEnvironmentStore()

	const buttons = [Environment.MOBILE, Environment.PC].map(env => ({
		text: env === Environment.MOBILE ? '手机' : '电脑',
		onClick: env === Environment.MOBILE ? mobile : pc,
		isActive: environment === env
	}))

	return <>
		{buttons.map(({ text, onClick, isActive }) => (
			<button
				key={text}
				onClick={onClick}
				className={classNames('btn btn-primary btn-sm', { 'btn-active': isActive })}
			>
				{text}
			</button>
		))}
	</>
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