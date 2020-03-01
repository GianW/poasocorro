import React from "react";
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div className="marker"><b>{text}</b></div>;
const AnyReactComponent = () => <div className="marker"></div>;

function Map(props){
// class Map extends Component {

    const defaultProps = {
      center: {
        lat: -30.056931,
        lng: -51.1986701
      },
      zoom: 13
    };

    const {stabs} = props

    let markers = stabs && stabs.map(stab =>
      <AnyReactComponent
        key={stab.nome}
        lat={parseFloat(stab.latitude)}
        lng={parseFloat(stab.longitude)}
        // text={stab.nome}
      />
      );

    return (
        <div style={{ height: '88vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {markers}
            {/* <AnyReactComponent
              lat={-30.0477072}
              lng={-51.2108051}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      );

  }

export default Map