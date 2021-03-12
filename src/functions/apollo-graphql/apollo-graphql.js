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
    mounted_unit: String
    icon_name: String
  }

  type Permissions {
    general_unit: Boolean
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
        if (include_non_mp) if (faction.mp_available) return faction;
      });
      return factions;
    },

    getUnits: (_, { faction }) => {
      const units = factionData.filter((unit) => {
        if (unit.factions.some((u) => u.key === faction))
          if (!unit.key.includes("summoned"))
            if (!unit.elector && !unit.blessed && !unit.crafted && !unit.tech)
              return unit;
      });

      return units;
    },
  },

  Faction: {
    subculture: (parent) => {
      const unit = factionsData.data.tww.factions.find(
        (faction) => faction.key === parent.key
      );
      return unit.subculture;
    },
  },

  Unit: {
    ui_unit_group: (parent) => {
      const unit = unitGroupData.data.tww.units.find(
        (u) => u.unit === parent.key
      );
      return unit.ui_unit_group;
    },

    abilities: (parent) => {
      const unit = factionData.find((u) => u.key === parent.key);
      return unit.abilities;
    },

    spells: (parent) => {
      const unit = factionData.find((u) => u.key === parent.key);
      return unit.spells;
    },

    battle_mounts: (parent) => {
      const unit = mountsAndPermissions.data.tww.units.find(
        (u) => u.unit === parent.key
      );
      return unit.battle_mounts;
    },

    custom_battle_permissions: (parent) => {
      const unit = mountsAndPermissions.data.tww.units.find(
        (u) => u.unit === parent.key
      );
      if (unit.custom_battle_permissions) return unit.custom_battle_permissions;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
