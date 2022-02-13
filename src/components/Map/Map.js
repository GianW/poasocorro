import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@mui/styles";
import "./Map.css";

const position = [51.505, -0.09];

export const Map = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={position}
        zoom={2}
        maxBounds={[
          [-180, 180],
          [180, -180]
        ]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    mapContainer: {
      width: "100%",
      height: "100%"
    }
  };
});
