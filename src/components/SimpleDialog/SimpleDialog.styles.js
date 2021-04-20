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

export default styles;
