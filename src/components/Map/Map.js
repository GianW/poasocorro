import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { Markers } from "./Markers";
import "./Map.css";

const position = [-30.048598, -51.1976142];
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.REACT_APP_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.REACT_APP_MAPBOX_STYLEID;

const BoundsTracker = ({ onBoundsChange }) => {
  const map = useMapEvents({
    moveend: () => onBoundsChange(map.getBounds()),
    zoomend: () => onBoundsChange(map.getBounds()),
  });

  React.useEffect(() => {
    onBoundsChange(map.getBounds());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const CustomTileLayer = ({ mode }) => {
  if (MAPBOX_API_KEY) {
    const styleId = mode === "dark" ? "dark-v11" : "streets-v12";
    const userId = "mapbox";
    return (
      <TileLayer
        attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/${userId}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
      />
    );
  }

  return mode === "dark" ? (
    <TileLayer
      attribution='© <a href="https://carto.com/">CARTO</a>'
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    />
  ) : (
    <TileLayer
      attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};

export const Map = ({ dados, onBoundsChange, hoveredId, onHover, onLeave }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <div style={{ height: "100%", backgroundColor: theme.palette.background.default }}>
      <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
        <CustomTileLayer key={mode} mode={mode} />
        <Markers dados={dados} hoveredId={hoveredId} onHover={onHover} onLeave={onLeave} mode={mode} />
        {onBoundsChange && <BoundsTracker onBoundsChange={onBoundsChange} />}
      </MapContainer>
    </div>
  );
};
