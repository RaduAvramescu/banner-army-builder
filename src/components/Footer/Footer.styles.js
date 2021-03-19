const styles = () => ({
  footer: {
    backgroundColor: "black",
    textShadow: "1px 1px 1px black",
  },
  footer__link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover div": {
      transition: "opacity 0.3s ease-out",
      opacity: "0.4",
    },
  },
});

export default styles;
