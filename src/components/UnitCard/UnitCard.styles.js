const styles = () => ({
  position_absolute: {
    position: "absolute",
  },
  unit_card: {
    width: "60px",
    height: "130px",
    top: "0px",
    left: "0px",
    "& img[alt$='Icon']": {
      bottom: "0px",
      left: "2px",
    },
    "& img[alt$='Category Icon']": {
      left: "19px",
    },
    "& img[alt$='Hover']": {
      display: "none",
    },
    "&:hover": {
      "& img[alt$='Hover']": {
        display: "block",
      },
    },
  },
  unit_card_top: {
    width: "100%",
    top: "5px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#c4941c",
  },
});

export default styles;
