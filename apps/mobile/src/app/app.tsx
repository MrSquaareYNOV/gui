import './app.module.scss';

import { Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

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
