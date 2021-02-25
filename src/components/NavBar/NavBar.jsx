import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawer = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="secondary">
        {isMobile ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <Box display="flex" justifyContent="center">
            <Toolbar>
              <Box mx="3rem">
                <Button
                  color="inherit"
                  target="_blank"
                  href="https://drive.google.com/file/d/1blvwkYSM3l7KW2Zf6t2Nra4eY7MSjP4d/view"
                  aria-label="Banner Rules"
                  rel="noreferrer"
                >
                  <Typography variant="h4">
                    <Box
                      className="headerText"
                      fontWeight="fontWeightBold"
                      letterSpacing={2}
                      align="center"
                    >
                      BANNER RULES
                    </Box>
                  </Typography>
                </Button>
              </Box>
            </Toolbar>
          </Box>
        )}
      </AppBar>
    </React.Fragment>
  );
}
