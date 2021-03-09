const { ApolloServer, gql } = require("apollo-server-lambda");
const factionData = require("../../data/main.json");
const factionsData = require("../../data/factions.json");
const unitGroupData = require("../../data/ui_unit_groups.json");
const mountsAndPermissions = require("../../data/battle_mounts_and_custom_battle_permissions.json");

const typeDefs = gql`
  type Query {
    getFactions(include_non_mp: Boolean!): [Faction!]
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
    custom_battle_permissions: [Permissions]
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
    base_unit: String
    mount_name: String
    multiplayer_cost: Int
    mounted_unit: String
    icon_name: String
  }

  type Permissions {
    general_unit: String
    general_portrait: String
  }

  type Faction {
    key: String
    subculture: Subculture
    screen_name: String
    screen_adjective: String
    is_rebel: Boolean
    mp_available: Boolean
    flags_path: String
    flags_url: String
    name_group: String
  }

  type Subculture {
    subculture: String
    name: String
  }
`;

const resolvers = {
  Query: {
    getFactions: (_, { include_non_mp }) => {
      const factions = factionsData.data.tww.factions?.filter((faction) => {
        if (include_non_mp === true)
          if (faction.mp_available === true)
            if (
              faction.screen_name === faction.subculture.name ||
              faction.key === "wh_dlc03_bst_beastmen"
            )
              return faction;
      });
      return factions;
    },

    getUnits: (_, { faction }) => {
      const units = factionData.filter((unit) => {
        if (unit.factions.some((el) => el.key === faction))
          if (!unit.key.includes("summoned")) return unit;
      });

      return units;
    },
  },

  Faction: {
    subculture: (parent) => {
      const element = factionsData.data.tww.factions.find(
        (faction) => faction.key === parent.key
      );
      if (element && element.hasOwnProperty("subculture"))
        return element.subculture;
    },
  },

  Unit: {
    ui_unit_group: (parent) => {
      const element = unitGroupData.data.tww.units.find(
        (unit) => unit.unit === parent.key
      );
      if (element && element.hasOwnProperty("ui_unit_group"))
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
      const element = mountsAndPermissions.data.tww.units.find(
        (unit) => unit.unit === parent.key
      );
      if (element && element.hasOwnProperty("battle_mounts"))
        return element.battle_mounts;
    },

    custom_battle_permissions: (parent) => {
      const element = mountsAndPermissions.data.tww.units.find(
        (unit) => unit.unit === parent.key
      );
      if (element && element.hasOwnProperty("custom_battle_permissions"))
        return element.custom_battle_permissions;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
