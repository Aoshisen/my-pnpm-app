import { useRef } from "react";
import { CommonWrapper, Header, Iframe, PreviewWrapper, Layout as LayoutWrapper } from "../components";
import { useScale } from "../hooks/useScale";

export const Layout=()=> {
	const parentRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const scale = useScale({
		containerRef: parentRef,
		contentRef: childrenRef,
		horizontal: 40,
		vertical: 40
	});

	return (
		<LayoutWrapper
			header={<Header />}
			side={<>side</>}
		>
			<PreviewWrapper ref={parentRef}>
				<CommonWrapper ref={childrenRef} scale={scale}>
					<Iframe />
				</CommonWrapper>
			</PreviewWrapper>
		</LayoutWrapper>
	);
}
