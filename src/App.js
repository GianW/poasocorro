import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import EstabList from './components/EstabList.js';
import Estabs from './data/estabs.json'

class App extends Component {

  state = {
    Estabs: Estabs
  }

  updateEstabs = () => {
    this.setState({Estabs: Estabs.filter(est => est.tipo === "Hospital")})
  }

  componentDidMount() {
    this.updateEstabs()
  }

  render() {

    const { Estabs } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <p>POA SOCORRO</p>
          <span>
            <input type="text" placeholder="Pesquisar"/>
          </span>
        </header>
        <section>
          <div className="detail">
            <EstabList stabs={Estabs} />
          </div>
          <div className="map">
            <Map stabs={Estabs}/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
