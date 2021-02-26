import React from "react";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Box, Typography } from "@material-ui/core";

const BuildContainer = ({
  fundsRemaining,
  modelCount,
  onUnitRemove,
  units,
}) => {
  const getClasses = (type) => {
    if (type === "funds")
      if (fundsRemaining >= 1000) return "green";
      else return "yellow";

    if (type === "model")
      if (modelCount < 300) return "red";
      else return "green";
  };

  return (
    <Box my="1rem">
      <Grid container justify="center" alignContent="center" direction="column">
        <Typography variant="h2" align="center">
          Build
        </Typography>
        <Box display="flex" justifyContent="center">
          <Typography variant="h3" align="center">
            Funds Left:&nbsp;
          </Typography>
          <Typography
            component="div"
            variant="h3"
            className={getClasses("funds")}
          >
            <Box display="inline">{fundsRemaining}</Box>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h3">Model Count:&nbsp;</Typography>
          <Typography
            component="div"
            variant="h3"
            className={getClasses("model")}
          >
            <Box display="inline">{modelCount}</Box>
          </Typography>
        </Box>
        <Grid container justify="center">
          {units
            .sort((a, b) => (a.unitid > b.unitid ? 1 : -1))
            .map((unit, i) => (
              <UnitCard key={i} id={i} onUnitRemove={onUnitRemove} {...unit} />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildContainer;
