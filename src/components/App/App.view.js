import { CssBaseline, Container, Divider } from "@material-ui/core";
import NavBar from "../NavBar";
import Banner from "../Banner";
import FactionSelector from "../FactionSelector";
import FactionRoster from "../FactionRoster";
import BuildContainer from "../BuildContainer";
import Footer from "../Footer";

const AppView = ({
  selectedFaction,
  funds,
  models,
  units,
  onUnitCanAdd,
  onUnitRemove,
  onFactionChange,
}) => (
  <div className="App">
    <CssBaseline />
    <NavBar />
    <Divider style={{ height: "2px" }} />
    <Container maxWidth="lg">
      <Banner />
      <FactionSelector handleFactionChange={onFactionChange} />
      <Divider />
      <main>
        <FactionRoster
          selectedFaction={selectedFaction}
          onUnitAdd={onUnitCanAdd}
          fundsRemaining={funds}
        />
        <Divider />
        <BuildContainer
          units={units}
          onUnitRemove={onUnitRemove}
          fundsRemaining={funds}
          unit_size={models}
        />
      </main>
    </Container>
    <Divider style={{ height: "2px" }} />
    <Footer />
  </div>
);

export default AppView;
