import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import Building from '../buildings/Building'
import Buildings from '../buildings/Buildings'

const App = () => (
  <MuiThemeProvider>
    <div>
      <header>
        <Menu />
      </header>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/buildings/:id" component={Building} />
        <Route exact path="/buildings" component={Buildings} />
      </main>
    </div>
  </MuiThemeProvider>
)

export default App