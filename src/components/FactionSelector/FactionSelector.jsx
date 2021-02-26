import React from "react";

import factions from "../../data/factions.json";

import {
  Box,
  Grid,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";

const FactionSelector = ({ handleFactionChange }) => {
  return (
    <Box my="1rem">
      <Grid container justify="center">
        <FormControl>
          <InputLabel htmlFor="faction-select">Faction</InputLabel>
          <NativeSelect
            defaultValue={0}
            onChange={(e) => handleFactionChange(e.target.value)}
            inputProps={{ id: "faction-select" }}
          >
            {factions.map((faction, i) => (
              <option key={i} value={i}>
                {faction.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default FactionSelector;
