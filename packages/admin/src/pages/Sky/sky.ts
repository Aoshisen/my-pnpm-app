//@ts-expect-error  外部依赖不符合esm 规范;
import { Noise } from "noisejs"
const noise = new Noise(Math.random());
const perlin3 = noise.perlin3.bind(noise);
type Point = { x: number, y: number }

function* generatePoints(width: number, height: number, gap: number) {
	let index = 0
	for (let x = 0; x < width; x += gap) {
		for (let y = 0; y < height; y += gap) {
			yield { x, y, index };
			index++;
		}
	}
}

function* generateBuffer(pointsBuffer: Float32Array<ArrayBufferLike>, size: number) {
	for (let index = 0; index < pointsBuffer.length; index += size) {
		yield { x: pointsBuffer[index], y: pointsBuffer[index + 1] }
	}

}

function getForceOnPoint({ x, y }: Point, scale: number) {
	const date = +new Date() / (scale * 10);
	return perlin3(x / scale, y / scale, date) * Math.PI;
}

function getLengthOnPoint({ x, y }: Point, scale: number, length: number) {
	return (perlin3(x / scale, y / scale, 1)) * length;
}


export class Sky {
	private readonly GAP = 15;
	private readonly RADIUS = 1.5;
	private readonly SCALE = 250;
	private readonly LENGTH = 10;
	private pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 2;
	private readonly FPS = 30;
	private timeStamp = performance.now();
	ctx: CanvasRenderingContext2D;
	dots: Map<string, Point> = new Map();

	constructor(private el: HTMLCanvasElement) {
		this.ctx = this.el.getContext("2d")!;
		this.pointsBuffer = new Float32Array(this.getBufferSize());
		this.initializePoints();
		this.startAnimate();
	}

	getBufferSize() {
		const pointCount = Math.ceil(this.el.width / this.GAP) * Math.ceil(this.el.height / this.GAP);
		return (pointCount * this.POINT_DATA_SIZE);
	}

	initializePoints() {
		for (const { x, y, index } of generatePoints(this.el.width, this.el.height, this.GAP)) {
			const bufferIndex = index * this.POINT_DATA_SIZE;
			this.pointsBuffer[bufferIndex] = x;
			this.pointsBuffer[bufferIndex + 1] = y;
		}
	}

	shouldUpdate() {
		return performance.now() - this.timeStamp > (1000 / this.FPS)
	}

	nextPoint(p: Point) {
		const force = getForceOnPoint(p, this.SCALE)
		const opacity = Math.abs(Math.cos(force)) * 0.3 + 0.1
		const length = getLengthOnPoint(p, this.SCALE, this.LENGTH)
		const X = Math.cos(force) * length;
		const Y = Math.sin(force) * length;
		return {
			x: p.x + X,
			y: p.y + Y,
			color: `rgba(180,180,180,${opacity})`
		}
	}

	drawDot(p: Point) {
		const nextPoint = this.nextPoint(p)
		this.ctx.beginPath();
		this.ctx.fillStyle = nextPoint.color;
		this.ctx.arc(nextPoint.x, nextPoint.y, this.RADIUS, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath()
	}

	dot() {
		this.ctx.clearRect(0, 0, this.el.width, this.el.height);
		for (const point of generateBuffer(this.pointsBuffer, this.POINT_DATA_SIZE)) {
			this.drawDot(point)
		}
	}
	nextFrame() {
		requestAnimationFrame(() => this.startAnimate());
	}

	startAnimate() {
		if (this.shouldUpdate()) {
			this.dot();
			this.timeStamp = performance.now()
		}
		this.nextFrame()
	}
}