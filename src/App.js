import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import {
  NavBar,
  Banner,
  FactionSelector,
  FactionRoster,
  BuildContainer,
  Footer,
} from "./components";

import "./App.css";

class App extends Component {
  state = { selectedFaction: "0", funds: 12400, models: 0, units: [] };

  handleFactionChange = (selectedFaction) => {
    this.setState((state) => ({
      ...state,
      selectedFaction: selectedFaction,
      funds: 12400,
      models: 0,
      units: [],
    }));
  };

  handleUnitCanAdd = (props, mount) => {
    const { funds, units } = this.state;
    let { ...newProps } = props;

    if (mount) newProps = this.handleUpdateUnit(newProps, mount);

    const {
      name,
      price,
      category,
      image,
      limited_type,
      basePrice,
      isSE,
      isSEM,
      isMissile,
      is360,
      isFlyer,
      isSpecial,
      hasBreath,
      hasDrain,
      variantUnit,
    } = newProps;

    if (category !== "Lords" && !units[0])
      return alert("You have to pick a Lord first!");

    if (price > funds) return alert("You don't have enough funds!");

    if (category === "Lords") {
      if (units.find((unit) => unit.category === "Lords"))
        this.handleUnitRemove(0, units[0].price, units[0].modelCount);
    }

    if (units.length === 20)
      return alert("You cannot have more than 20 units!");

    if (this.handleVerifyDuplicates("countSame", newProps) === 5)
      return alert("You can't have more than 5 of the same unit!");

    if (limited_type) {
      if (limited_type === "Chariots")
        if (this.handleVerifyDuplicates(newProps, newProps) === 4)
          return alert(`You can't have more than 4 ${limited_type}!`);

      if (this.handleVerifyDuplicates("countSame", newProps) === 4)
        return alert(`You can't have more than 4 of the same ${limited_type}!`);
      else if (limited_type === "Restricted")
        if (this.handleVerifyDuplicates("countSame", newProps) === 1)
          return alert(`You can't have more than 1 ${name}!`);
    }

    if (isSE) {
      if (category === "Heroes") {
        if (this.handleVerifyDuplicates("countCategory", newProps) === 2)
          return alert("You can't have more than 2 Heroes!");
        if (
          newProps.hasOwnProperty("isNamed") &&
          this.handleVerifyDuplicates("countNamed", newProps) === 1
        )
          return alert(
            "You can't have more than 1 of the same named character!"
          );
      }

      if (this.handleVerifyDuplicates("isSE", newProps) === 5)
        return alert("You can't have more than 5 Single Entity (SE) units!");

      if (this.handleVerifyDuplicates("countSame", newProps) === 2)
        return alert(
          "You can't have more than 2 of the same Single Entity (SE) units!"
        );
    }

    if (isSEM) {
      if (this.handleVerifyDuplicates("isSEM", newProps) === 3)
        return alert(
          "You can't have more than 3 Single Entity Monsters (SEM)!"
        );
      if (
        price >= 1800 &&
        this.handleVerifyDuplicates("SEMCost", newProps) === 2
      )
        return alert(
          "You can't have more than 2 Single Entity Monsters (SEM) that cost over 1800!"
        );
    }

    if (isMissile)
      if (this.handleVerifyDuplicates("isMissile", newProps) === 12)
        return alert("You can't have more than 12 missile units!");

    if (is360)
      if (this.handleVerifyDuplicates("is360", newProps) === 6)
        return alert(
          "You can't have more than 6 units with 360 degree firing arc!"
        );

    if (isFlyer)
      if (this.handleVerifyDuplicates("isFlyer", newProps) === 5)
        return alert("You can't have more than 5 flying units!");

    if (isSpecial)
      if (this.handleVerifyDuplicates("isSpecial", newProps) === 1)
        return alert(
          `Your faction has a special rule regarding ${newProps.limiter} that does not allow this!`
        );

    if (hasBreath)
      if (this.handleVerifyDuplicates("hasBreath", newProps) === 2)
        return alert("You can't have more than 2 units with breath attacks!");

    if (hasDrain)
      if (this.handleVerifyDuplicates("hasDrain", newProps) === 1)
        return alert("You can't have more than 1 unit with a HP drain effect!");

    if (variantUnit)
      if (this.handleVerifyDuplicates("variantUnit", newProps) === 8)
        return alert("You can't have more than 8 units of a unit variant!");

    if (category === "Infantry" || category === "Missile Infantry") {
      if (
        (!image.includes("ror") && price >= 901 && price <= 1100) ||
        (basePrice >= 901 && basePrice <= 1100)
      )
        if (this.handleVerifyDuplicates("countSame", newProps) === 4)
          return alert(
            `You can't have more than 4 of an ${category} unit with 901-1100 price!`
          );

      if ((!image.includes("ror") && price >= 1101) || basePrice >= 1101)
        if (this.handleVerifyDuplicates("countSame", newProps) === 3)
          return alert(
            `You can't have more than 3 of an ${category} unit with 1101+ price!`
          );
    }

    if (category !== "Infantry" && !isSE) {
      if ((!image.includes("ror") && price >= 1201) || basePrice >= 1201)
        if (
          limited_type &&
          this.handleVerifyDuplicates("countSame", newProps) === 3
        )
          return alert(
            `You can't have more than 3 of the same ${limited_type} with 1201+ price!`
          );
    }

    if (category === "Missile Cavalry & Chariots")
      if (this.handleVerifyDuplicates("countCategory", newProps) === 6)
        return alert(`You can't have more than 6 ${category}!`);

    if (image.includes("ror"))
      if (this.handleVerifyDuplicates("countROR", newProps) === 1)
        return alert("You can't have more than 1 of the same RoR!");

    this.handleUnitAdd(newProps);
  };

