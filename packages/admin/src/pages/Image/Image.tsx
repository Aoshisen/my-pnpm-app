import { Image as ImageClass } from "./image.ts"
import { ReactEventHandler, useCallback, useRef, useState } from "react"
import { useEventListener, useThrottleFn } from "ahooks";
//@see https://observablehq.com/
const woman = "https://images.ctfassets.net/uklh5xrq1p2j/abyW2Vm1ggRneFM6vKcNb/174435a3e294516046e64d7435fab32a/Kaitlyn_V3_600-_1_-copy.jpg";
//@see https://github.com/settings/profile;
const me= "https://avatars.githubusercontent.com/u/66982800?s…00&u=714f1dfd75792020c7e78e49889b87378760a0ea&v=4"

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
				<img src={woman} alt="" onLoad={handleOnLoad}  crossOrigin="anonymous"/>
			</div>
		</div>
		<div className="h-3xl"></div>
	</>
}

export default Image