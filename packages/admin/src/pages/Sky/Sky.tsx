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
		<div className="w-3xl h-3xl b-black b-1px b-solid overflow-hidden shadow-2xl shadow-gray">
			<canvas ref={canvasRef} width={768} height={768} className="bg-stone-950" />
		</div>
	</div>
}
export default Sky;