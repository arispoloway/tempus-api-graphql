import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";
import PlayerType from "./player";
import MapType from "./map";
import DemoType from "./demo";

export default new GraphQLObjectType({
  name: "Server",

  fields: () => ({
    id: { type: GraphQLInt },
    currentMap: { type: MapType },
    freeDisk: { type: GraphQLInt },
    gameVersion: { type: GraphQLInt },
    hostName: { type: GraphQLString },
    maxPlayers: { type: GraphQLInt },
    nextMap: { type: MapType },
    playerCount: { type: GraphQLInt },
    players: { type: new GraphQLList(new GraphQLNonNull(PlayerType)) },
    address: { type: GraphQLString },
    country: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    online: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    port: { type: GraphQLInt },
    shortname: { type: GraphQLString },
    demos: { type: new GraphQLList(new GraphQLNonNull(DemoType)) },
  }),
});
