import { useRef } from "react";
import { CommonWrapper, Header, Iframe } from "./components";
import Layout from "./components/Layout/Layout";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";
import { useScale } from "./hooks/useScale";

function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const scale = useScale({
    containerRef: parentRef,
    contentRef: childrenRef,
    horizontal: 40,
    vertical: 40
  });

  return (
    <Layout
      header={<Header />}
      side={<>111</>}
    >
      <PreviewWrapper ref={parentRef}>
        <CommonWrapper ref={childrenRef} scale={scale}>
          <Iframe />
        </CommonWrapper>
      </PreviewWrapper>
    </Layout>
  );
}

export default App
