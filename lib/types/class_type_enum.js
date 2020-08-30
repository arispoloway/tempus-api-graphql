import { GraphQLEnumType } from "graphql";

export default new GraphQLEnumType({
  name: "Class",
  values: {
    SOLDIER: { value: "soldier" },
    DEMOMAN: { value: "demoman" },
  },
});
