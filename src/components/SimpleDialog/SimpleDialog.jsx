import React from "react";

import { withStyles } from "@material-ui/core";
import { Typography, IconButton } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
  dialog: {
    backgroundColor: "black",
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
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
});

export default SimpleDialog;
