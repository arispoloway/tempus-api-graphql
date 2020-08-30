import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";

const Rank = new GraphQLObjectType({
  name: "Rank",

  fields: () => ({
    points: { type: GraphQLFloat },
    rank: { type: GraphQLInt },
    totalRanked: { type: GraphQLInt },
    title: { type: GraphQLString },
  }),
});

const Ranks = new GraphQLObjectType({
  name: "Ranks",

  fields: () => ({
    overall: { type: Rank },
    soldier: { type: Rank },
    demoman: { type: Rank },
  }),
});

const Stat = new GraphQLObjectType({
  name: "Stat",

  fields: () => ({
    count: { type: GraphQLInt },
    points: { type: GraphQLInt },
  }),
});

const Stats = new GraphQLObjectType({
  name: "Stats",

  fields: () => ({
    bonus: { type: Stat },
    course: { type: Stat },
    map: { type: Stat },
    trick: { type: Stat },
  }),
});

const StatsCollection = new GraphQLObjectType({
  name: "StatsCollection",

  fields: () => ({
    pr: { type: Stats },
    wr: { type: Stats },
    top: { type: Stats },
  }),
});

export default new GraphQLObjectType({
  name: "Player",

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    steamId: { type: GraphQLString },
    firstSeen: { type: GraphQLFloat },
    lastSeen: { type: GraphQLFloat },
    ranks: { type: Ranks },
    countryRanks: { type: Ranks },
    stats: { type: StatsCollection },
    // TODO missing all of the ranking information
  }),
});
