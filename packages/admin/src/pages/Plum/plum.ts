import { random } from "lodash-es";
class Point {
	constructor(public x: number, public y: number) {
	}
}

enum Direction {
	LEFT,
	RIGHT,
}

class Branch extends Point {
	length: number;
	private readonly MIN_LENGTH: number = 2;
	private readonly MAX_LENGTH: number = 6;
	private readonly RANDOM_THETA = 0.22;
	constructor(public start: Point, public theta: number) {
		super(start.x, start.y)
		this.length = this.randomLength()
	}

	private randomLength(): number {
		return random(this.MIN_LENGTH, this.MAX_LENGTH);
	}

	//通过左右方向基于当前branch 的终止位置计算下一个branch
	private nextBranch(direction: Direction): Branch {
		const symbol = direction === Direction.LEFT ? -1 : 1;
		const nextTheta = this.theta + (symbol * random(this.RANDOM_THETA));
		return new Branch(this.endPoint, nextTheta);
	}

	//当点branch 的终止位置
	get endPoint() {
		return new Point(
			this.x + Math.cos(this.theta) * this.length,
			this.y + Math.sin(this.theta) * this.length
		)
	}

	//下一个的左值
	get nextLeftBranch() {
		return this.nextBranch(Direction.LEFT)
	}

	//下一个的右值
	get nextRightBranch() {
		return this.nextBranch(Direction.RIGHT)
	}

	get next() {
		return {
			left: this.nextLeftBranch,
			right: this.nextRightBranch,
		}
	}
}

function draw(branch: Branch, ctx: CanvasRenderingContext2D): void {
	ctx.lineWidth = 0.1
	ctx.beginPath();
	ctx.moveTo(branch.x, branch.y);
	ctx.lineTo(branch.endPoint.x, branch.endPoint.y);
	ctx.stroke();
}

export class Plum extends Point {
	private ctx: CanvasRenderingContext2D;
	private frameQueue: (() => void)[] = [];
	private depth: number = 0;
	private readonly MAX_DEPTH = 500;
	private readonly MIN_DEPTH = 5;
	public INIT_THETA = Math.PI / 2;
	canvas: HTMLCanvasElement;
	constructor(public width: number = 0, public height: number = 0, public x: number = 0, public y: number = 0) {
		super(x, y);
		this.canvas = this.createCanvas(width, height);
		this.ctx = this.canvas.getContext("2d")!;
		this.init();
	}

	private createCanvas(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
	private getInitTheta() {
		if (this.y === 0) {
			//上
			return Math.PI / 2
		}

		if (this.x === this.canvas.width) {
			//右
			return Math.PI

		}
		if (this.y === this.canvas.height) {
			//下
			return Math.PI * 3 / 2
		}
		if (this.x === 0) {
			//左
			return 2 * Math.PI
		}
		return this.INIT_THETA;
	}
	private init(): void {
		this.ctx.strokeStyle = "grey";
		this.INIT_THETA = this.getInitTheta()
		const firstPoint = new Point(this.x, this.y);
		const firstBranch: Branch = new Branch(firstPoint, this.INIT_THETA);
		this.step(firstBranch);
		this.startAnimation();
	}
	private startAnimation(): void {
		if (this.shouldYield()) return;
		const currentFrames = [...this.frameQueue];
		this.frameQueue.length = 0;
		currentFrames.forEach(f => f());
		this.depth++;
		requestAnimationFrame(() => this.startAnimation());
	}
	private shouldYield(): boolean {
		return !this.frameQueue.length || this.depth >= this.MAX_DEPTH
	}
	private checkIsRenderBranch() {
		return this.depth < this.MIN_DEPTH || random() < 0.5;
	}
	private step(b: Branch): void {
		if (!this.checkIsRenderBranch()) return;
		draw(b, this.ctx);
		this.frameQueue.push(() => this.step(b.next.left));
		this.frameQueue.push(() => this.step(b.next.right));
	}
	public destroy(): void {
		this.frameQueue.length = 0;
		this.depth = 0;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}