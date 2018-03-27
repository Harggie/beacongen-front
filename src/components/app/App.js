import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home/Home'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={"Heatmap generator"}
        iconElementRight={
          <Link to="/"><FlatButton label="Home" /></Link>
      }
      />

      <header>
      </header>
      <main>
        <Route exact path="/" component={Home} />
      </main>
    </div>
  </MuiThemeProvider>
)

export default App