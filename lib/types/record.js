import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import PlayerType from "./player";
import MapType from "./map";
import TiersType from "./tiers";
import DemoType from "./demo";
import ServerType from "./server";
import ZoneType from "./zone";

export default new GraphQLObjectType({
  name: "Record",

  fields: () => ({
    id: { type: GraphQLInt },
    player: { type: PlayerType },
    duration: { type: GraphQLFloat },
    rank: { type: GraphQLInt },
    date: { type: GraphQLFloat },
    tiers: { type: TiersType },
    map: { type: MapType },
    zone: { type: ZoneType },
    demo: { type: DemoType },
    class: { type: GraphQLString },
    demoStartTick: { type: GraphQLInt },
    demoEndTick: { type: GraphQLInt },
    server: { type: ServerType },
  }),
});
