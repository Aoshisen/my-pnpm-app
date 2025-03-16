import { randomUniform, color as d3Color, RGBColor } from "d3";
interface Point {
	x: number;
	y: number;
	color: RGBColor;
	radius: number;
	offsetX: number;
	offsetY: number;
}


function getGrayScaledRadius(color: RGBColor, GAP: number) {
	const grayScale = gray(color) / 255;
	const radius = GAP / 2 * (1 - grayScale);
	return radius;
}


function gray(color: RGBColor) {
	return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
}

export class Image {
	private readonly GAP: number = 3;
	private imageData: ImageData;
	canvas: HTMLCanvasElement;
	points: Point[]
	ctx: CanvasRenderingContext2D;
	constructor(public img: HTMLImageElement) {
		this.canvas = this.getCanvas(this.img);
		this.ctx = this.canvas.getContext("2d")!;
		this.imageData = this.getImageData(this.canvas, this.img)
		this.points = this.getRenderPoint(this.imageData)
		this.run()
	}
	getCanvas(image: HTMLImageElement) {
		const canvas = document.createElement("canvas");
		canvas.width = +image.width;
		canvas.height = +image.height;
		return canvas;
	}
	getImageData(canvas: HTMLCanvasElement, image: HTMLImageElement) {
		this.ctx!.drawImage(image, 0, 0);
		const data = this.ctx!.getImageData(0, 0, canvas.width, canvas.height);
		this.ctx.clearRect(0, 0, canvas.width, canvas.height)
		return data;
	}
	getRenderPoint(data: ImageData) {
		const _points: Point[] = [];
		const { width, height } = data;

		for (let y = 0; y < height; y += this.GAP) {
			for (let x = 0; x < width; x += this.GAP) {
				const index = (y * width + x) * 4; // 每个像素占4个值 (RGBA)
				const r = data.data[index];
				const g = data.data[index + 1];
				const b = data.data[index + 2];
				const a = data.data[index + 3];
				const color = d3Color(`rgba(${r},${g},${b},${a})`) as RGBColor;
				const radius = getGrayScaledRadius(color, this.GAP);
				const offsetX = randomUniform(0, 6)();
				const offsetY = randomUniform(0, 6)();
				_points.push({ x, y, color, radius, offsetX, offsetY });
			}
		}
		return _points

	}

	drawPoint(point: Point) {
		this.ctx.fillStyle = point.color.toString();
		this.ctx.beginPath();
		this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
		this.ctx.fill();
	}
	drawPoints(points: Point[]) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		points.forEach(point => this.drawPoint(point))
	}
	getNextPoint(point: Point, step: number) {
		return {
			...point,
			x: point.x + point.offsetX * step,
			y: point.y + point.offsetY * step
		};
	}
	run(step = 0) {
		const currentPoints = this.points.map((point) => this.getNextPoint(point, step));
		this.drawPoints(currentPoints)
	}
}