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
    const newUnits = [...this.state.units];
    newUnits.push(props);
    this.setState({ units: newUnits });
    this.setState({ funds: this.state.funds - props.price });
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
