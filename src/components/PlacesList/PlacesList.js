import * as React from "react";
import { Grid, Card } from "@mui/material";

export const PlacesList = ({ dados }) => {
  return (
    <>
      <Grid
        style={{
          height: "90vh",
          backgroundColor: "#4d4b49",
          overflow: "auto",
        }}
      >
        {dados &&
          dados.map((place) => (
            <Card
              key={place.cod_estab}
              style={{ padding: "5px", margin: "5px" }}
            >
              {place.nome}
            </Card>
          ))}
      </Grid>
    </>
  );
};
