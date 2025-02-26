import ComputerWrapper from "./components/ComputerWrapper";
import Layout from "./components/Layout";
import PhoneWrapper from "./components/PhoneWrapper";
import PreviewWrapper from "./components/PreviewWrapper";

function App() {
  return (
    <Layout
      side={<div className="w-full h-full p-2 overflow-y-auto">
        this is side
      </div>}
      header={<div>this is header</div>}
    >
      <PreviewWrapper>
        <ComputerWrapper><iframe src="http://localhost:3000/" /></ComputerWrapper>
        <PhoneWrapper><iframe src="http://localhost:3000/" /></PhoneWrapper>
      </PreviewWrapper>
    </Layout>
  )
}

export default App
