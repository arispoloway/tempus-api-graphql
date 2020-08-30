import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import MapType from "./map";

export default new GraphQLObjectType({
  name: "Zone",
  description: "A jump map",

  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    map: { type: new GraphQLNonNull(MapType) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    zoneindex: { type: new GraphQLNonNull(GraphQLInt) },
    customName: { type: GraphQLString },
  }),
});
