//@see https://antfu.me/projects
import { useEffect, useRef } from "react";
import { Sky as SkyClass } from "./sky"
import { useSize } from "ahooks";

const Sky = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	useEffect(() => {
		if (size) {
			const sky = new SkyClass(size.width, size.height)
			//@ts-expect-error global sky
			window.sky = sky;
			containerRef.current!.append(sky.el)
		}
	}, [size])

	return <div className="w-screen h-screen flex flex-items-center flex-justify-center">
		<div className="w-xl h-xl  overflow-hidden shadow-xl shadow-gray-2" ref={containerRef}>
		</div>
	</div>
}
export default Sky;