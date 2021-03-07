const { ApolloServer, gql } = require("apollo-server-lambda");
const factionData = require("../../data/main.json");

const customers = [
  { id: 1, name: "Idiot 1" },
  { id: 2, name: "Idiot 2" },
  { id: 3, name: "Idiot 3" },
];

const typeDefs = gql`
  type Query {
    getUnits: [Unit]
  }

  type Unit {
    tww_version: String
    id: String
    name: String
    multiplayer_cost: Int
  }
`;

const resolvers = {
  Query: {
    getUnits: (_, { id }) => {
      const response = factionData;
      return response;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
