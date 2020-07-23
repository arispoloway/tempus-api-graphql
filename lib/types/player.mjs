import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';
import { parseClassToEnum } from '../utils.mjs';
import Class from './class.mjs';

export default new GraphQLObjectType({
    name: 'Player',

    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: player => player.player_info.id
        },
        name: {
            type: GraphQLString,
            resolve: player => player.player_info.name
        },
        country: {
            type: GraphQLString,
            resolve: player => player.player_info.country
        },
        countryCode: {
            type: GraphQLString,
            resolve: player => player.player_info.country_code
        },
        steamId: {
            type: GraphQLString,
            resolve: player => player.player_info.steamid
        },
        firstSeen: {
            type: GraphQLFloat,
            resolve: player => player.player_info.first_seen
        },
        lastSeen: {
            type: GraphQLFloat,
            resolve: player => player.player_info.last_seen
        }
    })
});
