type ColorBuffer = [r: number, g: number, b: number, a: number];
type PointBuffer = [
	x: number,
	y: number,
	r: number,
	g: number,
	b: number,
	a: number,
	radius: number,
	offsetX: number,
	offsetY: number,
]

//灰度算法 求出颜色值的加权平均数
function gray([r, g, b]: ColorBuffer) {
	return 0.299 * r + 0.587 * g + 0.114 * b
}

export class Image {
	private readonly GAP: number = 3;
	private imageData: ImageData;
	canvas: HTMLCanvasElement;
	pointsBuffer: Float32Array;
	private readonly POINT_DATA_SIZE = 9;
	private readonly RANGE = 10;
	private readonly COLOR_DATA_SIZE = 4
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

	private getGrayScaledRadius(color: ColorBuffer) {
		const grayScale = gray(color) / 255;
		const radius = this.GAP / 2 * (1 - grayScale);
		return radius;
	}

	private getBufferSize() {
		const pointCount = Math.ceil(this.canvas.width / this.GAP) * Math.ceil(this.canvas.height / this.GAP);
		return pointCount * this.POINT_DATA_SIZE;
	}

	private *generatePoints(width: number, height: number) {
		for (let x = 0; x < width; x += this.GAP) {
			for (let y = 0; y < height; y += this.GAP) {
				yield { x, y };
			}
		}
	}

	private *generateBuffer(pointsBuffer: Float32Array, max_range: number) {
		let count = 0
		const shouldYield = () => count <= max_range;
		for (let index = 0; index < pointsBuffer.length; index += this.POINT_DATA_SIZE) {
			if (shouldYield()) {
				yield [
					pointsBuffer[index],
					pointsBuffer[index + 1],
					pointsBuffer[index + 2],
					pointsBuffer[index + 3],
					pointsBuffer[index + 4],
					pointsBuffer[index + 5],
					pointsBuffer[index + 6],
					pointsBuffer[index + 7],
					pointsBuffer[index + 8],
				] as PointBuffer
				count++
			}
		}
	}

	private initializePoints() {
		const { width, height } = this.imageData;
		let index = 0
		for (const { x, y } of this.generatePoints(width, height)) {
			const dataIndex = (y * width + x) * this.COLOR_DATA_SIZE;
			const color = [
				this.imageData.data[dataIndex],
				this.imageData.data[dataIndex + 1],
				this.imageData.data[dataIndex + 2],
				this.imageData.data[dataIndex + 3]
			] as ColorBuffer;

			if (this.isWhite(color)) {
				continue;
			}
			const radius = this.getGrayScaledRadius(color);
			const offsetX = Math.random() * this.RANGE;
			const offsetY = Math.random() * this.RANGE;
			const bufferIndex = index * this.POINT_DATA_SIZE;
			this.pointsBuffer.set([x, y, ...color, radius, offsetX, offsetY], bufferIndex);
			index++;
		}
		this.pointsBufferLength = index;
	}

	private getCanvas(image: HTMLImageElement) {
		const canvas = document.createElement("canvas");
		canvas.width = +image.width;
		canvas.height = +image.height;
		return canvas;
	}

	private getImageData(canvas: HTMLCanvasElement, image: HTMLImageElement) {
		this.ctx!.drawImage(image, 0, 0);
		const data = this.ctx!.getImageData(0, 0, canvas.width, canvas.height);
		this.ctx.clearRect(0, 0, canvas.width, canvas.height)
		return data;
	}

	private isWhite([r, g, b]: ColorBuffer) {
		return r === 255 && g === 255 && b === 255
	}

	private drawPoint(point: PointBuffer, step: number) {
		const [x, y, r, g, b, a, radius, offsetX, offsetY] = point;
		this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
		this.ctx.beginPath();
		this.ctx.arc(x + offsetX * step, y + offsetY * step, radius, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	private drawPoints(step = 0) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (const point of this.generateBuffer(this.pointsBuffer, this.pointsBufferLength)) {
			this.drawPoint(point, step);
		}
	}

	run(step = 0) {
		this.drawPoints(step);
	}
}