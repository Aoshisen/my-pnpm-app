import woman from "./woman.jpg"
import { Image as ImageClass } from "./image.ts"
import { ReactEventHandler, useCallback, useRef, useState } from "react"
import { useEventListener, useThrottleFn } from "ahooks";
const Image = () => {
	const containerEl = useRef<HTMLDivElement>(null);
	const [imageInstance, setImageInstance] = useState<ImageClass>()
	const handleOnLoad: ReactEventHandler<Element> = ({ target }) => {
		const image = new ImageClass(target as HTMLImageElement);
		setImageInstance(image);
		containerEl.current!.removeChild(target as HTMLImageElement)
		containerEl.current!.append(image.canvas)
	}

	const handleScroll = useCallback(() => {
		if (!imageInstance) {
			return;
		}
		const step = (window.scrollY / 20)
		imageInstance.run(step)
	}, [imageInstance])

	const { run } = useThrottleFn(handleScroll, { wait: 20 })

	useEventListener("scroll", run)

	return <>
		<div className="h-3xl flex flex-items-center flex-justify-center">
			<div className=" shadow-md shadow-gray-2" ref={containerEl}>
				<img src={woman} alt="" onLoad={handleOnLoad} />
			</div>
		</div>
		<div className="h-3xl"></div>
	</>
}

export default Image