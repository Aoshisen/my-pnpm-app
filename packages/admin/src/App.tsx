import { Routes, Route } from 'react-router';
import routes from "./constant/routes"
import { Home } from './pages/Home.tsx';
const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      {routes.map((route, index) => (
        <Route {...route} key={index} />
      ))}

    </Routes>
  );
};

export default App;