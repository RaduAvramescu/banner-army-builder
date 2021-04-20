import { Fragment, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { withStyles, Box, Typography, Button } from "@material-ui/core";
import Loader from "../Loader";
import SimpleDialog from "../SimpleDialog";
import styles from "./FactionSelector.styles";

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

  if (loading || error)
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <Loader />
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

  const DialogOpenButton = withStyles(styles)((props) => {
    const { classes } = props;
    return (
      <Box display="flex" justifyContent="center" my="1rem">
        <Button onClick={handleClickOpen} className={classes.btn}>
          <Typography component="span" variant="h5" align="center">
            SELECT FACTION
          </Typography>
        </Button>
      </Box>
    );
  });

  const DialogContent = withStyles(styles)((props) => {
    const { classes } = props;
    return FactionCategories().map((category, i) => (
      <Box key={i} id={i} my="1rem">
        <Typography align="center" variant="h4" key={i}>
          {category.toUpperCase()}
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {factions
            .filter((faction, i) => faction.screen_name === category)
            .map((faction, i) => (
              <img
                key={i}
                id={i}
                src={`images/ui/flags/${faction.flags_url}/mon_64.png`}
                onClick={() => handleClose(faction)}
                className={classes.dialog__faction_image}
                alt={faction.screen_name}
                title={faction.screen_name}
                height="64px"
                width="64px"
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
                key={i}
                id={i}
                src={`images/ui/flags/${faction.flags_url}/mon_64.png`}
                onClick={() => handleClose(faction)}
                className={classes.dialog__faction_image}
                alt={faction.screen_name}
                title={faction.screen_name}
                height="64px"
                width="64px"
              />
            ))}
        </Box>
      </Box>
    ));
  });

  return (
    <Fragment>
      <DialogOpenButton />
      <SimpleDialog open={open} onClose={handleClose} title="FACTIONS">
        <DialogContent />
      </SimpleDialog>
    </Fragment>
  );
};

export default FactionSelector;
