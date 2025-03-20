//@see https://antfu.me/projects
import { useEffect, useRef } from "react";
import { Sky as SkyClass } from "./sky"
import { useSize } from "ahooks";
import { BaseWrapper } from "../../components";

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

	return <BaseWrapper>
		<div className="h-full w-full" ref={containerRef} />
	</BaseWrapper>
}
export default Sky;