import React, { Component } from "react";

import beastmen from "../../data/beastmen.json";

import UnitCard from "../UnitCard/UnitCard";

import { Grid, Typography } from "@material-ui/core";

export default class FactionRoster extends Component {
  render() {
    const { selectedFaction, onAddUnit } = this.props;
    return (
      <Grid container justify="center" alignContent="center" direction="column">
        <Typography variant="h3" component="h2" align="center">
          Lords
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Lords")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Heroes
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Heroes")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Infantry
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Infantry")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Missile Infantry
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Missile Infantry")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Cavalry &amp; Chariots
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Cavalry & Chariots")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Missile Cavalry &amp; Chariots
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Missile Cavalry & Chariots")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
        <Typography variant="h3" component="h2" align="center">
          Monsters &amp; Beasts
        </Typography>
        <Grid container justify="center">
          {selectedFaction === "Beastmen" &&
            beastmen
              .filter((unit) => unit.category == "Monsters & Beasts")
              .map((unit, i) => (
                <UnitCard
                  unitName={unit.name}
                  unitCategory={unit.category}
                  unitPrice={unit.price}
                  unitImage={unit.image}
                  unitCategoryIcon={unit.category_icon}
                  unitSemicircleIcon={unit.semicircle_icon}
                  onAddUnit={onAddUnit}
                />
              ))}
        </Grid>
      </Grid>
    );
  }
}
