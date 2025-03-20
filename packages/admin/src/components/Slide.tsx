import React, { FC, useMemo, useState, useCallback, useRef } from "react";
import { useBoolean, useEventListener } from "ahooks";

type SlideProps = {
	value: number;
	max?: number;
	color?: string;
	height?: string;
};

export const Slide: FC<SlideProps> = ({
	value,
	max = 100,
	color = "#4CAF50",
	height = "8px",
}) => {
	const slideRef = useRef<HTMLDivElement>(null)
	const [isDragging, { setTrue: startDragging, setFalse: stopDragging }] =
		useBoolean(false);
	const [currentValue, setCurrentValue] = useState(value);

	const percentage = useMemo(() => {
		return Math.round((currentValue / max) * 100);
	}, [currentValue, max]);

	const updateProgress = useCallback(
		(event: MouseEvent) => {
			if (!slideRef.current) return;
			const { left, width } = slideRef.current.getBoundingClientRect()
			const x = Math.max(0, Math.min(event.clientX - left, width));
			const newValue = Math.round((x / width) * max);
			setCurrentValue(newValue);
		},
		[max]
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isDragging) {
				return;
			}
			updateProgress(event);
		},
		[isDragging, updateProgress]
	);

	const handleMouseUp = useCallback(() => {
		stopDragging();
	}, [stopDragging]);

	useEventListener("mousemove", handleMouseMove);
	useEventListener("mouseup", handleMouseUp);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		startDragging();
		updateProgress(event.nativeEvent);
	};

	return (
		<div
			data-name="slide"
			ref={slideRef}
			onMouseDown={handleMouseDown}
			style={{ height }}
			className="relative w-full bg-[#e0e0e0] rounded cursor-pointer"
		>
			<div className="h-full w-full rounded overflow-hidden">
				<div
					className="h-full"
					style={{ width: `${percentage}%`, background: color }}
				/>
			</div>
			<div
				className="absolute top-1/2 w-4 h-4 bg-white rounded-full border-2 border-current cursor-grab active:cursor-grabbing"
				style={{
					left: `${percentage}%`,
					transform: `translate(-${percentage}%, -50%)`,
				}}
			/>
		</div>
	);
};

