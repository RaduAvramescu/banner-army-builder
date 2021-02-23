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
    this.setState({ selectedFaction: selectedFaction });
  };

  handleUnitCanAdd = (props) => {
    const { price, category } = props;
    const { funds, units } = this.state;
    if (price > funds) {
      return alert("You don't have enough funds!");
    }
    if (category === "Lords")
      if (units.find((unit) => unit.category === "Lords"))
        this.handleUnitRemove(0, units[0].price);
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
