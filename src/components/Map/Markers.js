import { Marker, Popup } from "react-leaflet";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import L from "leaflet";

const makeIcon = (highlighted, mode) => {
  const normalColor = "#FF5A5F";
  const highlightColor = mode === "dark" ? "#F0F0F0" : "#222222";
  const borderColor = mode === "dark" ? "#1E1E1E" : "#FFFFFF";
  return new L.DivIcon({
    className: "",
    html: `<div style="
      width: ${highlighted ? 22 : 16}px;
      height: ${highlighted ? 22 : 16}px;
      background: ${highlighted ? highlightColor : normalColor};
      border: 2.5px solid ${borderColor};
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,${highlighted ? "0.5" : "0.3"});
      transition: all 0.15s ease;
    "></div>`,
    iconSize: [highlighted ? 22 : 16, highlighted ? 22 : 16],
    iconAnchor: [highlighted ? 11 : 8, highlighted ? 11 : 8],
    popupAnchor: [0, highlighted ? -13 : -10],
  });
};

export const Markers = ({ dados, hoveredId, onHover, onLeave, mode }) => {
  const navigate = useNavigate();
  return dados.map((pt) => {
    const isHovered = hoveredId === pt.cod_estab;
    return (
      <Marker
        icon={makeIcon(isHovered, mode)}
        position={[pt.latitude, pt.longitude]}
        title={pt.nome}
        key={pt.cod_estab}
        eventHandlers={{
          mouseover: () => onHover && onHover(pt.cod_estab),
          mouseout: () => onLeave && onLeave(),
        }}
      >
        <Popup minWidth={220}>
          <Box sx={{ p: 0.5 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {pt.nome}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {pt.endereco}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              {pt.hr_funcionamento}
            </Typography>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={() => navigate(`/details/${slugify(pt.nome)}`)}
              sx={{
                backgroundColor: "#FF5A5F",
                "&:hover": { backgroundColor: "#E0484D" },
                borderRadius: "6px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Ver detalhes
            </Button>
          </Box>
        </Popup>
      </Marker>
    );
  });
};
