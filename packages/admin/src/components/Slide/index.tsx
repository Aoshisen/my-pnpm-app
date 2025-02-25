import React, { FC, useMemo, useState, useCallback, useRef } from "react";
import { useBoolean, useEventListener, useMount } from "ahooks";
import useBox from "../../hooks/useBox";

type SlideProps = {
	value: number;
	max?: number;
	color?: string;
	height?: string;
};

const Slide: FC<SlideProps> = ({
	value,
	max = 100,
	color = "#4CAF50",
	height = "8px",
}) => {
	const slideRef = useRef<HTMLDivElement>(null)
	const rect = useBox(slideRef.current)
	const [isDragging, { setTrue: startDragging, setFalse: stopDragging }] =
		useBoolean(false);
	const [currentValue, setCurrentValue] = useState(value);

	const percentage = useMemo(() => {
		return Math.round((currentValue / max) * 100);
	}, [currentValue, max]);

	const updateProgress = useCallback(
		(event: MouseEvent) => {
			if (!rect) return;
			const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
			const newValue = Math.round((x / rect.width) * max);
			setCurrentValue(newValue);
		},
		[rect, max]
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (isDragging) {
				updateProgress(event);
			}
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
	const [show, setShow] = useState(false)
	useMount(() => {
		setTimeout(() => { setShow(true) }, 2000)
	})
	if (!show) {
		return <>1111</>
	}


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

export default Slide;
