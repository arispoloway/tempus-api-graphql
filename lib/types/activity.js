import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from "graphql";
import RecordType from "./record";

export default new GraphQLObjectType({
  name: "Activity",

  fields: () => ({
    bonusWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
    },
    courseWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
    },
    mapWrs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
    },
    mapTops: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RecordType))),
    },
  }),
});
