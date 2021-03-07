import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Box, Grid, Typography, CircularProgress } from "@material-ui/core";
import categories from "../../data/categories.json";
import UnitCard from "../UnitCard/UnitCard";

const factionUnitData = gql`
  query unitGetter($faction: String!) {
    getUnits(faction: $faction) {
      key
      name
      caste
      category
      multiplayer_cost
      unit_size
      ror
      category_icon
      unit_card
      abilities {
        name
      }
      spells {
        name
      }
      battle_mounts {
        mount_name
        price
        icon_name
      }
      ui_unit_group {
        key
        name
        icon
        tooltip
        parent_group {
          key
          onscreen_name
          icon
          order
          mp_cap
        }
      }
    }
  }
`;

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  const { loading, error, data } = useQuery(factionUnitData, {
    variables: { faction: selectedFaction },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let factionRoster = data.getUnits;

  if (
    typeof categories == undefined ||
    typeof selectedFaction == undefined ||
    typeof factionRoster == undefined
  )
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <CircularProgress />
      </Box>
    );

  return (
    <Box my="1rem">
      <Box letterSpacing={5}>
        <Typography variant="h2" align="center">
          ROSTER
        </Typography>
      </Box>
      <Grid container justify="center" alignContent="center" direction="column">
        <div>
          {categories.map((caste, i) => (
            <Box key={i} id={i} my="1rem">
              <Typography variant="h3" component="h2" align="center">
                {categories[i].name}
              </Typography>
              <Grid container justify="center">
                {factionRoster &&
                  factionRoster
                    .filter(
                      (unit) =>
                        unit.ui_unit_group.parent_group.onscreen_name ===
                        categories[i].value
                    )
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
          ))}
        </div>
      </Grid>
    </Box>
  );
};

export default FactionRoster;
