import useFishStore from "./store/fish";
import { useFetchData } from "./hooks/fetch";
import useLocalData from "./store/local";
import { useEffect } from "react";

function App() {
  const { isPending, error, data, isFetching } = useFetchData()
  const { fishes, addAFish } = useFishStore()
  const { setLocalData } = useLocalData()

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data])

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <p>fishes:{fishes}</p>
      <button onClick={addAFish}>addFish</button>
    </div>
  )
}

export default App
