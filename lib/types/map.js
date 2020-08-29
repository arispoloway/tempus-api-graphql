import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import Tiers from "./tiers";
import Run from "./run";
import ZoneTypeEnum from "./zone_type_enum";
import RecordType from "./record";
import PlayerType from "./player";

const Author = new GraphQLObjectType({
  name: "Author",

  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    player: {
      type: PlayerType,
    },
  }),
});

const MapVideos = new GraphQLObjectType({
  name: "MapVideos",

  fields: () => ({
    soldier: {
      type: GraphQLString,
      resolve: (videos) =>
        videos.soldier && `https://youtube.com/watch?v=${videos.soldier}`,
    },
    demoman: {
      type: GraphQLString,
      resolve: (videos) =>
        videos.demoman && `https://youtube.com/watch?v=${videos.demoman}`,
    },
  }),
});

const ClassRunListing = new GraphQLObjectType({
  name: "ClassRunListing",

  fields: () => ({
    soldier: { type: new GraphQLList(Run) },
    demoman: { type: new GraphQLList(Run) },
  }),
});

const ClassRecordListing = new GraphQLObjectType({
  name: "ClassRecordListing",

  fields: () => ({
    soldier: { type: new GraphQLList(RecordType) },
    demoman: { type: new GraphQLList(RecordType) },
  }),
});

export default new GraphQLObjectType({
  name: "Map",
  description: "A jump map",

  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    authors: { type: new GraphQLList(Author) },
    videos: { type: MapVideos },
    tiers: { type: Tiers },
    runs: { type: ClassRunListing },
    records: {
      type: ClassRecordListing,
      args: {
        zoneType: { type: ZoneTypeEnum },
        zoneId: { type: GraphQLInt },
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
    },
  }),
});
