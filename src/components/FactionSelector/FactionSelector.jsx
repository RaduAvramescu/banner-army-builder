import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import { withStyles } from "@material-ui/core";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  openButton: {
    cursor: "pointer",
  },
  dialog: {
    backgroundColor: "black",
  },
  dialog__text_color: {
    color: "white",
  },
  dialog__faction_image: {
    cursor: "pointer",
    margin: "0.5rem 0.5rem",
    border: "2px solid grey",
    transition: "0.1s ease-in-out",
    "&:hover": {
      borderColor: "white",
    },
  },
});

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

  const FactionCategories = () => {
    let categories = JSON.parse(JSON.stringify(data.getFactions));
    categories = categories.reduce((acc, value, index) => {
      let x = categories[index].subculture.name;
      if (!acc.find((subculture) => subculture === x)) acc.push(x);
      return acc;
    }, []);
    categories = categories.sort((a, b) => (a > b ? 1 : -1));
    return categories;
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle
        disableTypography
        className={(classes.root, classes.dialog)}
        {...other}
      >
        <Typography
          variant="h2"
          align="center"
          className={classes.dialog__text_color}
        >
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogOpenButton = withStyles(styles)((props) => {
    const { classes } = props;
    return (
      <Typography variant="h2" align="center" onClick={handleClickOpen}>
        <span className={classes.openButton}>CHOOSE FACTION</span>
      </Typography>
    );
  });

  const DialogContent = withStyles(styles)((props) => {
    const { classes } = props;
    return (
      <MuiDialogContent className={classes.dialog}>
        {FactionCategories().map((category, i) => (
          <Box my="1rem">
            <Typography
              align="center"
              variant="h4"
              className={classes.dialog__text_color}
              key={i}
            >
              {category.toUpperCase()}
            </Typography>

            <Box display="flex" justifyContent="center" flexWrap="wrap">
              {factions
                .filter((faction, i) => faction.screen_name === category)
                .map((faction, i) => (
                  <img
                    src={`images/ui/flags/${faction.flags_url}/mon_64.png`}
                    onClick={() => handleClose(faction)}
                    className={classes.dialog__faction_image}
                    alt={faction.screen_name}
                    title={faction.screen_name}
                  />
                ))}
              {factions
                .filter(
                  (faction, i) =>
                    faction.subculture.name === category &&
                    faction.screen_name !== category
                )
                .map((faction, i) => (
                  <img
                    src={`images/ui/flags/${faction.flags_url}/mon_64.png`}
                    onClick={() => handleClose(faction)}
                    className={classes.dialog__faction_image}
                    alt={faction.screen_name}
                    title={faction.screen_name}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </MuiDialogContent>
    );
  });

  return (
    <React.Fragment>
      <DialogOpenButton />
      <Box border={1}>
        <Dialog
          onClose={handleClose}
          open={open}
          aria-labelledby="simple-dialog-title"
          fullWidth
          maxWidth="xl"
          border=""
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            FACTIONS
          </DialogTitle>
          <DialogContent />
        </Dialog>
      </Box>
    </React.Fragment>
  );
};

export default FactionSelector;
