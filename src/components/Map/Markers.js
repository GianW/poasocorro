import { Marker, Popup } from "react-leaflet";
import {
  // Card,
  Typography,
} from "@mui/material";

export const Markers = ({ dados }) =>
  dados.map((pt) => (
    <Marker position={[pt.latitude, pt.longitude]} key={pt.cod_estab}>
      <Popup>
        {/* <Card style={{ backgroundColor: "white" }}> */}
        <Typography>{pt.nome}</Typography>
        {/* </Card> */}
      </Popup>
    </Marker>
  ));
