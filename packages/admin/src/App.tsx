import { Routes, Route, RouteProps } from 'react-router';

import { Home } from "./pages";

const routes: RouteProps[] = [{
  path: "/",
  element: <Home />
}]

const App = () => {
  return <Routes>
    {
      routes.map(route => <Route {...route} key={route.path} />)
    }
  </Routes>
}

export default App;