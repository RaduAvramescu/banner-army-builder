import React from "react";

import Beastmen from "../../data/Beastmen.json";
import Bretonnia from "../../data/Bretonnia.json";
import DarkElves from "../../data/Dark Elves.json";
import Dwarfs from "../../data/Dwarfs.json";
import Empire from "../../data/The Empire.json";
import Greenskins from "../../data/Greenskins.json";
import HighElves from "../../data/High Elves.json";
import Lizardmen from "../../data/Lizardmen.json";
import Norsca from "../../data/Norsca.json";
import Skaven from "../../data/Skaven.json";
import TombKings from "../../data/Tomb Kings.json";
import VampireCoast from "../../data/Vampire Coast.json";
import VampireCounts from "../../data/Vampire Counts.json";
import WarriorsOfChaos from "../../data/Warriors of Chaos.json";
import WoodElves from "../../data/Wood Elves.json";
import UnitCard from "../UnitCard/UnitCard";
import { Box, Grid, Typography } from "@material-ui/core";

const categories = [
  { name: "Lords", value: "Lords" },
  { name: "Heroes", value: "Hero" },
  { name: "Infantry", value: "Infantry" },
  { name: "Missile Infantry", value: "Missile Infantry" },
  { name: "Cavalry & Chariots", value: "Cavalry & Chariots" },
  { name: "Missile Cavalry & Chariots", value: "Missile Cavalry & Chariots" },
  { name: "Monsters & Beasts", value: "Monsters & Beasts" },
  { name: "Missile Monsters & Beasts", value: "Missile Monsters & Beasts" },
  { name: "Artillery & War Machines", value: "Artillery & War Machines" },
];

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  const factions = [
    Beastmen,
    Bretonnia,
    DarkElves,
    Dwarfs,
    Empire,
    Greenskins,
    HighElves,
    Lizardmen,
    Norsca,
    Skaven,
    TombKings,
    VampireCoast,
    VampireCounts,
    WarriorsOfChaos,
    WoodElves,
  ];
  let factionRoster = factions[selectedFaction];

  return (
    <Box my="1rem">
      <Box letterSpacing={5}>
        <Typography variant="h2" align="center">
          ROSTER
        </Typography>
      </Box>
      <Grid container justify="center" alignContent="center" direction="column">
        {categories && (
          <div>
            {categories.map((caste, i) => (
              <div key={i} id={i}>
                <Box my="1rem">
                  <Typography variant="h3" component="h2" align="center">
                    {categories[i].name}
                  </Typography>
                  <Grid container justify="center">
                    {selectedFaction &&
                      factionRoster &&
                      factionRoster
                        .filter((unit) => unit.caste === categories[i].value)
                        .map((unit, i) => (
                          <UnitCard
                            key={i}
                            id={i}
                            onUnitAdd={onUnitAdd}
                            addUnit={true}
                            {...unit}
                          />
                        ))}
                  </Grid>
                </Box>
              </div>
            ))}
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default FactionRoster;
