import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: "#c4941c",
        opacity: "0.6",
      },
    },
    MuiAppBar: {
      colorSecondary: {
        color: "c4941c",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "black",
      },
    },
    PrivateTabIndicator: {
      colorPrimary: { backgroundColor: "#c4941c" },
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
          color: "inherit",
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
          backgroundColor: "#654b0e",
        },
        "&$selected": {
          backgroundColor: "#654b0e",
          "&:hover": {
            backgroundColor: "#654b0e",
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
      containedSecondary: {
        color: "#c4941c",
      },
      textPrimary: {
        color: "#c4941c",
      },
    },
  },
  palette: {
    background: { default: "#fafafa" },
    secondary: { main: "#000" },
    text: {
      primary: "#c4941c",
    },
  },
  typography: {
    fontFamily: ['"Caslon Antique"', "serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
