import ComputerWrapper from "./components/ComputerWrapper/ComputerWrapper";
import { Header } from "./components";
import Layout from "./components/Layout/Layout";
import PhoneWrapper from "./components/PhoneWrapper/PhoneWrapper";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";

function App() {
  const mobile = false;
  return (
    <Layout
      header={<Header></Header>}
      side={<>111</>}
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
