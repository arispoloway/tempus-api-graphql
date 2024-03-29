import "regenerator-runtime/runtime";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema,
} from "graphql";
import { newCachedTempusFetcher } from "./tempus";
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
import fetchResponseByURL from "./utils/fetch_response_by_url";

const RankingListingType = new GraphQLObjectType({
  name: "RankingListing",

  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    entries: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(RankingType))
      ),
    },
  }),
});

function newTempusSchema(tempus) {
  const context = { tempus };

  const QueryType = new GraphQLObjectType({
    name: "Query",

    fields: () => ({
      map: {
        type: MapType,
        args: {
          name: { type: GraphQLString },
          id: { type: GraphQLInt },
        },
        resolve: (root, args) => new Map(context, args),
      },
      maps: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MapType))),
        args: {
          search: { type: GraphQLString },
          start: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        async resolve(root, args) {
          let maps = await context.tempus.allMaps.load();
          if (args.search)
            maps = maps.filter((map) => map.name.includes(args.search));
          if (args.start) maps = maps.slice(args.start - 1);
          if (args.limit) maps = maps.slice(0, args.limit);
          return maps.map((m) => new Map(context, m));
        },
      },
      player: {
        type: PlayerType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (root, args) => new Player(context, args),
      },
      record: {
        type: RecordType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (root, args) => new Record(context, args),
      },
      demo: {
        type: DemoType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (root, args) => new Demo(context, args),
      },
      server: {
        type: ServerType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: (root, args) => new Server(context, args),
      },
      servers: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(ServerType))
        ),
        args: {
          search: { type: GraphQLString },
          start: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        async resolve(root, args) {
          let servers = await context.tempus.allServers.load();
          if (args.search)
            servers = servers.filter((server) =>
              server.name.includes(args.search)
            );
          if (args.start) servers = servers.slice(args.start - 1);
          if (args.limit) servers = servers.slice(0, args.limit);
          return servers.map((s) => new Server(context, s));
        },
      },
      activity: {
        type: new GraphQLNonNull(ActivityType),
        resolve: () => new Activity(context),
      },
      players: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(PlayerType))
        ),
        args: {
          search: { type: GraphQLString },
          start: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        async resolve(root, args) {
          let players = await context.tempus.playerSearch.load(args.search);
          if (args.start) players = players.slice(args.start - 1);
          if (args.limit) players = players.slice(0, args.limit);
          return players.map((m) => new Player(context, m));
        },
      },
      rankings: {
        type: new GraphQLNonNull(RankingListingType),
        args: {
          start: { type: GraphQLInt },
          type: { type: new GraphQLNonNull(RankingTypeEnum) },
        },
        async resolve(root, args) {
          const rankings = await context.tempus.rankingsByType.load(args);
          return {
            count: rankings.count,
            entries: rankings.players.map((s) => new Ranking(context, s)),
          };
        },
      },
    }),
  });

  return new GraphQLSchema({ query: QueryType });
}

const schema = newTempusSchema(newCachedTempusFetcher(fetchResponseByURL));

export { schema, newTempusSchema, newCachedTempusFetcher };
