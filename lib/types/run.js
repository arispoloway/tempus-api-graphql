import { GraphQLObjectType, GraphQLFloat } from "graphql";
import PlayerType from "./player";

export default new GraphQLObjectType({
  name: "Run",

  fields: () => ({
    duration: { type: GraphQLFloat },
    player: { type: PlayerType },
  }),
});
