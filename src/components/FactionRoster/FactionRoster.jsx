import React from "react";

import { Box, Grid, Typography, CircularProgress } from "@material-ui/core";
import categories from "../../data/categories.json";
import UnitCard from "../UnitCard/UnitCard";

import Beastmen from "../../data/Beastmen.json";
import Bretonnia from "../../data/Bretonnia.json";
import DarkElves from "../../data/Dark Elves.json";
import Dwarfs from "../../data/Dwarfs.json";
import Empire from "../../data/The Empire.json";
import Greenskins from "../../data/Greenskins.json";
import HighElves from "../../data/High Elves.json";
import Lizardmen from "../../data/Lizardmen.json";
import Norsca from "../../data/Norsca.json";
import Skaven from "../../data/Skaven.json";
import TombKings from "../../data/Tomb Kings.json";
import VampireCoast from "../../data/Vampire Coast.json";
import VampireCounts from "../../data/Vampire Counts.json";
import WarriorsOfChaos from "../../data/Warriors of Chaos.json";
import WoodElves from "../../data/Wood Elves.json";

const factions = [
  Beastmen,
  Bretonnia,
  DarkElves,
  Dwarfs,
  Empire,
  Greenskins,
  HighElves,
  Lizardmen,
  Norsca,
  Skaven,
  TombKings,
  VampireCoast,
  VampireCounts,
  WarriorsOfChaos,
  WoodElves,
];

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  let factionRoster = factions[selectedFaction];

  if (
    typeof categories == undefined ||
    typeof selectedFaction == undefined ||
    typeof factionRoster == undefined
  )
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <CircularProgress />
      </Box>
    );

  return (
    <Box my="1rem">
      <Box letterSpacing={5}>
        <Typography variant="h2" align="center">
          ROSTER
        </Typography>
      </Box>
      <Grid container justify="center" alignContent="center" direction="column">
        <div>
          {categories.map((caste, i) => (
            <Box key={i} id={i} my="1rem">
              <Typography variant="h3" component="h2" align="center">
                {categories[i].name}
              </Typography>
              <Grid container justify="center">
                {factionRoster
                  .filter((unit) => unit.caste === categories[i].value)
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
          ))}
        </div>
      </Grid>
    </Box>
  );
};

export default FactionRoster;
