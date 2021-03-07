import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/.netlify/functions/apollo-graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query UnitGetter {
//         getUnits(faction: "wh_main_brt_bretonnia_mp_custom_battles_only") {
//           key
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
