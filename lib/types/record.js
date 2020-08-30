import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import PlayerType from "./player";
import MapType from "./map";
import TiersType from "./tiers";
import DemoType from "./demo";
import ServerType from "./server";
import ZoneType from "./zone";
import ClassTypeEnum from "./class_type_enum";

export default new GraphQLObjectType({
  name: "Record",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    player: { type: new GraphQLNonNull(PlayerType) },
    duration: { type: new GraphQLNonNull(GraphQLFloat) },
    rank: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: new GraphQLNonNull(GraphQLFloat) },
    tiers: { type: new GraphQLNonNull(TiersType) },
    map: { type: new GraphQLNonNull(MapType) },
    zone: { type: new GraphQLNonNull(ZoneType) },
    demo: { type: DemoType },
    class: { type: new GraphQLNonNull(ClassTypeEnum) },
    demoStartTick: { type: GraphQLInt },
    demoEndTick: { type: GraphQLInt },
    server: { type: new GraphQLNonNull(ServerType) },
  }),
});
