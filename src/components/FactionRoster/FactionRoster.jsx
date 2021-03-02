import React from "react";

import { Box, Grid, Typography, CircularProgress } from "@material-ui/core";
import categories from "../../data/categories.json";
import UnitCard from "../UnitCard/UnitCard";

import * as factions from "../../data/factionImports";

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
