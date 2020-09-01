import "regenerator-runtime/runtime";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
} from "graphql";
import { allMaps, allServers, rankingsByType } from "./tempus";
import MapType from "./types/map";
import Map from "./models/map";
import PlayerType from "./types/player";
import Player from "./models/player";
import RecordType from "./types/record";
import Record from "./models/record";
import DemoType from "./types/demo";
import Demo from "./models/demo";
import ServerType from "./types/server";
import Server from "./models/server";
import ActivityType from "./types/activity";
import Activity from "./models/activity";
import RankingTypeEnum from "./types/ranking_type_enum";
import RankingType from "./types/ranking";
import Ranking from "./models/ranking";

const RankingListingType = new GraphQLObjectType({
  name: "RankingListing",

  fields: () => ({
    count: { type: GraphQLInt },
    players: { type: new GraphQLList(RankingType) },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",

  fields: () => ({
    map: {
      type: MapType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => new Map(args),
    },
    maps: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MapType))),
      args: {
        search: { type: GraphQLString },
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(root, args) {
        let maps = await allMaps.load();
        if (args.search)
          maps = maps.filter((map) => map.name.includes(args.search));
        if (args.start) maps = maps.slice(args.start - 1);
        if (args.limit) maps = maps.slice(0, args.limit);
        return maps.map((m) => new Map(m));
      },
    },
    player: {
      type: PlayerType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => new Player(args),
    },
    record: {
      type: RecordType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => new Record(args),
    },
    demo: {
      type: DemoType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => new Demo(args),
    },
    server: {
      type: ServerType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => new Server(args),
    },
    servers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ServerType))),
      args: {
        search: { type: GraphQLString },
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(root, args) {
        let servers = await allServers.load();
        if (args.search)
          servers = servers.filter((server) =>
            server.name.includes(args.search)
          );
        if (args.start) servers = servers.slice(args.start - 1);
        if (args.limit) servers = servers.slice(0, args.limit);
        return servers.map((s) => new Server(s));
      },
    },
    activity: {
      type: new GraphQLNonNull(ActivityType),
      resolve: () => new Activity(),
    },
    rankings: {
      type: new GraphQLNonNull(RankingListingType),
      args: {
        start: { type: GraphQLInt },
        type: { type: new GraphQLNonNull(RankingTypeEnum) },
      },
      async resolve(root, args) {
        const rankings = await rankingsByType.load(args);
        return {
          count: rankings.count,
          players: rankings.players.map((s) => new Ranking(s)),
        };
      },
    },
    // TODO missing search for players and convenience things for related fields
    // TODO missing convenience fields that wrap the actual API
  }),
});

const schema = new GraphQLSchema({ query: QueryType });

export { schema };
