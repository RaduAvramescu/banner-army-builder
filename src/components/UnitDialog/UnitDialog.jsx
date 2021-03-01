import React from "react";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { onClose, open } = props;

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Lord/Hero Tabs"
          >
            <Tab label="Mounts" {...a11yProps(0)} />
            <Tab label="Spells" {...a11yProps(1)} />
            <Tab label="Abilities" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <List>
            {props.hasOwnProperty("mounts") &&
              props.mounts.map((el, i) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(el)}
                  key={i}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={el.name}
                      src={
                        require(`../../images/unit_card/card_icon/${el.image}.png`)
                          .default
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
                  onClick={() => handleListItemClick(el)}
                  key={i}
                >
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText primary={el.name} />
                </ListItem>
              ))}
          </List>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List>
            {props.hasOwnProperty("abilities") &&
              props.abilities.map((el, i) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(el)}
                  key={i}
                >
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText primary={el.name} />
                </ListItem>
              ))}
          </List>
        </TabPanel>
      </div>
    </Dialog>
  );
}

export default SimpleDialog;
