import { useEffect, useState } from 'react';

type Size = {
	width: number;
	height: number;
} | undefined;

interface ScaleOptions {
	containerSize: Size;
	contentSize: Size;
	horizontal?: number;
	vertical?: number;
}

export const useScale = ({
	containerSize,
	contentSize,
	horizontal = 0,
	vertical = 0,
}: ScaleOptions) => {
	const [scale, setScale] = useState(1);

	useEffect(() => {
		if (!containerSize || !contentSize) return;
		const scaleX = containerSize.width / (contentSize.width + (horizontal * 2));
		const scaleY = containerSize.height / (contentSize.height + (vertical * 2));
		const newScale = Math.min(scaleX, scaleY);
		setScale(newScale);
	}, [containerSize, contentSize, horizontal, vertical]);

	return scale;
};