import React from "react";

import { withStyles } from "@material-ui/core";
import { Typography, IconButton } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeBtnContainer: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
  },
  closeBtn: {
    color: "#a09d9a",
    background: `url("images/ui/skins/default/button_basic_pressed.png")`,
    height: "40px",
    width: "40px",
    backgroundSize: "contain",
    lineHeight: "40px",
    "&:hover": {
      color: "#fff",
      background: `url("images/ui/skins/default/button_basic_selected.png")`,
      backgroundSize: "contain",
    },
  },
  dialog: {
    border: "1px solid transparent",
    borderImage: `url("images/ui/skins/default/panel_back_border.png") 30 / 30px / 7px round`,
  },
  dialog__text_color: {
    color: "#c4941c",
  },
});

const SimpleDialog = withStyles(styles)((props) => {
  const { children, classes, onClose, open, ...other } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="simple-dialog-title"
      fullWidth
      maxWidth="xl"
      PaperProps={{ className: classes.dialog }}
    >
      <DialogTitle
        id="customized-dialog-title"
        disableTypography
        className={classes.root}
        {...other}
        onClose={onClose}
      >
        <Typography
          variant="h2"
          align="center"
          className={classes.dialog__text_color}
        >
          {props.title}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeBtnContainer}
            onClick={onClose}
          >
            <div className={classes.closeBtn}>X</div>
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
});

export default SimpleDialog;
