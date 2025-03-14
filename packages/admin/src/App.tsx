import { Routes, Route, RouteProps } from 'react-router';

import { Home, Test } from "./pages";

const routes: RouteProps[] = [{
  path: "/",
  element: <Home />
}, {
  path: "/test",
  element: <Test />
}]

const App = () => {
  return <Routes>
    {
      routes.map(route => <Route {...route} key={route.path} />)
    }
  </Routes>
}

export default App;