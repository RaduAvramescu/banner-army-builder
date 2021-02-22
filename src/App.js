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
    const {
      name,
      category,
      price,
      image,
      category_icon,
      semicircle_icon,
    } = props;
    const newUnits = [...this.state.units];
    const newUnit = {
      name: `${name}`,
      category: `${category}`,
      price: parseInt(`${price}`),
      image: `${image}`,
      category_icon: `${category_icon}`,
      semicircle_icon: `${semicircle_icon}`,
    };
    newUnits.push(newUnit);
    this.setState({ units: newUnits });
    const newFunds = this.state.funds - price;
    this.setState({ funds: newFunds });
  };

  handleRemoveUnit = (id, unitPrice) => {
    const newUnits = [...this.state.units];
    newUnits.splice(id, 1);
    this.setState({ units: newUnits });
    const newFunds = this.state.funds + unitPrice;
    this.setState({ funds: newFunds });
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
