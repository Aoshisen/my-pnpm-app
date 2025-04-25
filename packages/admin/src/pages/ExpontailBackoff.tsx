import { BaseWrapper, Button } from "../components";
import { useState, useRef, useEffect } from "react";

interface IExponentialBackoffOptions {
	initialDelay?: number;
	maxDelay?: number;
	factor?: number;
	jitter?: boolean;
}

class ExponentialBackoffClass {
	private initialDelay: number;
	private maxDelay: number;
	private factor: number;
	private jitter: boolean;
	private currentDelay: number;
	private attempts: number;

	constructor(options: IExponentialBackoffOptions = {}) {
		this.initialDelay = options.initialDelay || 1000;
		this.maxDelay = options.maxDelay || 30000;
		this.factor = options.factor || 2;
		this.jitter = options.jitter ?? true;
		this.currentDelay = this.initialDelay;
		this.attempts = 0;
	}
	public getJitter(delay: number) {
		return Math.random() * 0.1 * delay * (Math.random() > 0.5 ? 1 : -1);
	}

	public next(): number {
		const delay = this.currentDelay;
		this.attempts++;
		// Calculate next delay with exponential backoff
		this.currentDelay = Math.min(
			this.initialDelay * Math.pow(this.factor, this.attempts),
			this.maxDelay
		);

		// Add jitter if enabled
		if (this.jitter) {
			return delay + this.getJitter(delay);
		}

		return delay;
	}

	public reset(): void {
		this.currentDelay = this.initialDelay;
		this.attempts = 0;
	}

	public getAttempts(): number {
		return this.attempts;
	}
}

export const ExponentialBackoff = () => {
	const [count, setCount] = useState(0);
	const [delay, setDelay] = useState(0);
	const backoff = useRef(new ExponentialBackoffClass());
	const maxRetryTime = 5;

	useEffect(() => {
		if (backoff.current.getAttempts() >= maxRetryTime) {
			return;
		}
		const timer = setTimeout(() => {
			const nextDelay = backoff.current.next();
			setDelay(nextDelay);
			setCount(prev => prev + 1);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	function handleClick() {
		backoff.current.reset()
	}

	return (
		<BaseWrapper>
			<div className="w-full h-full flex flex-justify-center flex-items-center">
				<div className="h-[200px] w-[200px] text-center">
					<h2>指数退避累加示例</h2>
					<p>当前计数: {count}</p>
					<p>当前延迟时间: {delay.toFixed(2)}ms</p>
					<p>尝试次数: {backoff.current.getAttempts()}</p>
					<Button onClick={handleClick}>重置</Button>
				</div>
			</div>
		</BaseWrapper>
	);
};

