import { useEffect, useState, RefObject } from 'react';
import { useSize } from 'ahooks';

interface ScaleOptions {
	containerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
	horizontal?: number;
	vertical?: number;
}

export const useScale = ({
	containerRef,
	contentRef,
	horizontal = 0,
	vertical = 0,
}: ScaleOptions) => {
	const [scale, setScale] = useState(1);
	const containerSize = useSize(containerRef);
	const contentSize = useSize(contentRef);

	useEffect(() => {
		if (!containerSize || !contentSize) return;
		const scaleX = containerSize.width / (contentSize.width + (horizontal * 2));
		const scaleY = containerSize.height / (contentSize.height + (vertical * 2));
		const newScale = Math.min(scaleX, scaleY, 1);
		setScale(newScale);
	}, [containerSize, contentSize, horizontal, vertical]);

	return scale;
};