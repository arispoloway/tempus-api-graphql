import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';
import { parseClassToEnum } from '../utils.js';

export default new GraphQLObjectType({
    name: 'Player',

    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        country: {type: GraphQLString},
        countryCode: {type: GraphQLString},
        steamId: {type: GraphQLString},
        firstSeen: {type: GraphQLFloat},
        lastSeen: {type: GraphQLFloat}
        // TODO missing all of the ranking information
    })
});
