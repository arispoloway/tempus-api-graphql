import { GraphQLObjectType, GraphQLFloat, GraphQLInt } from "graphql";
import PlayerType from "./player";

export default new GraphQLObjectType({
  name: "Ranking",

  fields: () => ({
    player: { type: PlayerType },
    rank: { type: GraphQLInt },
    points: { type: GraphQLFloat },
  }),
});
