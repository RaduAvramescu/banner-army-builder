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
  const [spell, setSpell] = React.useState([]);
  const [selectedMount, setSelectedMount] = React.useState({});
  const [selectedSpell, setSelectedSpell] = React.useState([]);
  const { onClose, open, battle_mounts, spells } = props;

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

    if (type === "spell") {
      let newSpells = [...spell];
      let selectedSpells = [...selectedSpell];

      if (!newSpells.find((el) => el.name === value.name)) {
        newSpells.push(value);
        selectedSpells.push(index);
      } else {
        newSpells = newSpells.filter((el) => {
          if (el !== value) return el;
        });
        selectedSpells = selectedSpells.filter((el) => {
          return el !== index;
        });
      }

      setSelectedSpell(selectedSpells);
      setSpell(newSpells);
    }
  };

  const getIndex = () => {
    if (battle_mounts?.length === 0) return 0;
    return 1;
  };

  const handleClose = () => {
    onClose(mount, spell);
    setSelectedSpell([]);
    setSelectedMount({});
    setMount({});
    setSpell([]);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Lord/Hero Tabs"
          variant="fullWidth"
        >
          {battle_mounts?.length !== 0 && (
            <Tab label="Mounts" {...a11yProps(0)} />
          )}
          {spells?.length !== 0 && <Tab label="Spells" {...a11yProps(1)} />}
        </Tabs>
      </AppBar>
      {battle_mounts?.length !== 0 && (
        <TabPanel value={value} index={0}>
          <List>
            {battle_mounts?.map((el, i) => (
              <ListItem
                button
                selected={selectedMount === i}
                onClick={() => handleListItemClick(el, "mount", i)}
                key={i}
              >
                <ListItemAvatar>
                  <Avatar alt={el.mount_name} src={`images/${el.icon_name}`}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.mount_name} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      )}
      <TabPanel value={value} index={getIndex(spells)}>
        <List>
          {spells?.map((el, i) => (
            <ListItem
              button
              selected={selectedSpell.includes(i)}
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
