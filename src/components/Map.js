import React, { Component }  from "react";
import GoogleMapReact from 'google-map-react';

class Map extends Component {

    _onChildMouseEnter = (key, childProps) => {
      if (this.props.onEstabHover) {
        this.props.onEstabHover(key);
      }
    }

    _onChildMouseLeave = (key, childProps) => {
      if (this.props.onEstabHoverLeave) {
        this.props.onEstabHoverLeave(key);
      }
    }

    _onChildClick = (key, childProps) => {
      if (this.props.onselectEstab) {
        this.props.onselectEstab(key);
      }
    }

    render() {
      const MarkerComponent = () => <div className="marker"></div>;

      const defaultProps = {
        center: {
          lat: -30.056931,
          lng: -51.1986701
        },
        zoom: 13
      }

      const {stabs} = this.props

      let markers = stabs && stabs.map(stab =>
        <MarkerComponent
          key={stab.nome}
          lat={parseFloat(stab.latitude)}
          lng={parseFloat(stab.longitude)}
          text={stab.nome}
        />
      )

      return (
        <div style={{ height: '88vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
          >
            {markers}
          </GoogleMapReact>
        </div>
      )
    }
  }

export default Map