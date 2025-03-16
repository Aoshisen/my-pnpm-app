import { useRef } from "react";
import { Sky as SkyClass } from "./sky"
import { useMount } from "ahooks";

const Sky = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useMount(() => {
		new SkyClass(canvasRef.current!)
	})

	return <div className="w-screen h-screen flex flex-items-center flex-justify-center">
		<div className="w-4xl h-4xl b-black b-1px b-solid">
			<canvas ref={canvasRef} width={896} height={896} className="bg-black" />
		</div>
	</div>
}
export default Sky;