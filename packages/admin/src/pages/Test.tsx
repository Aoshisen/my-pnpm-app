import { ReactEventHandler, useEffect, useMemo as useCallback, useRef, useState } from "react";
import { useEventListener, useMouse, useSize } from "ahooks";
import { BaseWrapper } from "../components";

export const Test = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	const [lines, setLines] = useState<Lines>()
	const mousePosition = useMouse()
	useEffect(() => {
		if (size) {
			const lines = new Lines(size.width, size.height);
			setLines(lines);
			//@ts-expect-error global sky
			window.lines = lines;
			containerRef.current!.append(lines.canvas)
		}
	}, [size])

	useEffect(() => {
		console.log(mousePosition,)
		console.log(lines)
	}, [mousePosition, lines])

	return <BaseWrapper>
		<div className="h-full w-full" ref={containerRef} />
	</BaseWrapper>
}

class Canvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	constructor(public width: number, public height: number) {
		this.canvas = this.createCanvas(width, height)
		this.ctx = this.canvas.getContext("2d")!;
	}
	createCanvas(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
}

export class Lines extends Canvas {
	GAP = 20;
	lines: Line[];
	constructor(public width: number, public height: number) {
		super(width, height)
		this.lines = this.generate_lines()
	}
	generate_lines() {
		const lines = []
		for (const line of this.generate_line()) {
			lines.push(line)
		}
		return lines

	}
	*generate_line() {
		for (let x = this.GAP; x < this.width; x += this.GAP) {
			for (let y = this.GAP; y < this.width; y += this.GAP) {
				const lineInstance = new Line(x, y, this.canvas.clientLeft + x, this.canvas.clientTop + y, this.GAP, this.ctx);
				yield lineInstance;
			}
		}
	}
	draw_lines() {
	}
}

type Point = {
	x: number,
	y: number
}
export class Line {
	LINE_WIDTH = 1;
	LINE_LENGTH = 15;
	constructor(public x: number, public y: number,
		public clientX: number, public clientY: number,
		public GAP: number, public ctx: CanvasRenderingContext2D) {
	}
	update(theta: number) {
		this.ctx.moveTo(this.x, this.y);
		const X = Math.cos(theta) * this.LINE_LENGTH;
		const Y = Math.sin(theta) * this.LINE_LENGTH;
		this.ctx.lineTo(this.x + X, this.y + Y)
		this.ctx.strokeStyle = "grey";
		this.ctx.lineWidth = this.LINE_WIDTH;
		this.ctx.stroke();
	}
	getThetaFormPoint(p: Point) {
		return Math.atan2(p.y - this.y, p.x - this.x)
	}
}