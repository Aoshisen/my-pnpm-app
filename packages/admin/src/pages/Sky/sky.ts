import { Noise } from "noisejs"
const noise = new Noise(Math.random());
const perlin3 = noise.perlin3.bind(noise);
type Point = { x: number, y: number }
export class Sky {
	readonly GAP = 20;
	readonly RADIUS = 1.5;
	readonly SCALE = 250;
	readonly LENGTH = 10;
	ctx: CanvasRenderingContext2D;
	dots: Map<string, Point> = new Map();
	private pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 2;
	constructor(private el: HTMLCanvasElement) {
		this.ctx = this.el.getContext("2d")!;
		const pointCount = Math.ceil(this.el.width / this.GAP) * Math.ceil(this.el.height / this.GAP);
		this.pointsBuffer = new Float32Array(pointCount * this.POINT_DATA_SIZE);
		this.initializePoints();
		this.startAnimate();
	}

	private initializePoints() {
		let index = 0;
		for (let x = 4; x < this.el.width; x += this.GAP) {
			for (let y = 4; y < this.el.height; y += this.GAP) {
				const bufferIndex = index * this.POINT_DATA_SIZE;
				this.pointsBuffer[bufferIndex] = x;
				this.pointsBuffer[bufferIndex + 1] = y;
				index++;
			}
		}
	}
	getForceOnPoint({ x, y }: Point) {
		//-180 度 180度
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

	startAnimate() {
		this.dot();
		requestAnimationFrame(() => this.startAnimate());
	}
}