import SubNavbar from './components/SubNavbar'
import FoodItems from './components/FoodItems'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import React from 'react';
import { useHistory } from 'react-router';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import Home from './components/Home'


function App() {

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="*">
            Not Found
    </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