  handleUpdateUnit = (props, mount) => {
    const { ...newProps } = props;

    if (mount) {
      newProps.price += mount.price;
      const unitProperties = [
        "isSEM",
        "isFlyer",
        "hasBreath",
        "hasDrain",
        "isSpecial",
      ];
      unitProperties.forEach((property) => {
        if (mount.hasOwnProperty(property)) newProps[property] = true;
      });
    }

    return newProps;
  };

  handleUnitAdd = (props) => {
    this.setState((state) => {
      const newUnits = [...state.units];

      const { price, modelCount } = props;

      newUnits.push(props);
      newUnits.sort((a, b) => (a.unitid > b.unitid ? 1 : -1));

      return {
        ...state,
        units: newUnits,
        funds: state.funds - price,
        models: state.models + modelCount,
      };
    });
  };

  handleUnitRemove = (id, price, modelCount) => {
    this.setState((state) => {
      const newUnits = [...state.units];
      newUnits.splice(id, 1);

      return {
        ...state,
        units: newUnits,
        funds: state.funds + price,
        models: state.models - modelCount,
      };
    });
  };

  handleVerifyDuplicates = (validation, props) => {
    const { units } = this.state;
    let count = 0;

    if (validation === "countSame") {
      count = units.filter((el) => {
        if (validation === "countSame")
          if (
            el.unitid === props.unitid ||
            (el.hasOwnProperty("baseUnit") && el.baseUnit === props.baseUnit)
          )
            return count + 1;
      }).length;
      return count;
    }

    if (validation === "countROR") {
      count = units.filter((el) => {
        if (el.unitid === props.unitid) return count + 1;
        if (validation === "countSame")
          if (
            el.unitid === props.unitid ||
            (el.hasOwnProperty("baseUnit") && el.baseUnit === props.baseUnit)
          )
            return count + 1;
      }).length;
      return count;
    }

    if (validation === "countNamed") {
      count = units.filter((el) => {
        if (el.name === props.name) return count + 1;
      }).length;
      return count;
    }

    if (validation === "countCategory") {
      count = units.filter((el) => {
        if (el.category === props.category) return count + 1;
      }).length;
      return count;
    }

    if (validation === "isSpecial") {
      count = units.filter((el) => {
        if (el.hasOwnProperty("isSpecial") && el.isSpecial === props.isSpecial)
          if (el.name === props.limiter || props.name === props.limiter)
            return count + 1;
      }).length;
      return count;
    }

    if (validation === "SEMCost") {
      count = units.filter((el) => {
        if (el.price >= 1800) return count + 1;
      }).length;
      return count;
    }

    if (typeof validation === "string") {
      count = units.filter((el) => {
        if (el[validation] === props[validation]) return count + 1;
      }).length;
    } else {
      count = units.filter((el) => {
        if (el.limited_type === props.limited_type) return count + 1;
      }).length;
    }
    return count;
  };

  render() {
    const { selectedFaction, funds, models, units } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <NavBar />
        <Divider style={{ height: "2px" }} />
        <Container maxWidth="lg">
          <Banner />
          <FactionSelector handleFactionChange={this.handleFactionChange} />
          <Divider light />
          <main>
            <FactionRoster
              selectedFaction={selectedFaction}
              onUnitAdd={this.handleUnitCanAdd}
              fundsRemaining={funds}
            />
            <Divider light />
            <BuildContainer
              units={units}
              onUnitRemove={this.handleUnitRemove}
              fundsRemaining={funds}
              modelCount={models}
            />
          </main>
        </Container>
        <Divider style={{ height: "2px" }} />
        <Footer />
      </div>
    );
  }
}

export default App;
