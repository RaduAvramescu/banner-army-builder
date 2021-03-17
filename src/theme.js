import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "black",
      },
    },
    PrivateTabIndicator: {
      colorPrimary: { backgroundColor: "white" },
    },
    MuiDialogContent: {
      root: {
        msOverflowStyle: "none",
        overflow: "-moz-scrollbars-none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
    MuiCssBaseline: {
      "@global": {
        footer: {
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
          backgroundColor: "#995400",
        },
        "&$selected": {
          backgroundColor: "#995400",
          "&:hover": {
            backgroundColor: "#995400",
          },
        },
      },
    },
    MuiButton: {
      textPrimary: {
        color: "white",
      },
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
    background: { default: "#fafafa" },
    secondary: { main: "#000" },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: ['"Caslon Antique"', "serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
