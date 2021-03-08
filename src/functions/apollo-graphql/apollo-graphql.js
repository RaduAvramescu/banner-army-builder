const { ApolloServer, gql } = require("apollo-server-lambda");
const factionData = require("../../data/main.json");
const unitGroupData = require("../../data/ui_unit_groups.json");
const mountsAndPermissions = require("../../data/battle_mounts_and_custom_battle_permissions.json");

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
    mounted_unit: String
  }

  type Permissions {
    general_unit: String
    general_portrait: String
  }
`;

const resolvers = {
  Query: {
    getUnits: (_, { faction }) => {
      const element = factionData.filter((unit) => {
        if (unit.factions.some((el) => el.key === faction))
          if (!unit.key.includes("summoned")) {
            const elementNew = mountsAndPermissions.data.tww.units.find(
              (newUnit) => newUnit.unit === unit.key
            );
            if (
              elementNew &&
              elementNew.hasOwnProperty("custom_battle_permissions")
            )
              unit.custom_battle_permissions =
                elementNew.custom_battle_permissions;

            if (unit.caste !== "Lord" && unit.caste !== "Hero") return unit;
            unit.battle_mounts = mountsAndPermissions.data.tww.units.find(
              (mounts) => mounts.unit === unit.key
            ).battle_mounts;

            if (unit.battle_mounts?.find((o) => o.base_unit === unit.key))
              return unit;

            if (unit.battle_mounts.length < 1) return unit;
          }
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
