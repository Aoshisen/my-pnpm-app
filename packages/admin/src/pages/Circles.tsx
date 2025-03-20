import { useRef } from "react";
import { BaseWrapper } from "../components"
import { Circles as CirclesComp } from "../components"
import { useSize } from "ahooks";
export const Circles = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	return <BaseWrapper>
		<div className="w-full h-full" ref={containerRef}>
			{size ?
				<CirclesComp size={size?.width} />
				: null
			}
		</div>
	</BaseWrapper>
}