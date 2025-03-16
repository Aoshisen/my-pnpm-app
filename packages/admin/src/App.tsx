import { Routes, Route, RouteProps } from 'react-router';

import { Home, Test, Sky, Image } from "./pages";

const routes: RouteProps[] = [{
  path: "/",
  element: <Home />
}, {
  path: "/test",
  element: <Test />
},
{
  path: "/sky",
  element: <Sky />
},

{
  path: "/image",
  element: <Image />
}
]

const App = () => {
  return <Routes>
    {
      routes.map(route => <Route {...route} key={route.path} />)
    }
  </Routes>
}

export default App;