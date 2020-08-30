import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import Tiers from "./tiers";
import ZoneTypeEnum from "./zone_type_enum";
import ZoneType from "./zone";
import RecordType from "./record";
import PlayerType from "./player";

const Author = new GraphQLObjectType({
  name: "Author",

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    mapCount: { type: GraphQLInt, resolve: (author) => author.map_count },
    player: { type: PlayerType },
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

const ClassRecordListing = new GraphQLObjectType({
  name: "ClassRecordListing",

  fields: () => ({
    zone: { type: ZoneType },
    tiers: { type: Tiers },
    soldier: { type: new GraphQLList(RecordType) },
    demoman: { type: new GraphQLList(RecordType) },
  }),
});

const Zones = new GraphQLObjectType({
  name: "Zones",

  fields: () => ({
    checkpoint: { type: new GraphQLList(ZoneType) },
    linear: { type: new GraphQLList(ZoneType) },
    map: { type: new GraphQLList(ZoneType) },
    mapEnd: { type: new GraphQLList(ZoneType) },
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
    zones: { type: Zones },
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
