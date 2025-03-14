import { CommonWrapper, Header, Iframe } from "./components";
import Layout from "./components/Layout/Layout";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";

function App() {
  return (
    <Layout
      header={<Header></Header>}
      side={<>111</>}
    >
      <PreviewWrapper>
        <CommonWrapper>
          <Iframe />
        </CommonWrapper>
      </PreviewWrapper>
    </Layout>
  )
}

export default App
