import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import dados from "../data/dados.json";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MapIcon from "@mui/icons-material/Map";

const FALLBACK_IMG =
  "https://www.agenciapreview.com/wp-content/uploads/2018/10/Foto-Orla-Moacyr-Scliar-1-860x480.jpg";

const HeroImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = React.useState(src || FALLBACK_IMG);
  const [failed, setFailed] = React.useState(false);

  return (
    <Box
      component="img"
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setImgSrc(FALLBACK_IMG);
        }
      }}
      sx={{
        width: "100%",
        height: { xs: 220, md: 340 },
        objectFit: "cover",
      }}
    />
  );
};

export const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const unit = dados.find((u) => slugify(u.nome) === params.nome);

  if (!unit) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Estabelecimento não encontrado.</Typography>
        <Button onClick={() => navigate("/")}>Voltar</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          size="small"
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: "50%" }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {unit.nome}
        </Typography>
      </Box>

      <HeroImage src={unit.imagem} alt={unit.nome} />

      <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            {unit.nome}
          </Typography>
          <Chip
            label={unit.tipo}
            sx={{ backgroundColor: "#FF5A5F", color: "#fff", fontWeight: 600, ml: 2, flexShrink: 0 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Administração: {unit.adm}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <InfoRow icon={<LocationOnIcon />} label="Endereço" value={unit.endereco} />
          <InfoRow icon={<AccessTimeIcon />} label="Horário" value={unit.hr_funcionamento} />
          {unit.telefone && (
            <InfoRow icon={<LocalPhoneIcon />} label="Telefone" value={unit.telefone} />
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<MapIcon />}
            href={`https://www.google.com/maps/place/@${unit.latitude},${unit.longitude}`}
            target="_blank"
            rel="noreferrer"
            sx={{
              borderColor: "text.primary",
              color: "text.primary",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            Ver no Google Maps
          </Button>
          {unit.site && (
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              href={unit.site}
              target="_blank"
              rel="noreferrer"
              sx={{
                borderColor: "text.primary",
                color: "text.primary",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              Site oficial
            </Button>
          )}
        </Box>

        {unit.especialidades && unit.especialidades.length > 0 && (
          <>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Especialidades
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {unit.especialidades.map((esp) => (
                <Chip
                  key={esp}
                  label={esp}
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    borderColor: "divider",
                    color: "text.secondary",
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
    <Box sx={{ color: "text.secondary", mt: 0.2 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500} color="text.primary">
        {value}
      </Typography>
    </Box>
  </Box>
);
