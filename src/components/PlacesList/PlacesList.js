import * as React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

const FALLBACK_IMG =
  "https://www.agenciapreview.com/wp-content/uploads/2018/10/Foto-Orla-Moacyr-Scliar-1-860x480.jpg";

const FacilityImage = ({ src, alt, sx }) => {
  const [imgSrc, setImgSrc] = React.useState(src || FALLBACK_IMG);
  const [failed, setFailed] = React.useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setImgSrc(FALLBACK_IMG);
    }
  };

  return (
    <Box component="img" src={imgSrc} alt={alt} onError={handleError} sx={sx} />
  );
};

const typeColors = {
  Hospital: "#FF5A5F",
  PA: "#00A699",
  CS: "#FC642D",
  UBS: "#484848",
  ESF: "#7B0051",
  AEM: "#00A699",
  AEC: "#FC642D",
};

export const PlacesList = ({ dados, hoveredId, mapHoveredId, onHover }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cardRefs = React.useRef({});

  React.useEffect(() => {
    if (mapHoveredId && cardRefs.current[mapHoveredId]) {
      cardRefs.current[mapHoveredId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [mapHoveredId]);

  if (!dados || dados.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">
          Nenhum estabelecimento encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, backgroundColor: "background.default", minHeight: "100%" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, px: 1 }}>
        {dados.length} resultado{dados.length !== 1 ? "s" : ""} encontrado
        {dados.length !== 1 ? "s" : ""}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {dados.map((place) => {
          const isHovered = hoveredId === place.cod_estab;
          return (
            <Card
              key={place.cod_estab}
              ref={(el) => { cardRefs.current[place.cod_estab] = el; }}
              sx={{
                cursor: "pointer",
                backgroundColor: "background.paper",
                outline: isHovered
                  ? `2px solid ${theme.palette.text.primary}`
                  : "2px solid transparent",
                boxShadow: isHovered ? "0 6px 20px rgba(0,0,0,0.18)" : "none",
                transform: isHovered ? "translateY(-2px)" : "none",
                transition: "outline 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={() => onHover && onHover(place.cod_estab)}
              onMouseLeave={() => onHover && onHover(null)}
              onClick={() => navigate(`/details/${slugify(place.nome)}`)}
            >
              <CardActionArea sx={{ display: "flex", alignItems: "stretch" }}>
                <FacilityImage
                  src={place.imagem}
                  alt={place.nome}
                  sx={{
                    width: 140,
                    height: 130,
                    flexShrink: 0,
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    p: "12px 16px !important",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      color="text.primary"
                      sx={{ lineHeight: 1.3, flex: 1, pr: 1 }}
                    >
                      {place.nome}
                    </Typography>
                    <Chip
                      label={place.tipo}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        backgroundColor: typeColors[place.tipo] || "#484848",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  <Typography variant="caption" color="text.secondary" noWrap>
                    {place.endereco}
                  </Typography>

                  <Divider sx={{ my: 0.5 }} />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {place.hr_funcionamento}
                      </Typography>
                    </Box>
                    {place.telefone && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocalPhoneIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {place.telefone}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {place.especialidades && place.especialidades.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                      {place.especialidades.slice(0, 3).map((esp) => (
                        <Chip
                          key={esp}
                          label={esp}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 18,
                            fontSize: "0.6rem",
                            borderColor: "divider",
                            color: "text.secondary",
                          }}
                        />
                      ))}
                      {place.especialidades.length > 3 && (
                        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                          +{place.especialidades.length - 3}
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
