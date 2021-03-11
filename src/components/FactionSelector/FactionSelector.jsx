import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  ButtonBase,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { IconButton, closeIcon } from "@material-ui/icons";

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (faction) => {
    setOpen(false);
    if (faction?.key) handleFactionChange(faction.key);
  };

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
    <React.Fragment>
      <Typography variant="h2" align="center" onClick={handleClickOpen}>
        <span className="dialog__faction_image">CHOOSE FACTION</span>
      </Typography>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="simple-dialog-title"
        fullWidth
        maxWidth="xl"
      >
        <Grid container justify="center" className="dialog">
          <DialogContent>
            <Box mb="1rem">
              <Typography
                variant="h2"
                align="center"
                className="dialog--text_color"
              >
                FACTIONS
              </Typography>
            </Box>
            {factions.map((faction, i) => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                px="5rem"
              >
                <img
                  src={`images/ui/flags/${faction.flags_url}/mon_64.png`}
                  onClick={() => handleClose(faction)}
                  className="dialog__faction_image"
                />
                <Typography
                  align="center"
                  variant="h4"
                  className="dialog--text_color"
                  key={i}
                >
                  &nbsp;
                  {faction.screen_name}
                </Typography>
              </Box>
            ))}
          </DialogContent>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default FactionSelector;
