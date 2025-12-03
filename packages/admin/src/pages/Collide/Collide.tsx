import { useEffect, useRef } from "react";
import { BaseWrapper } from "../../components";
import * as d3 from "d3";
import { data, width } from "./data"

export default () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!containerRef.current || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;

		const height = width;
		const color = d3.scaleOrdinal(d3.schemeTableau10);
		const nodes = data.map((d: any) => Object.create(d));

		const simulation = d3.forceSimulation(nodes)
			.alphaTarget(0.3) // stay hot
			.velocityDecay(0.1) // low friction
			.force("x", d3.forceX().strength(0.01))
			.force("y", d3.forceY().strength(0.01))
			.force("collide", d3.forceCollide().radius((d: any) => d.r + 1).iterations(3))
			.force("charge", d3.forceManyBody().strength((d: any, i: number) => i ? 0 : -width * 2 / 3))
			.on("tick", ticked);

		d3.select(canvas)
			.on("touchmove", event => event.preventDefault())
			.on("pointermove", pointermoved);

		function pointermoved(event: PointerEvent) {
			const [x, y] = d3.pointer(event);
			nodes[0].fx = x - width / 2;
			nodes[0].fy = y - height / 2;
		}

		function ticked() {
			if (!context) return;
			context.clearRect(0, 0, width, height);
			context.save();
			context.translate(width / 2, height / 2);
			for (let i = 1; i < nodes.length; ++i) {
				const d = nodes[i];
				context.beginPath();
				context.moveTo(d.x + d.r, d.y);
				context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
				context.fillStyle = color(d.group);
				context.fill();
			}
			context.restore();
		}

		// 清理函数替代原来的 invalidation
		return () => {
			simulation.stop();
		};

	}, []);

	return (
		<BaseWrapper>
			<div className="h-full w-full relative" ref={containerRef}>
				<canvas
					ref={canvasRef}
					width={width}
					height={width}
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
		</BaseWrapper>
	);
};