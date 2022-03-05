import * as React from "react";
import { Grid } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "./Markers";
import "./Map.css";

const position = [-30.048598, -51.1976142];
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.REACT_APP_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.REACT_APP_MAPBOX_STYLEID;

export const Map = ({ dados }) => {
  return (
    <>
      <Grid style={{ height: "90vh", backgroundColor: "#4d4b49" }}>
        <MapContainer center={position} zoom={12}>
          <CustomTileLayer />
          <Markers dados={dados} />
        </MapContainer>
      </Grid>
    </>
  );
};

const CustomTileLayer = () => {
  return MAPBOX_API_KEY ? (
    <TileLayer
      attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
    />
  ) : (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};
