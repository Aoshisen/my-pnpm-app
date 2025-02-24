import Layout from "./components/Layout";

function App() {
  return (
    <Layout
      side={<>this is side</>}
      header={<>this is header</>}
    >
      <iframe src="http://localhost:3000/"></iframe>
    </Layout>
  )
}

export default App
