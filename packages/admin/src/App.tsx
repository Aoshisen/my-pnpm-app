import { useRef } from "react";
import { CommonWrapper, Header, Iframe } from "./components";
import Layout from "./components/Layout/Layout";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";
import { useSize } from "ahooks";
import { useScale } from "./hooks/useScale";

function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const parentSize = useSize(parentRef);
  const childSize = useSize(childrenRef);
  const scale = useScale({
    containerSize: parentSize,
    contentSize: childSize,
    horizontal: 40,
    vertical: 40
  })
  return (
    <Layout
      header={<Header></Header>}
      side={<>111</>}
    >
      <PreviewWrapper ref={parentRef!}>
        <CommonWrapper ref={childrenRef!} scale={scale}>
          <Iframe />
        </CommonWrapper>
      </PreviewWrapper>
    </Layout>
  )
}

export default App
