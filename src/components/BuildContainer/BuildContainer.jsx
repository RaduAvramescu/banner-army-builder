import React, { Component } from "react";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

export default class BuildContainer extends Component {
  render() {
    const { fundsRemaining, onRemoveUnit } = this.props;
    return (
      <Grid container justify="center" alignContent="center" direction="column">
        <Typography variant="h2" align="center">
          Build
        </Typography>
        <Typography variant="h3" align="center">
          Funds Left: {fundsRemaining}
        </Typography>
        <Grid container justify="center">
          {this.props.units.map((unit, i) => (
            <UnitCard
              key={i}
              id={i}
              unitName={unit.name}
              unitCategory={unit.category}
              unitPrice={unit.price}
              unitImage={unit.image}
              unitCategoryIcon={unit.category_icon}
              unitSemicircleIcon={unit.semicircle_icon}
              onRemoveUnit={onRemoveUnit}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}
