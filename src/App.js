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
  state = { selectedFaction: "Beastmen", units: [] };

  handleFactionChange = (selectedFaction) => {
    this.setState({ selectedFaction: selectedFaction });
  };

  handleAddUnit = (
    unitName,
    unitCategory,
    unitPrice,
    unitImage,
    unitCategoryIcon,
    unitSemicircleIcon
  ) => {
    const newUnits = [...this.state.units];
    const newUnit = {
      name: `${unitName}`,
      category: `${unitCategory}`,
      price: `${unitPrice}`,
      image: `${unitImage}`,
      category_icon: `${unitCategoryIcon}`,
      semicircle_icon: `${unitSemicircleIcon}`,
    };
    newUnits.push(newUnit);
    this.setState({ units: newUnits });
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
          <BuildContainer units={this.state.units} />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
