import { useSize } from "ahooks";
import { useEffect, useRef } from "react";
import { Plum as PlumClass } from "./plum.ts"

const Plum = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	useEffect(() => {
		if (size) {
			const plum = new PlumClass(size.width!, size.height, size.width / 2, size.height)
			//@ts-expect-error global 
			window.plum = plum
			containerRef.current?.append(plum.canvas)
		}
	}, [size])
	return <div className="w-screen h-screen flex flex-items-center flex-justify-center">
		<div className="w-xl h-xl  overflow-hidden shadow-xl shadow-gray-2" ref={containerRef}>
		</div>
	</div>
}
export default Plum