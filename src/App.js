import React, { Component } from 'react';
import logo from './assets/poa_socorro.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo"/>
        </header>
      </div>
    );
  }
}

export default App;
