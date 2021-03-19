const styles = () => ({
  "@global": {
    "@keyframes useRotate": {
      "25%": {
        transform: "rotate(0deg)",
      },
      "75%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  },
  loader: {
    width: "48px",
    height: "48px",
    backgroundImage: `url("images/ui/skins/default/loading.png")`,
    animation: "useRotate 1s infinite linear",
  },
});

export default styles;
