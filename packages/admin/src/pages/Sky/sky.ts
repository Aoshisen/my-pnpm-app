import { Noise } from "noisejs"
const noise = new Noise(Math.random());
const perlin3 = noise.perlin3.bind(noise);
import { ceil } from "lodash-es";
type Point = { x: number, y: number }

export class Sky {
	private readonly GAP = 20;
	private readonly RADIUS = 1.5;
	private readonly SCALE = 200;
	private readonly LENGTH = 10;
	private pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 2;
	private readonly FPS = 30;
	public el: HTMLCanvasElement;
	private timeStamp = performance.now();
	ctx: CanvasRenderingContext2D;

	constructor(public width: number, public height: number) {
		this.el = this.createCanvas(width, height);
		this.ctx = this.el.getContext("2d")!;
		this.pointsBuffer = new Float32Array(this.getBufferSize());
		this.initializePoints();
		this.startAnimate();
	}

	createCanvas(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas
	}

	getBufferSize() {
		const pointCount = ceil(this.el.width / this.GAP) * ceil(this.el.height / this.GAP);
		return (pointCount * this.POINT_DATA_SIZE);
	}

	private getForceOnPoint(p: Point) {
		const date = +new Date() / (this.SCALE * 10);
		return perlin3(p.x / this.SCALE, p.y / this.SCALE, date) * Math.PI;
	}

	private getLengthOnPoint(p: Point) {
		return (perlin3(p.x / this.SCALE, p.y / this.SCALE, 1)) * this.LENGTH;
	}

	private *generatePoints() {
		let currentBufferIndex = 0
		for (let x = 0; x < this.el.width; x += this.GAP) {
			for (let y = 0; y < this.el.height; y += this.GAP) {
				yield { x, y, currentBufferIndex };
				currentBufferIndex++;
			}
		}
	}

	private *generateBuffer(pointsBuffer: Float32Array<ArrayBufferLike>) {
		for (let index = 0; index < pointsBuffer.length; index += this.POINT_DATA_SIZE) {
			yield { x: pointsBuffer[index], y: pointsBuffer[index + 1] }
		}
	}

	initializePoints() {
		for (const { x, y, currentBufferIndex } of this.generatePoints()) {
			const bufferIndex = currentBufferIndex * this.POINT_DATA_SIZE;
			this.pointsBuffer[bufferIndex] = x;
			this.pointsBuffer[bufferIndex + 1] = y;
		}
	}

	shouldUpdate() {
		return performance.now() - this.timeStamp > (1000 / this.FPS)
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
		this.ctx.closePath()
	}

	dot() {
		this.ctx.clearRect(0, 0, this.el.width, this.el.height);
		for (const point of this.generateBuffer(this.pointsBuffer)) {
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