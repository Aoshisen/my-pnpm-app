import { CursorState } from "ahooks/lib/useMouse";

interface ICanvas {
	width: number;
	height: number;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	clearCanvas(): void;
}

abstract class BaseCanvas implements ICanvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;

	constructor(public width: number, public height: number) {
		this.canvas = this.createCanvas(width, height);
		const context = this.canvas.getContext("2d");
		if (!context) throw new Error("Could not get 2D context");
		this.ctx = context;
	}

	private createCanvas(width: number, height: number): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	public clearCanvas(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}

interface ILine {
	x: number;
	y: number;
	update(theta: number, distanceSq: number): void;
}

class Line implements ILine {
	private readonly LINE_WIDTH = 2.5;
	private readonly LINE_LENGTH = 15;
	private readonly MAX_DISTANCE_SQ = 80 * 80; // 预计算平方值
	private readonly MIN_DISTANCE_SQ = 40 * 40; // 预计算平方值

	constructor(
		public x: number,
		public y: number,
		private ctx: CanvasRenderingContext2D
	) { }

	public update(theta: number, distanceSq: number): void {
		this.draw(theta, this.getColor(distanceSq));
	}

	private draw(theta: number, color: string): void {
		this.ctx.save(); // 保存状态
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);

		const endX = this.x + Math.cos(theta) * this.LINE_LENGTH;
		const endY = this.y + Math.sin(theta) * this.LINE_LENGTH;

		this.ctx.lineTo(endX, endY);
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = this.LINE_WIDTH;
		this.ctx.stroke();
		this.ctx.restore(); // 恢复状态
	}

	private getColor(distanceSq: number): string {
		if (distanceSq > this.MAX_DISTANCE_SQ) {
			return "rgb(229,231,235)";
		}
		if (distanceSq > this.MIN_DISTANCE_SQ) {
			return "rgba(229,231,235,0.5)";
		}
		return "white";
	}
}

export class Lines extends BaseCanvas {
	private readonly GAP = 20;
	private lines: Line[] = [];
	private lastCursorPos = { x: 0, y: 0 };
	constructor(width: number, height: number) {
		super(width, height);

		this.lines = this.generateLines();
	}

	private generateLines(): Line[] {
		const lines: Line[] = [];
		for (let x = this.GAP; x < this.width; x += this.GAP) {
			for (let y = this.GAP; y < this.height; y += this.GAP) {
				lines.push(new Line(x, y, this.ctx));
			}
		}
		return lines;
	}


	public update(cursorState: CursorState): void {
		if (this.lines.length === 0) return;

		const rect = this.canvas.getBoundingClientRect();
		const cursorX = isNaN(cursorState.clientX) ? this.lastCursorPos.x : cursorState.clientX;
		const cursorY = isNaN(cursorState.clientY) ? this.lastCursorPos.y : cursorState.clientY;
		this.lastCursorPos = { x: cursorX, y: cursorY };

		// 批量绘制所有线条
		this.ctx.save();
		this.ctx.beginPath();
		this.clearCanvas()
		for (const line of this.lines) {
			const relativeX = cursorX - (line.x + rect.x);
			const relativeY = cursorY - (line.y + rect.y);

			const theta = Math.atan2(relativeY, relativeX);
			const distanceSq = relativeX * relativeX + relativeY * relativeY;

			line.update(theta, distanceSq);
		}

		this.ctx.restore();
	}
}