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

  handleVerifyDuplicates = (unitid, validation, category) => {
    const { units } = this.state;
    let count = 0;

    if (validation === "countHeroes") {
      count = units.filter((el) => {
        if (el.category === "Heroes") return count + 1;
      }).length;
      return count;
    }

    if (validation === "countSame") {
      count = units.filter((el) => {
        if (el.unitid === unitid) return count + 1;
      }).length;
      return count;
    }

    if (validation === "countCategory") {
      count = units.filter((el) => {
        if (el.category === category) return count + 1;
      }).length;
      return count;
    } else {
      console.log(validation);
      count = units.filter((el) => {
        if (`${el}.${validation}` === true) return count + 1;
      }).length;
    }

    return count;
  };

  handleUnitCanAdd = (props) => {
    const {
      unitid,
      name,
      price,
      category,
      image,
      limited_type,
      isSE,
      isSEM,
      isMissile,
      is360,
      isFlyer,
    } = props;
    const { funds, units } = this.state;

    if (price > funds) return alert("You don't have enough funds!");

    if (category === "Lords")
      if (units.find((unit) => unit.category === "Lords"))
        this.handleUnitRemove(0, units[0].price);

    if (category === "Heroes")
      if (this.handleVerifyDuplicates(unitid, "countHeroes") === 2)
        return alert("You can't have more than 2 Heroes!");

    if (this.handleVerifyDuplicates(unitid, "countSame") === 5)
      return alert("You can't have more than 5 of the same unit!");

    if (limited_type)
      if (this.handleVerifyDuplicates(unitid, "countSame") === 4)
        return alert(`You can't have more than 4 of the same ${limited_type}!`);
      else if (limited_type === "Restricted")
        if (this.handleVerifyDuplicates(unitid, "countSame") === 1)
          return alert(`You can't have more than 1 ${name}!`);

    if (isSE) {
      if (this.handleVerifyDuplicates(unitid, "isSE") === 5)
        return alert("You can't have more than 5 Single Entity (SE) units!");

      if (category === "Heroes")
        if (this.handleVerifyDuplicates(unitid, "countHeroes") === 2)
          return alert("You can't have more than 2 Heroes!");

      if (this.handleVerifyDuplicates(unitid, "countSame") === 2)
        return alert(
          "You can't have more than 2 of the same Single Entity (SE) units!"
        );
    }

    if (isSEM)
      if (this.handleVerifyDuplicates(unitid, "isSEM") === 3)
        return alert(
          "You can't have more than 3 Single Entity Monsters (SEM)!"
        );

    if (isMissile)
      if (this.handleVerifyDuplicates(unitid, "isMissile") === 12)
        return alert("You can't have more than 12 missile units!");

    if (is360)
      if (this.handleVerifyDuplicates(unitid, "is360") === 6)
        return alert(
          "You can't have more than 6 units with 360 degree firing arc!"
        );

    if (isFlyer)
      if (this.handleVerifyDuplicates(unitid, "isFlyer") === 5)
        return alert("You can't have more than 5 flying units!");

    if (category === "Infantry") {
      if (price >= 901 && price <= 1100)
        if (this.handleVerifyDuplicates(unitid, "countSame") === 4)
          return alert(
            "You can't have more than 4 of an Infantry unit with 901-1100 price!"
          );

      if (price >= 1101)
        if (this.handleVerifyDuplicates(unitid, "countSame") === 3)
          return alert(
            "You can't have more than 3 of an Infantry unit with 1101+ price!"
          );
    }

    if (category === "Missile Cavalry & Chariots")
      if (this.handleVerifyDuplicates(unitid, "countCategory", category) === 6)
        return alert(`You can't have more than 6 ${category}!`);

    if (category !== "Infantry" && !isSE) {
      if (price >= 1201)
        if (
          limited_type &&
          this.handleVerifyDuplicates(unitid, "countSame") === 3
        )
          return alert(
            `You can't have more than 3 of the same ${limited_type} with 1201+ price!`
          );
    }

    if (image.includes("ror"))
      if (this.handleVerifyDuplicates(unitid, "countSame") === 1)
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
