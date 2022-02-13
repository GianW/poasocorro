import React, { Component } from 'react';
import ReactGA from 'react-ga';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import './App.css';
import Map from './components/Map.js';
import EstabList from './components/EstabList.js';
import EstabDetail from './components/EstabDetail.js';
import Estabs from './data/estabs.json'
import Espec from './data/espec.json'

class App extends Component {

  state = {
    Estabs: Estabs,
    Detail: null
  }

  updateEstabs = () => {
    this.setState({Estabs: Estabs.filter(est => est.tipo === "Hospital")})
  }

  estabHover = (nome) =>{
    this.setState({Estabs: this.state.Estabs.map(est =>{
      if(est.nome === nome){
        est.mouseHover = "mouseEnter card";
      }
      return est;
    })})
  }

  estabHoverLeave = (nome) =>{
    this.setState({Estabs: this.state.Estabs.map(est =>{
      if(est.nome === nome){
        delete est.mouseHover;
      }
      return est;
    })})
  }

  selectEstab = (nome) =>{
    this.setState({Detail: this.state.Estabs.filter(est => est.nome === nome)})
    this.setState({Estabs: this.state.Estabs.filter(est => est.nome === nome)})
  }

  desElectEstab = () =>{
    this.setState({Detail: null})
    this.setState({Estabs: Estabs.filter(est => est.tipo === "Hospital")});
  }

  componentDidMount() {
    this.updateEstabs()
  }
  render() {
    ReactGA.initialize('UA-57710189-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    const { Estabs, Detail } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <p>POA SOCORRO</p>
          <span>
            <TextInput
              className="textoPesquisa"
              options={Espec}
              Component="input"
              placeholder="Pesquisar"
              trigger=""
            />
          </span>
        </header>
        <section>
          <div className="detail">
            {
              (Detail && (<EstabDetail
                            stab={Detail[0]}
                            onDesElectEstab={this.desElectEstab}
              />))
               ||
              (<EstabList
                stabs={Estabs}
                onselectEstab={this.selectEstab}
              />)
            }
          </div>
          <div className="map">
            <Map
              stabs={Estabs}
              onEstabHover={this.estabHover}
              onEstabHoverLeave={this.estabHoverLeave}
              onselectEstab={this.selectEstab}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
