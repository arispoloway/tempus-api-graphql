import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import MapType from "./map";

export default new GraphQLObjectType({
  name: "Zone",
  description: "A jump map",

  fields: () => ({
    id: { type: GraphQLInt },
    map: { type: MapType },
    type: { type: GraphQLString },
    zoneindex: { type: GraphQLInt },
    customName: { type: GraphQLString },
  }),
});
