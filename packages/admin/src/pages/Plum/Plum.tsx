import { useSize } from "ahooks";
import { useEffect, useRef } from "react";
import { Plum as PlumClass } from "./plum.ts"
import { BaseWrapper } from "../../components/BaseWrapper.tsx";

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
	return <BaseWrapper>
		<div className="w-full h-full"
			ref={containerRef}
		/>
	</BaseWrapper>

}
export default Plum