import Layout from "./components/Layout";

function App() {
  return (
    <Layout
      side={<div className="w-full h-full p-2 overflow-y-auto">
        this is side
      </div>}
      header={<div>this is header</div>}
    >
      <iframe src="http://localhost:3000/"></iframe>
    </Layout>
  )
}

export default App
