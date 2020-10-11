import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import Tiers from "./tiers";
import ZoneTypeEnum from "./zone_type_enum";
import ZoneType from "./zone";
import RecordType from "./record";
import PlayerType from "./player";
import ClassTypeEnum from "./class_type_enum";

const Author = new GraphQLObjectType({
  name: "Author",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    mapCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (author) => author.map_count,
    },
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

const Zones = new GraphQLObjectType({
  name: "Zones",

  fields: () => ({
    checkpoint: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ZoneType))),
    },
    linear: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ZoneType))),
    },
    map: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ZoneType))),
    },
    mapEnd: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ZoneType))),
    },
  }),
});

export default new GraphQLObjectType({
  name: "Map",
  description: "A jump map",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Author))),
    },
    videos: { type: new GraphQLNonNull(MapVideos) },
    tiers: { type: new GraphQLNonNull(Tiers) },
    zones: { type: new GraphQLNonNull(Zones) },
    records: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
      args: {
        zoneType: { type: ZoneTypeEnum },
        zoneId: { type: GraphQLInt },
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        class: { type: new GraphQLNonNull(ClassTypeEnum) },
      },
    },
    record: {
      type: RecordType,
      args: {
        zoneType: { type: ZoneTypeEnum },
        zoneId: { type: GraphQLInt },
        playerId: { type: new GraphQLNonNull(GraphQLInt) },
        class: { type: new GraphQLNonNull(ClassTypeEnum) },
      },
    },
    wr: {
      type: RecordType,
      args: {
        class: { type: new GraphQLNonNull(ClassTypeEnum) },
      },
    },
  }),
});
