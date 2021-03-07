const { ApolloServer, gql } = require("apollo-server-lambda");
const factionData = require("../../data/main.json");
const unitGroupData = require("../../data/ui_unit_groups.json");

const typeDefs = gql`
  type Query {
    getUnits(faction: String!): [Unit!]
  }

  type Unit {
    id: String
    key: String
    name: String
    caste: String
    category: String
    multiplayer_cost: Int
    unit_size: Int
    ror: Boolean
    category_icon: String
    unit_card: String
    ui_unit_group: UnitGroup!
    abilities: [Abilities]
    spells: [Spells]
    battle_mounts: [Mounts]
  }

  type UnitGroup {
    key: String
    name: String
    icon: String
    tooltip: String
    parent_group: ParentGroup!
  }

  type ParentGroup {
    key: String
    onscreen_name: String
    icon: String
    order: Int
    mp_cap: Int
  }

  type Abilities {
    name: String
  }

  type Spells {
    name: String
  }

  type Mounts {
    mount_name: String
    price: Int
    icon_name: String
  }
`;

const resolvers = {
  Query: {
    getUnits: (_, { faction }) => {
      const element = factionData.filter((unit) => {
        if (!unit.key.includes("summoned"))
          if (unit.factions.some((el) => el.key === faction)) return unit;
      });
      return element;
    },
  },

  Unit: {
    ui_unit_group: (parent) => {
      const element = unitGroupData.data.tww.units.find(
        (unit) => unit.unit === parent.key
      );
      return element.ui_unit_group;
    },

    abilities: (parent) => {
      const element = factionData.find((unit) => unit.key === parent.key);
      if (element && element.hasOwnProperty("abilities"))
        return element.abilities;
    },

    spells: (parent) => {
      const element = factionData.find((unit) => unit.key === parent.key);
      if (element && element.hasOwnProperty("spells")) return element.spells;
    },

    battle_mounts: (parent) => {
      const element = factionData.find((unit) => unit.key === parent.key);
      if (element && element.hasOwnProperty("battle_mounts"))
        return element.battle_mounts;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
