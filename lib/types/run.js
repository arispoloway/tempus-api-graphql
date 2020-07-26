import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';
import PlayerType from './player.js';

export default new GraphQLObjectType({
    name: 'Run',

    fields: () => ({
        duration: {type: GraphQLFloat},
        player: {type: PlayerType}
    })
});
