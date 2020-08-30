import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import PlayerType from "./player";
import MapType from "./map";
import ServerType from "./server";

export default new GraphQLObjectType({
  name: "Demo",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    map: { type: new GraphQLNonNull(MapType) },
    filename: { type: GraphQLString },
    date: { type: new GraphQLNonNull(GraphQLFloat) },
    url: { type: GraphQLString },
    recording: { type: new GraphQLNonNull(GraphQLBoolean) },
    requested: { type: new GraphQLNonNull(GraphQLBoolean) },
    expired: { type: new GraphQLNonNull(GraphQLBoolean) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    uploader: { type: PlayerType },
    server: { type: new GraphQLNonNull(ServerType) },
  }),
});
