type ColorBuffer = [number, number, number, number];
type PointBuffer = {
	x: number;
	y: number;
	r: number;
	g: number;
	b: number;
	a: number;
	radius: number;
	offsetX: number;
	offsetY: number;
}

function getGrayScaledRadius(color: ColorBuffer, GAP: number) {
	const grayScale = gray(color) / 255;
	const radius = GAP / 2 * (1 - grayScale);
	return radius;
}

function gray([r, g, b, _]: ColorBuffer) {
	return 0.299 * r + 0.587 * g + 0.114 * b
}
function* generatePoints(width: number, height: number, gap: number) {
	for (let x = 0; x < width; x += gap) {
		for (let y = 0; y < height; y += gap) {
			yield { x, y };
		}
	}
}

function* generateBuffer(pointsBuffer: Float32Array, size: number, max_range: number) {
	let count = 0
	const shouldYield = () => count <= max_range;
	for (let index = 0; index < pointsBuffer.length; index += size) {
		if (shouldYield()) {
			yield {
				x: pointsBuffer[index],
				y: pointsBuffer[index + 1],
				r: pointsBuffer[index + 2],
				g: pointsBuffer[index + 3],
				b: pointsBuffer[index + 4],
				a: pointsBuffer[index + 5],
				radius: pointsBuffer[index + 6],
				offsetX: pointsBuffer[index + 7],
				offsetY: pointsBuffer[index + 8],
			} as PointBuffer;
			count++
		}
	}
}

export class Image {
	private readonly GAP: number = 3;
	private imageData: ImageData;
	canvas: HTMLCanvasElement;
	pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 9;
	private readonly RANGE = 10;
	private pointsBufferLength: number = -1;
	ctx: CanvasRenderingContext2D;

	constructor(public img: HTMLImageElement) {
		this.canvas = this.getCanvas(this.img);
		this.ctx = this.canvas.getContext("2d")!;
		this.imageData = this.getImageData(this.canvas, this.img);
		this.pointsBuffer = new Float32Array(this.getBufferSize());
		this.initializePoints();
		this.run();
	}

	getBufferSize() {
		const pointCount = Math.ceil(this.canvas.width / this.GAP) * Math.ceil(this.canvas.height / this.GAP);
		return pointCount * this.POINT_DATA_SIZE;
	}

	initializePoints() {
		const { width, height } = this.imageData;
		let index = 0
		for (const { x, y } of generatePoints(width, height, this.GAP)) {
			const dataIndex = (y * width + x) * 4;
			const r = this.imageData.data[dataIndex];
			const g = this.imageData.data[dataIndex + 1];
			const b = this.imageData.data[dataIndex + 2];
			const a = this.imageData.data[dataIndex + 3];
			const color = [r, g, b, a] as ColorBuffer;
			if (this.isWhite(color)) {
				continue;
			}
			const radius = getGrayScaledRadius(color, this.GAP);
			const offsetX = Math.random() * this.RANGE;
			const offsetY = Math.random() * this.RANGE;
			const bufferIndex = index * this.POINT_DATA_SIZE;
			this.pointsBuffer.set([x, y, ...color, radius, offsetX, offsetY], bufferIndex);
			index++;
		}
		this.pointsBufferLength = index;
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
	isWhite([r, g, b, _]: ColorBuffer) {
		return r === 255 && g === 255 && b === 255
	}

	drawPoint(point: PointBuffer, step: number) {
		const { x, y, r, g, b, a, radius, offsetX, offsetY } = point;
		this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
		this.ctx.beginPath();
		this.ctx.arc(x + offsetX * step, y + offsetY * step, radius, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	drawPoints(step = 0) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (const point of generateBuffer(this.pointsBuffer, this.POINT_DATA_SIZE, this.pointsBufferLength)) {
			this.drawPoint(point, step);
		}
	}
	run(step = 0) {
		this.drawPoints(step);
	}
}