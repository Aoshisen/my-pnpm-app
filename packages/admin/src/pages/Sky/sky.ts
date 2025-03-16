//@ts-expect-error  外部依赖不符合esm 规范;
import { Noise } from "noisejs"
const noise = new Noise(Math.random());
const perlin3 = noise.perlin3.bind(noise);
type Point = { x: number, y: number }

function* generatePoints(width: number, height: number, gap: number) {
	for (let x = 0; x < width; x += gap) {
		for (let y = 0; y < height; y += gap) {
			yield { x, y };
		}
	}
}
export class Sky {
	private readonly GAP = 20;
	private readonly RADIUS = 1.5;
	private readonly SCALE = 250;
	private readonly LENGTH = 10;
	private pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 2;
	private readonly FPS = 10;
	private timeStamp = performance.now();
	ctx: CanvasRenderingContext2D;
	dots: Map<string, Point> = new Map();

	constructor(private el: HTMLCanvasElement) {
		this.ctx = this.el.getContext("2d")!;
		this.pointsBuffer = new Float32Array(this.getBufferSize());
		this.initializePoints();
		this.startAnimate();
	}

	private getBufferSize() {
		const pointCount = Math.ceil(this.el.width / this.GAP) * Math.ceil(this.el.height / this.GAP);
		return (pointCount * this.POINT_DATA_SIZE);
	}

	private initializePoints() {
		let index = 0;
		for (const point of generatePoints(this.el.width, this.el.height, this.GAP)) {
			const bufferIndex = index * this.POINT_DATA_SIZE;
			this.pointsBuffer[bufferIndex] = point.x;
			this.pointsBuffer[bufferIndex + 1] = point.y;
			index++;
		}
	}

	private shouldUpdate() {
		return performance.now() - this.timeStamp > (1000 / this.FPS)
	}

	getForceOnPoint({ x, y }: Point) {
		const date = +new Date() / (this.SCALE * 10);
		return perlin3(x / this.SCALE, y / this.SCALE, date) * Math.PI;
	}

	getLengthOnPoint({ x, y }: Point) {
		return (perlin3(x / this.SCALE, y / this.SCALE, 1)) * this.LENGTH;
	}

	nextPoint(p: Point) {
		const force = this.getForceOnPoint(p)
		const opacity = Math.abs(Math.cos(force)) * 0.3 + 0.1
		const length = this.getLengthOnPoint(p)
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
	}

	dot() {
		this.ctx.clearRect(0, 0, this.el.width, this.el.height);
		for (let index = 0; index < this.pointsBuffer.length; index += this.POINT_DATA_SIZE) {
			this.drawDot({
				x: this.pointsBuffer[index],
				y: this.pointsBuffer[index + 1],
			}
			)
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