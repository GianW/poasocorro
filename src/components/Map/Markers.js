import { Marker, Popup } from "react-leaflet";
import { Typography } from "@mui/material";

import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: `${window.location.href}/marker.png`,
  iconSize: [20, 25],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export const Markers = ({ dados }) =>
  dados.map((pt) => (
    <Marker
      icon={markerIcon}
      position={[pt.latitude, pt.longitude]}
      title={pt.nome}
      key={pt.cod_estab}
    >
      <Popup>
        <Typography variant="body1">{pt.nome}</Typography>
        <Typography variant="body2">
          <strong>Endereço:</strong> {pt.endereco}
        </Typography>
        <Typography variant="body2">
          <strong>Horário:</strong> {pt.hr_funcionamento}
        </Typography>
        <Typography variant="body2">
          <strong>Tipo:</strong> {pt.tipo}
        </Typography>
      </Popup>
    </Marker>
  ));
