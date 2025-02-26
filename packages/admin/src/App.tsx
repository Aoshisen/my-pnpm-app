import ComputerWrapper from "./components/ComputerWrapper";
import Layout from "./components/Layout";
import PhoneWrapper from "./components/PhoneWrapper";
import PreviewWrapper from "./components/PreviewWrapper";

function App() {
  const mobile = false;
  return (
    <Layout
      header={<div>
      </div>}
      side={<div className="w-full h-full p-2 overflow-y-auto">
      </div>}
    >
      <PreviewWrapper>
        {!mobile ?
          <ComputerWrapper><iframe src="http://localhost:3000/" /></ComputerWrapper> :
          <PhoneWrapper><iframe src="http://localhost:3000/" /></PhoneWrapper>
        }
      </PreviewWrapper>
    </Layout>
  )
}

export default App
