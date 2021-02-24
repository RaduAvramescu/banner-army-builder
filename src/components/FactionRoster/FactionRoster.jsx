import React from "react";

import Beastmen from "../../data/Beastmen.json";
import Bretonnia from "../../data/Bretonnia.json";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

const categories = [
  "Lords",
  "Heroes",
  "Infantry",
  "Missile Infantry",
  "Cavalry & Chariots",
  "Missile Cavalry & Chariots",
  "Monsters & Beasts",
];

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  let factionRoster;
  if (selectedFaction === "Beastmen") factionRoster = Beastmen;
  if (selectedFaction === "Bretonnia") factionRoster = Bretonnia;

  return (
    <Grid container justify="center" alignContent="center" direction="column">
      {categories && (
        <div>
          {categories.map((category, i) => (
            <div key={i} id={i}>
              <Typography variant="h3" component="h2" align="center">
                {categories[i]}
              </Typography>
              <Grid container justify="center">
                {selectedFaction &&
                  factionRoster
                    .filter((unit) => unit.category === categories[i])
                    .map((unit, i) => (
                      <UnitCard
                        key={i}
                        id={i}
                        onUnitAdd={onUnitAdd}
                        addUnit={true}
                        {...unit}
                      />
                    ))}
              </Grid>
            </div>
          ))}
        </div>
      )}
    </Grid>
  );
};

export default FactionRoster;
