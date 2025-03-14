import { FC, PropsWithChildren } from "react"

const PreviewWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div className="flex flex-justify-center flex-items-center h-full">
		{children}
	</div>
}

export default PreviewWrapper;