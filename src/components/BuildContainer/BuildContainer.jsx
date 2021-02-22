import React from "react";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

const BuildContainer = ({ fundsRemaining, onRemoveUnit, units }) => {
  return (
    <Grid container justify="center" alignContent="center" direction="column">
      <Typography variant="h2" align="center">
        Build
      </Typography>
      <Typography variant="h3" align="center">
        Funds Left: {fundsRemaining}
      </Typography>
      <Grid container justify="center">
        {units.map((unit, i) => (
          <UnitCard key={i} id={i} onRemoveUnit={onRemoveUnit} {...units[i]} />
        ))}
      </Grid>
    </Grid>
  );
};

export default BuildContainer;
