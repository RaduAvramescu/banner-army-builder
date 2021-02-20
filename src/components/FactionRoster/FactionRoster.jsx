import React from "react";

import beastmen from "../../data/beastmen.json";

import { Grid, Typography } from "@material-ui/core";

const FactionRoster = ({ selectedFaction }) => {
  return (
    <Grid container justify="center" alignContent="center" direction="column">
      <Typography variant="h3" component="h2" align="center">
        Lords
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Lords")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Heroes
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Heroes")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Infantry
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Infantry")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Missile Infantry
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Missile Infantry")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Cavalry &amp; Chariots
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Cavalry & Chariots")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Missile Cavalry &amp; Chariots
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Missile Cavalry & Chariots")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
      <Typography variant="h3" component="h2" align="center">
        Monsters &amp; Beasts
      </Typography>
      {selectedFaction === "Beastmen" &&
        beastmen
          .filter((unit) => unit.category == "Monsters & Beasts")
          .map((unit, i) => (
            <Typography variant="h5" component="p">
              {unit.name}
            </Typography>
          ))}
    </Grid>
  );
};

export default FactionRoster;
