import React from 'react';
import Wallet from './components/Wallet';
import 'semantic-ui-css/semantic.min.css'
import { Route, Switch, HashRouter } from 'react-router-dom';
import Auth from './components/Auth';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact component={Auth} path='/auth'></Route>
        <Route exact component={Wallet} path='/'></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
