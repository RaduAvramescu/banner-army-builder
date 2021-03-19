const styles = () => ({
  btn: {
    background: `url("images/ui/skins/default/button_cycle.png") no-repeat`,
    backgroundPosition: "-0px -0px",
    width: "366px",
    height: "60px",
    "&:hover": {
      backgroundPosition: "-0px -60px",
      opacity: "1",
    },
  },
  dialog__faction_image: {
    cursor: "pointer",
    margin: "0.5rem 0.5rem",
    border: "2px solid grey",
    transition: "0.3s ease-in-out",
    "&:hover": {
      borderColor: "#c4941c",
    },
  },
});

export default styles;
