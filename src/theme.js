import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".red": {
          color: "#ce2029",
        },
        ".green": {
          color: "#64e764",
        },
        ".yellow": {
          color: "#fff36d",
        },
        ".imgResponsive": {
          maxWidth: "100%",
          height: "auto",
        },
      },
    },
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
