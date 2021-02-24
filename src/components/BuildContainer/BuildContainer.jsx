import React from "react";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

const BuildContainer = ({
  fundsRemaining,
  modelCount,
  onUnitRemove,
  units,
}) => {
  return (
    <Grid container justify="center" alignContent="center" direction="column">
      <Typography variant="h2" align="center">
        Build
      </Typography>
      <Typography variant="h3" align="center">
        Funds Left: {fundsRemaining}
      </Typography>
      <Typography variant="h3" align="center">
        Model Count: {modelCount}
      </Typography>
      <Grid container justify="center">
        {units
          .sort((a, b) => (a.unitid > b.unitid ? 1 : -1))
          .map((unit, i) => (
            <UnitCard key={i} id={i} onUnitRemove={onUnitRemove} {...unit} />
          ))}
      </Grid>
    </Grid>
  );
};

export default BuildContainer;
