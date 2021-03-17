import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Box, Grid, Typography } from "@material-ui/core";
import UnitCard from "../UnitCard/UnitCard";
import unitGroupData from "../../data/ui_unit_groups.json";

const factionUnitQuery = gql`
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
        base_unit
        mounted_unit
        mount_name
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
      custom_battle_permissions {
        general_unit
        general_portrait
        campaign_exclusive
      }
    }
  }
`;

const FactionRoster = ({ selectedFaction, onUnitAdd }) => {
  const { loading, error, data } = useQuery(factionUnitQuery, {
    variables: { faction: selectedFaction },
  });

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <div class="loader"></div>
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <div class="loader"></div>
      </Box>
    );

  let factionRoster = data.getUnits;
  let filteredRoster = JSON.parse(JSON.stringify(factionRoster));

  const filterUnits = () => {
    filteredRoster = filteredRoster.filter((unit) => {
      if (
        unit.custom_battle_permissions &&
        !unit.custom_battle_permissions[0]?.campaign_exclusive
      ) {
        if (!unit.name.includes(" on ")) return unit;
        // if (unit.caste !== "Lord" && unit.caste !== "Hero") return unit;
        // if (unit.key.slice(-1) === "0" && unit.battle_mounts?.length > 0) {
        //   const newMounts = unit.battle_mounts.filter((mount) => {
        //     const newCost = factionRoster.find(
        //       (newUnit) =>
        //         newUnit.name.includes(mount.mount_name) &&
        //         newUnit.unit_card === unit.unit_card
        //     );
        //     return mount;
        //   });
        //   unit.battle_mounts = newMounts;
        // }
      }
    });
  };

  filterUnits();

  const getUnitGroup = (unit) => {
    return unit.custom_battle_permissions[0]?.general_unit
      ? "Lords"
      : unit.ui_unit_group.parent_group.onscreen_name;
  };

  const FactionGroups = () => {
    let groups = filteredRoster;
    groups = groups.reduce((acc, value) => {
      let x = getUnitGroup(value);
      if (!acc.find((obj) => obj === x)) acc.push(x);
      return acc;
    }, []);

    groups.sort((a, b) =>
      unitGroupData.data.tww.units.find(
        (obj) => obj.ui_unit_group.parent_group.onscreen_name === a
      )?.ui_unit_group.parent_group.order >
      unitGroupData.data.tww.units.find(
        (obj) => obj.ui_unit_group.parent_group.onscreen_name === b
      )?.ui_unit_group.parent_group.order
        ? 1
        : -1
    );

    return groups.map((_, i) => (
      <Box key={i} id={i} my="1rem">
        <Typography variant="h3" component="h2" align="center">
          {groups[i]}
        </Typography>
        <Grid container justify="center">
          {filteredRoster
            .filter((unit) => getUnitGroup(unit) === groups[i])
            .sort((a, b) => (a.multiplayer_cost > b.multiplayer_cost ? 1 : -1))
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
    ));
  };

  return (
    <Box my="1rem">
      <Box letterSpacing={5}>
        <Typography variant="h2" align="center">
          ROSTER
        </Typography>
      </Box>
      <Grid container justify="center" alignContent="center" direction="column">
        <div>
          <FactionGroups />
        </div>
      </Grid>
    </Box>
  );
};

export default FactionRoster;
