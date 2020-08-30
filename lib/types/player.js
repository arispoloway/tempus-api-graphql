import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} from "graphql";

const Rank = new GraphQLObjectType({
  name: "Rank",

  fields: () => ({
    points: { type: new GraphQLNonNull(GraphQLFloat) },
    rank: { type: new GraphQLNonNull(GraphQLInt) },
    totalRanked: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
  }),
});

const Ranks = new GraphQLObjectType({
  name: "Ranks",

  fields: () => ({
    overall: { type: new GraphQLNonNull(Rank) },
    soldier: { type: new GraphQLNonNull(Rank) },
    demoman: { type: new GraphQLNonNull(Rank) },
  }),
});

const Stat = new GraphQLObjectType({
  name: "Stat",

  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    points: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const Stats = new GraphQLObjectType({
  name: "Stats",

  fields: () => ({
    bonus: { type: new GraphQLNonNull(Stat) },
    course: { type: new GraphQLNonNull(Stat) },
    map: { type: new GraphQLNonNull(Stat) },
    trick: { type: new GraphQLNonNull(Stat) },
  }),
});

const StatsCollection = new GraphQLObjectType({
  name: "StatsCollection",

  fields: () => ({
    pr: { type: new GraphQLNonNull(Stats) },
    wr: { type: new GraphQLNonNull(Stats) },
    top: { type: new GraphQLNonNull(Stats) },
  }),
});

export default new GraphQLObjectType({
  name: "Player",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    steamId: { type: new GraphQLNonNull(GraphQLString) },
    firstSeen: { type: new GraphQLNonNull(GraphQLFloat) },
    lastSeen: { type: new GraphQLNonNull(GraphQLFloat) },
    ranks: { type: new GraphQLNonNull(Ranks) },
    countryRanks: { type: new GraphQLNonNull(Ranks) },
    stats: { type: new GraphQLNonNull(StatsCollection) },
    // TODO missing all of the ranking information
  }),
});
