import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import {
  Banner,
  FactionSelector,
  FactionRoster,
  BuildContainer,
  Footer,
} from "./components";

import "./App.css";

class App extends Component {
  state = { selectedFaction: "Beastmen", funds: 12400, units: [] };

  handleFactionChange = (selectedFaction) => {
    this.setState((state) => ({
      ...state,
      selectedFaction: selectedFaction,
      units: [],
      funds: 12400,
    }));
  };

  handleVerifyDuplicates = (unitid, validation) => {
    const { units } = this.state;
    let count = 0;

    if (validation === "max2heroes") {
      count = units.filter((el) => {
        if (el.category === "Heroes") return count + 1;
      }).length;
    }

    if (validation === "maxsame")
      count = units.filter((el) => {
        if (el.unitid === unitid) return count + 1;
      }).length;

    if (validation === "se")
      count = units.filter((el) => {
        if (el.isSE) return count + 1;
      }).length;

    if (validation === "sem")
      count = units.filter((el) => {
        if (el.isSEM) return count + 1;
      }).length;

    if (validation === "missile")
      count = units.filter((el) => {
        if (el.is360) return count + 1;
      }).length;

    if (validation === "360")
      count = units.filter((el) => {
        if (el.is360) return count + 1;
      }).length;

    return count;
  };

  handleUnitCanAdd = (props) => {
    const {
      unitid,
      price,
      category,
      image,
      limited_type,
      isSE,
      isSEM,
      isMissile,
      is360,
    } = props;
    const { funds, units } = this.state;

    if (price > funds) return alert("You don't have enough funds!");

    if (category === "Lords")
      if (units.find((unit) => unit.category === "Lords"))
        this.handleUnitRemove(0, units[0].price);

    if (category === "Heroes")
      if (this.handleVerifyDuplicates(unitid, "max2heroes") === 2)
        return alert("You can't have more than 2 Heroes!");

    if (this.handleVerifyDuplicates(unitid, "maxsame") === 5)
      return alert("You can't have more than 5 of a unit!");

    if (limited_type)
      if (this.handleVerifyDuplicates(unitid, "maxsame") === 4)
        return alert(`You can't have more than 4 of the same ${limited_type}!`);

    if (isSE) {
      if (this.handleVerifyDuplicates(unitid, "se") === 5)
        return alert("You can't have more than 5 Single Entity (SE) units!");

      if (category === "Heroes")
        if (this.handleVerifyDuplicates(unitid, "max2heroes") === 2)
          return alert("You can't have more than 2 Heroes!");

      if (this.handleVerifyDuplicates(unitid, "maxsame") === 2)
        return alert(
          "You can't have more than 2 of the same Single Entity (SE) units!"
        );
    }

    if (isSEM)
      if (this.handleVerifyDuplicates(unitid, "sem") === 3)
        return alert(
          "You can't have more than 3 Single Entity Monsters (SEM)!"
        );

    if (isMissile)
      if (this.handleVerifyDuplicates(unitid, "missile") === 12)
        return alert("You can't have more than 12 missile units!");

    if (is360)
      if (this.handleVerifyDuplicates(unitid, "360") === 6)
        return alert(
          "You can't have more than 6 units with 360 degree firing arc!"
        );

    if (category === "Infantry") {
      if (price >= 901 && price <= 1100)
        if (this.handleVerifyDuplicates(unitid, "maxsame") === 4)
          return alert(
            "You can't have more than 4 of an Infantry unit with 901-1100 price!"
          );

      if (price >= 1101)
        if (this.handleVerifyDuplicates(unitid, "maxsame") === 3)
          return alert(
            "You can't have more than 3 of an Infantry unit with 1101+ price!"
          );
    }

    if (category !== "Infantry" && !isSE) {
      if (price >= 1201)
        if (
          limited_type &&
          this.handleVerifyDuplicates(unitid, "maxsame") === 3
        ) {
          return alert(
            `You can't have more than 3 of the same ${limited_type} with 1201+ price!`
          );
        }
    }

    if (image.includes("ror"))
      if (this.handleVerifyDuplicates(unitid, "maxsame") === 1)
        return alert("You can't have more than 1 of the same RoR!");

    this.handleUnitAdd(props);
  };

  handleUnitAdd = (props) => {
    const { category, price } = props;
    this.setState((state) => {
      const newUnits = [...state.units];
      if (category === "Lords") newUnits.unshift(props);
      else newUnits.push(props);

      return {
        ...state,
        units: newUnits,
        funds: state.funds - price,
      };
    });
  };

  handleUnitRemove = (id, price) => {
    this.setState((state) => {
      const newUnits = [...state.units];
      newUnits.splice(id, 1);

      return {
        ...state,
        units: newUnits,
        funds: state.funds + price,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Banner />
          <FactionSelector handleFactionChange={this.handleFactionChange} />
          <FactionRoster
            selectedFaction={this.state.selectedFaction}
            onUnitAdd={this.handleUnitCanAdd}
            fundsRemaining={this.state.funds}
          />
          <BuildContainer
            units={this.state.units}
            onUnitRemove={this.handleUnitRemove}
            fundsRemaining={this.state.funds}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
