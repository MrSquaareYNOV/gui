import './app.module.scss';

import { Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';

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
