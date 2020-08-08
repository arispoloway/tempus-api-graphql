import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import PlayerType from "./player";
import MapType from "./map";
import ServerType from "./server";

export default new GraphQLObjectType({
  name: "Demo",

  fields: () => ({
    id: { type: GraphQLInt },
    map: { type: MapType },
    filename: { type: GraphQLString },
    date: { type: GraphQLFloat },
    url: { type: GraphQLString },
    recording: { type: GraphQLBoolean },
    requested: { type: GraphQLBoolean },
    expired: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
    uploader: { type: PlayerType },
    server: { type: ServerType },
  }),
});
