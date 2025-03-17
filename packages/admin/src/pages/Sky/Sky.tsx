//@see https://antfu.me/projects
import { useRef } from "react";
import { Sky as SkyClass } from "./sky"
import { useMount } from "ahooks";

const Sky = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useMount(() => {
		//@ts-expect-error global
		window.sky = new SkyClass(canvasRef.current!)
	})

	return <div className="w-screen h-screen flex flex-items-center flex-justify-center">
		<div className="w-2xl h-2xl  overflow-hidden shadow-xl shadow-gray-2">
			<canvas ref={canvasRef} width={672} height={672} />
		</div>
	</div>
}
export default Sky;