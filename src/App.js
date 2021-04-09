import SubNavbar from './components/SubNavbar'
import FoodItems from './components/FoodItems'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import  React from 'react';
import { useHistory } from 'react-router';

function App() {
  const history = useHistory()
    if (!localStorage.getItem('token')) 
    history.push('/')

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
      <SubNavbar />
      <FoodItems />
    </div>
  );
}

export default App;
