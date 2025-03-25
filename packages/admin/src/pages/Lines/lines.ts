import { CursorState } from "ahooks/lib/useMouse";

class Canvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;

	constructor(public width: number, public height: number) {
		this.canvas = this.createCanvas(width, height);
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
		super(width, height);
		this.lines = this.generate_lines();
	}

	generate_lines() {
		const lines = [];
		for (const line of this.generate_line()) {
			lines.push(line);
		}
		return lines;
	}

	*generate_line() {
		for (let x = this.GAP; x < this.width; x += this.GAP) {
			for (let y = this.GAP; y < this.height; y += this.GAP) { // Fix width to height here
				const lineInstance = new Line(x, y, this.GAP, this.ctx);
				yield lineInstance;
			}
		}
	}

	update(cursorState: CursorState) {
		if (!this.lines) {
			return;
		}
		this.clearCanvas();
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			const rect = this.canvas.getBoundingClientRect();
			const Y = (isNaN(cursorState.clientY) ? 0 : cursorState.clientY) - (line.y + rect.y);
			const X = (isNaN(cursorState.clientX) ? 0 : cursorState.clientX) - (line.x + rect.x);
			const theta = Math.atan2(Y, X)
			const distance = Math.sqrt(Math.pow(Y, 2) + Math.pow(X, 2))
			line.update(theta, distance);
		}
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}

export class Line {
	LINE_WIDTH = 2;
	LINE_LENGTH = 15;
	MAX_DISTANCE = 80;
	MIN_DISTANCE = 40;

	constructor(
		public x: number, public y: number,
		public GAP: number, public ctx: CanvasRenderingContext2D
	) { }

	draw(theta: number, color: string) {
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		const X = Math.cos(theta) * this.LINE_LENGTH;
		const Y = Math.sin(theta) * this.LINE_LENGTH;
		this.ctx.lineTo(this.x + X, this.y + Y);
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = this.LINE_WIDTH;
		this.ctx.stroke();
	}
	getColor(distance: number) {
		if (distance > this.MAX_DISTANCE) {
			return "rgb(229,231,235)"
		}
		if (distance > this.MIN_DISTANCE) {
			return "rgb(229,231,235,0.5)"
		}
		return "white"
	}

	update(theta: number, distance: number) {
		this.draw(theta, this.getColor(distance));
	}
}