import './app.module.scss';

import { Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

export function App() {
  return (
    <>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
}

export default App;
