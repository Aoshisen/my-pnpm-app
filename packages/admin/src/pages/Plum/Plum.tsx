import { useMount } from "ahooks";
import { useRef } from "react";
import { Plum as PlumClass } from "./plum.ts"

const Plum = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useMount(() => {
		const canvasEl = canvasRef.current!;
		//@ts-expect-error global
		// window.plum = new PlumClass(canvasEl!, canvasEl.width / 2, 0)
		// window.plum1 = new PlumClass(canvasEl!, canvasEl.width, canvasEl.height / 2)
		window.plum2 = new PlumClass(canvasEl!, canvasEl.width / 2, canvasEl.height)
		// window.plum3 = new PlumClass(canvasEl!, 0, canvasEl.height / 2)

	})
	return <div className="w-screen h-screen flex flex-items-center flex-justify-center">
		<div className="w-2xl h-2xl  overflow-hidden shadow-xl shadow-gray-2">
			<canvas ref={canvasRef} width={672} height={672} />
		</div>
	</div>
}
export default Plum