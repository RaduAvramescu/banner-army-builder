import React from "react";
import {
  withStyles,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import styles from "./SimpleDialog.styles";

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
