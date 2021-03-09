import React from "react";

import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Grid,
  FormControl,
  NativeSelect,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";

const factionsQuery = gql`
  query factionsGetter($include_non_mp: Boolean!) {
    getFactions(include_non_mp: $include_non_mp) {
      key
      subculture {
        subculture
        name
      }
      screen_name
      screen_adjective
      is_rebel
      mp_available
      flags_path
      flags_url
      name_group
    }
  }
`;

const FactionSelector = ({ handleFactionChange }) => {
  const { loading, error, data } = useQuery(factionsQuery, {
    variables: { include_non_mp: true },
  });

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <CircularProgress />
      </Box>
    );

  const factions = data.getFactions
    .slice()
    .sort((a, b) => (a.screen_name > b.screen_name ? 1 : -1));

  return (
    <Box my="1rem">
      <Grid container justify="center">
        <FormControl>
          <InputLabel htmlFor="faction-select">Faction</InputLabel>
          <NativeSelect
            defaultValue={"wh_dlc03_bst_beastmen"}
            onChange={(e) => handleFactionChange(e.target.value)}
            inputProps={{ id: "faction-select" }}
          >
            {factions.map((faction, i) => (
              <option key={i} value={faction.key}>
                {faction.screen_name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default FactionSelector;
