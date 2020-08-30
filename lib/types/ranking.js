import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import PlayerType from "./player";

export default new GraphQLObjectType({
  name: "Ranking",

  fields: () => ({
    player: { type: new GraphQLNonNull(PlayerType) },
    rank: { type: new GraphQLNonNull(GraphQLInt) },
    points: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
