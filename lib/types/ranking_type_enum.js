import { GraphQLEnumType } from "graphql";

export default new GraphQLEnumType({
  name: "RankingType",
  values: {
    OVERALL: { value: "overall" },
    SOLDIER: { value: "soldier" },
    DEMOMAN: { value: "demoman" },
  },
});
