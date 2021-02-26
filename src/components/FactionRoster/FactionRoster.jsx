import React from "react";

import Beastmen from "../../data/beastmen.json";
import Bretonnia from "../../data/bretonnia.json";
import DarkElves from "../../data/dark_elves.json";

import UnitCard from "../UnitCard/UnitCard";

import { Box, Grid, Typography } from "@material-ui/core";

const categories = [
  "Lords",
  "Heroes",
  "Infantry",
  "Missile Infantry",
  "Cavalry & Chariots",
  "Missile Cavalry & Chariots",
  "Monsters & Beasts",
  "Missile Monsters & Beasts",
  "Artillery & War Machines",
];

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  const factions = [Beastmen, Bretonnia, DarkElves];
  let factionRoster = factions[selectedFaction];

  return (
    <Box my="1rem">
      <Grid container justify="center" alignContent="center" direction="column">
        {categories && (
          <div>
            {categories.map((category, i) => (
              <div key={i} id={i}>
                <Box my="1rem">
                  <Typography variant="h3" component="h2" align="center">
                    {categories[i]}
                  </Typography>
                  <Grid container justify="center">
                    {selectedFaction &&
                      factionRoster &&
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
                </Box>
              </div>
            ))}
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default FactionRoster;
