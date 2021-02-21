import React, { Component } from "react";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

export default class BuildContainer extends Component {
  render() {
    return (
      <Grid container justify="center" alignContent="center" direction="column">
        <Typography variant="h2" component="h2" align="center">
          Build
        </Typography>
        <Grid container justify="center">
          {this.props.units.map((unit, i) => (
            <UnitCard
              unitName={unit.name}
              unitCategory={unit.category}
              unitPrice={unit.price}
              unitImage={unit.image}
              unitCategoryIcon={unit.category_icon}
              unitSemicircleIcon={unit.semicircle_icon}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}
