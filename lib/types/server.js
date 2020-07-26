import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} from 'graphql';
import PlayerType from './player.js';
import MapType from './map.js';

export default new GraphQLObjectType({
    name: 'Server',

    fields: () => ({
        id: {type: GraphQLInt},
        currentMap: {type: MapType},
        freeDisk: {type: GraphQLInt},
        gameVersion: {type: GraphQLInt},
        hostName: {type: GraphQLString},
        maxPlayers: {type: GraphQLInt},
        nextMap: {type: MapType},
        playerCount: {type: GraphQLInt},
        players: {type: new GraphQLList(PlayerType)},
        address: {type: GraphQLString},
        country: {type: GraphQLString},
        hidden: {type: GraphQLBoolean},
        name: {type: GraphQLString},
        port: {type: GraphQLInt},
        shortname: {type: GraphQLString},
    })
});
