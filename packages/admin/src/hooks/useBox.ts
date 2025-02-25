import { useEventListener } from 'ahooks';
import { useState, useEffect } from 'react';

interface Box {
	width: number;
	height: number;
	top: number;
	left: number;
	right: number;
	bottom: number;
}

const useBox = (el: HTMLElement | null): Box => {
	const [box, setBox] = useState<Box>({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	});

	const updateBox = () => {
		if (el) {
			const rect = el.getBoundingClientRect();
			setBox(rect)
		}
	};

	useEventListener("resize", updateBox)

	useEffect(updateBox, [el])

	return box;
};

export default useBox;