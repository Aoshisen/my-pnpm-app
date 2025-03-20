import { FC, PropsWithChildren } from "react"
type PreviewWrapperProps = {
	ref?: React.RefObject<HTMLDivElement | null>
}

export const PreviewWrapper: FC<PropsWithChildren<PreviewWrapperProps>> = ({ children, ref }) => {
	return <div className="flex flex-justify-center flex-items-center h-full w-full" ref={ref}>
		{children}
	</div>
}
