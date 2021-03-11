import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        footer: {
          color: "white",
          backgroundColor: "black",
          textShadow: "1px 1px 1px black",
        },
        ".headerText": {
          textShadow: "2px 2px 2px black",
        },
        ".footerLink": {
          textDecoration: "none",
          color: "white",
          "&:hover div": {
            transition: "opacity 0.3s ease-out",
            opacity: "0.4",
          },
        },
      },
    },
    MuiListItem: {
      root: {
        "&:hover": {
          backgroundColor: "orange",
        },
        "&$selected": {
          backgroundColor: "orange",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
    },
    MuiButton: {
      root: {
        "&:hover": {
          transition: "opacity 0.3s ease-out",
          backgroundColor: "inherit",
          opacity: 0.4,
        },
      },
    },
  },
  palette: {
    background: { default: "#fff" },
    secondary: { main: "#000" },
  },
  typography: {
    fontFamily: ['"Caslon Antique"', "serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
