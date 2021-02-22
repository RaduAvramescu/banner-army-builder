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

  handleAddUnit = (props) => {
    if (props.price > this.state.funds) {
      return alert("You don't have enough funds!");
    }
    const newUnits = [...this.state.units];
    console.log(this.state.units.find((o) => o.category === "Lords"));
    if (
      props.category === "Lords" &&
      this.state.units.find((o) => o.category === "Lords") === undefined
    ) {
      newUnits.unshift(props);
      this.setState({ funds: this.state.funds - props.price });
    } else if (props.category !== "Lords") {
      newUnits.push(props);
      this.setState({ funds: this.state.funds - props.price });
    }
    this.setState({ units: newUnits });
  };

  handleRemoveUnit = (id, price) => {
    const newUnits = [...this.state.units];
    newUnits.splice(id, 1);
    this.setState({ units: newUnits });
    this.setState({ funds: this.state.funds + price });
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
            onAddUnit={this.handleAddUnit}
            fundsRemaining={this.state.funds}
          />
          <BuildContainer
            units={this.state.units}
            onRemoveUnit={this.handleRemoveUnit}
            fundsRemaining={this.state.funds}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
