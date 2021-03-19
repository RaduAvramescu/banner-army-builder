import React from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  btn__container: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
  },
  btn: {
    color: "#a09d9a",
    background: `url("images/ui/skins/default/button_basic.png") no-repeat`,
    backgroundPosition: "-0px -0px",
    height: "40px",
    width: "40px",
    lineHeight: "40px",
    "&:hover": {
      backgroundPosition: "-0px -40px",
      color: "#fff",
    },
  },
  dialog: {
    border: "1px solid transparent",
    borderImage: `url("images/ui/skins/default/panel_back_border.png") 30 / 30px / 7px round`,
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
        <Typography variant="h2" align="center">
          {props.title}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.btn__container}
            onClick={onClose}
          >
            <div className={classes.btn}>X</div>
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
});

export default SimpleDialog;
