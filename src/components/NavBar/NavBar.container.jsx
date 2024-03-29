import { Fragment, useState } from "react";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./NavBar.styles";

const NavBar = withStyles(styles)(({ classes }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleDrawer = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <AppBar position="static" color="secondary">
        {isMobile ? (
          <Fragment>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
              <Box mx="1rem">
                <Button
                  color="inherit"
                  target="_blank"
                  href="https://drive.google.com/file/d/1blvwkYSM3l7KW2Zf6t2Nra4eY7MSjP4d/view"
                  aria-label="Banner Rules"
                  rel="noreferrer"
                >
                  <Typography>BANNER RULES</Typography>
                </Button>
              </Box>
              <Box mx="1rem">
                <Button
                  color="inherit"
                  target="_blank"
                  href="https://twwstats.com"
                  aria-label="TWW Stats"
                  rel="noreferrer"
                >
                  <Typography>TWW STATS</Typography>
                </Button>
              </Box>
            </Drawer>
            <Toolbar>
              <IconButton
                onClick={handleDrawer}
                color="inherit"
                edge="start"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Fragment>
        ) : (
          <Box display="flex" justifyContent="center">
            <Toolbar>
              <Box mx="1.5rem">
                <Button
                  color="inherit"
                  target="_blank"
                  href="https://drive.google.com/file/d/1blvwkYSM3l7KW2Zf6t2Nra4eY7MSjP4d/view"
                  aria-label="Banner Rules"
                  rel="noreferrer"
                >
                  <Typography variant="h4">
                    <Box
                      className={classes["header--text"]}
                      fontWeight="fontWeightBold"
                      letterSpacing={4}
                      align="center"
                    >
                      BANNER RULES
                    </Box>
                  </Typography>
                </Button>
              </Box>
              <Box mx="1.5rem">
                <Button
                  color="inherit"
                  target="_blank"
                  href="https://twwstats.com"
                  aria-label="TWW Stats"
                  rel="noreferrer"
                >
                  <Typography variant="h4">
                    <Box
                      className={classes["header--text"]}
                      fontWeight="fontWeightBold"
                      letterSpacing={4}
                      align="center"
                    >
                      TWW STATS
                    </Box>
                  </Typography>
                </Button>
              </Box>
            </Toolbar>
          </Box>
        )}
      </AppBar>
    </Fragment>
  );
});

export default NavBar;
