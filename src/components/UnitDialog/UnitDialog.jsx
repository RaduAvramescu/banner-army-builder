import React from "react";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogActions,
  Dialog,
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SimpleDialog(props) {
  const [value, setValue] = React.useState(0);
  const [mount, setMount] = React.useState({});
  const [spell, setSpell] = React.useState({});
  const [selectedMount, setSelectedMount] = React.useState();
  const { onClose, open } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleListItemClick = (value, type, index) => {
    if (type === "mount") {
      if (selectedMount === index) setSelectedMount();
      else setSelectedMount(index);

      if (value === mount) setMount({});
      else setMount(value);
    }

    if (type === "spell") setSpell(value);
  };

  const handleClose = () => {
    onClose(mount, spell);
    setSelectedMount();
    setMount({});
    setSpell({});
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <AppBar position="static" color="transparent">
        <Tabs value={value} onChange={handleChange} aria-label="Lord/Hero Tabs">
          <Tab label="Mounts" {...a11yProps(0)} />
          <Tab label="Spells" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          {props.hasOwnProperty("mounts") &&
            props.mounts.map((el, i) => (
              <ListItem
                button
                selected={selectedMount === i}
                onClick={() => handleListItemClick(el, "mount", i)}
                key={i}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={el.name}
                    src={
                      require(`../../images/mounts/${el.unit_card}.png`).default
                    }
                  >
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.name} />
              </ListItem>
            ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {props.hasOwnProperty("spells") &&
            props.spells.map((el, i) => (
              <ListItem
                button
                onClick={() => handleListItemClick(el, "spell", i)}
                key={i}
              >
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={el.name} />
              </ListItem>
            ))}
        </List>
      </TabPanel>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button autoFocus onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog;
