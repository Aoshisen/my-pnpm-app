
import { useEffect, useRef, useState } from "react";
import { useMouse, useSize } from "ahooks";
import { BaseWrapper } from "../../components";
import { Lines as LinesClass } from "./lines.ts"

// @see https://codecember.netlify.app/2020/1
const Lines = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	const [lines, setLines] = useState<LinesClass | null>(null);
	const mousePosition = useMouse();

	useEffect(() => {
		if (size) {
			const lines = new LinesClass(size.width, size.height);
			setLines(lines);
			//@ts-expect-error global sky
			window.lines = lines;
			containerRef.current!.append(lines.canvas);
		}
	}, [size]);

	useEffect(() => {
		if (lines && mousePosition) {
			lines.update(mousePosition);
		}
	}, [mousePosition, lines]);

	return (
		<BaseWrapper>
			<div className="h-full w-full" ref={containerRef} />
		</BaseWrapper>
	);
};

export default Lines