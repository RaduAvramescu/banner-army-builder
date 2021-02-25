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
  state = { selectedFaction: "Beastmen", funds: 12400, models: 0, units: [] };

  handleFactionChange = (selectedFaction) => {
    this.setState((state) => ({
      ...state,
      selectedFaction: selectedFaction,
      funds: 12400,
      models: 0,
      units: [],
    }));
  };

  handleVerifyDuplicates = (validation, props) => {
    const { units } = this.state;
    let count = 0;

    if (validation === "countSame") {
      count = units.filter((el) => {
        if (
          el.unitid === props.unitid ||
          (el.baseUnit === props.baseUnit &&
            el.hasOwnProperty("baseUnit") &&
            !props.image.includes("ror"))
        )
          return count + 1;
      }).length;
      return count;
    }

    if (validation === "countCategory") {
      count = units.filter((el) => {
        if (el.category === props.category) return count + 1;
      }).length;
      return count;
    } else if (typeof validation === "string") {
      count = units.filter((el) => {
        if (el[validation] === true) return count + 1;
      }).length;
    } else {
      count = units.filter((el) => {
        if (el.limited_type === props.limited_type) return count + 1;
      }).length;
    }
    return count;
  };

  handleUnitCanAdd = (props) => {
    const {
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
      basePrice,
    } = props;
    const { funds, units } = this.state;

    if (price > funds) return alert("You don't have enough funds!");

    if (category === "Lords")
      if (units.find((unit) => unit.category === "Lords"))
        this.handleUnitRemove(0, units[0].price);

    if (this.handleVerifyDuplicates("countSame", props) === 5)
      return alert("You can't have more than 5 of the same unit!");

    if (limited_type) {
      if (limited_type === "Chariots")
        if (this.handleVerifyDuplicates(props, props) === 4)
          return alert(`You can't have more than 4 ${limited_type}!`);

      if (this.handleVerifyDuplicates("countSame", props) === 4)
        return alert(`You can't have more than 4 of the same ${limited_type}!`);
      else if (limited_type === "Restricted")
        if (this.handleVerifyDuplicates("countSame", props) === 1)
          return alert(`You can't have more than 1 ${name}!`);
    }
    if (isSE) {
      if (category === "Heroes")
        if (this.handleVerifyDuplicates("countCategory", props) === 2)
          return alert("You can't have more than 2 Heroes!");

      if (this.handleVerifyDuplicates("isSE", props) === 5)
        return alert("You can't have more than 5 Single Entity (SE) units!");

      if (this.handleVerifyDuplicates("countSame", props) === 2)
        return alert(
          "You can't have more than 2 of the same Single Entity (SE) units!"
        );
    }

    if (isSEM)
      if (this.handleVerifyDuplicates("isSEM", props) === 3)
        return alert(
          "You can't have more than 3 Single Entity Monsters (SEM)!"
        );

    if (isMissile)
      if (this.handleVerifyDuplicates("isMissile", props) === 12)
        return alert("You can't have more than 12 missile units!");

    if (is360)
      if (this.handleVerifyDuplicates("is360", props) === 6)
        return alert(
          "You can't have more than 6 units with 360 degree firing arc!"
        );

    if (isFlyer)
      if (this.handleVerifyDuplicates("isFlyer", props) === 5)
        return alert("You can't have more than 5 flying units!");

    if (category === "Infantry") {
      if (
        (!image.includes("ror") && price >= 901 && price <= 1100) ||
        (basePrice >= 901 && basePrice <= 1100)
      )
        if (this.handleVerifyDuplicates("countSame", props) === 4)
          return alert(
            "You can't have more than 4 of an Infantry unit with 901-1100 price!"
          );

      if ((!image.includes("ror") && price >= 1101) || basePrice >= 1101)
        if (this.handleVerifyDuplicates("countSame", props) === 3)
          return alert(
            "You can't have more than 3 of an Infantry unit with 1101+ price!"
          );
    }

    if (category !== "Infantry" && !isSE) {
      if ((!image.includes("ror") && price >= 1201) || basePrice >= 1201)
        if (
          limited_type &&
          this.handleVerifyDuplicates("countSame", props) === 3
        )
          return alert(
            `You can't have more than 3 of the same ${limited_type} with 1201+ price!`
          );
    }

    if (category === "Missile Cavalry & Chariots")
      if (this.handleVerifyDuplicates("countCategory", props) === 6)
        return alert(`You can't have more than 6 ${category}!`);

    if (image.includes("ror"))
      if (this.handleVerifyDuplicates("countSame", props) === 1)
        return alert("You can't have more than 1 of the same RoR!");

    this.handleUnitAdd(props);
  };

  handleUnitAdd = (props) => {
    const { price } = props;
    this.setState((state) => {
      const newUnits = [...state.units];
      newUnits.push(props);

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
    const { selectedFaction, funds, models, units } = this.state;
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Banner />
          <FactionSelector handleFactionChange={this.handleFactionChange} />
          <FactionRoster
            selectedFaction={selectedFaction}
            onUnitAdd={this.handleUnitCanAdd}
            fundsRemaining={funds}
          />
          <BuildContainer
            units={units}
            onUnitRemove={this.handleUnitRemove}
            fundsRemaining={funds}
            modelCount={models}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
