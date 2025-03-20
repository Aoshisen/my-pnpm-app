import { FC, PropsWithChildren } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	[key: string]: unknown
}
export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...rest }) => {
	const className = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
	const defaultClass = "bg-primary text-primary-foreground shadow hover:bg-primary/90";
	const sizeClass = "h-9 px-4 py-2";
	return <button
		className={className + " " + defaultClass + " " + sizeClass}
		{...rest}
	>{children}</button>
}