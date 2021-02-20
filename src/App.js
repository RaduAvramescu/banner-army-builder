import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Banner, FactionSelector, FactionRoster, Footer } from "./components";

import "./App.css";

class App extends Component {
  state = { selectedFaction: "Beastmen" };

  handleFactionChange = (selectedFaction) => {
    this.setState({ selectedFaction: selectedFaction });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Banner />
          <FactionSelector handleFactionChange={this.handleFactionChange} />
          <FactionRoster selectedFaction={this.state.selectedFaction} />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
