import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import RecordType from "./record";

export default new GraphQLObjectType({
  name: "Activity",

  fields: () => ({
    bonusWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
      args: {
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
    },
    courseWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
      args: {
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
    },
    mapWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
      args: {
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
    },
    mapTops: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
      args: {
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
    },
  }),
});
