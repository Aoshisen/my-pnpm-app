import { Routes, Route } from 'react-router';
import routes from "./constant/routes"
const App = () => {
  return (
    <Routes>
      {
        routes.map((route) => {
          return <Route {...route} />
        })
      }
    </Routes>
  );
};

export default App;