import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Banner, FactionSelector, Footer } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <Banner />
        <FactionSelector />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
