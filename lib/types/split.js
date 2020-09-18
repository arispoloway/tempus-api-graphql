import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} from "graphql";

export default new GraphQLObjectType({
  name: "Split",

  fields: () => ({
    type: { type: new GraphQLNonNull(GraphQLString) },
    zoneindex: { type: new GraphQLNonNull(GraphQLInt) },
    customName: { type: GraphQLString },
    duration: { type: GraphQLFloat },
    comparedDuration: { type: GraphQLFloat },
  }),
});
