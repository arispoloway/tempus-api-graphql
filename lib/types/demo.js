import {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} from 'graphql';
import PlayerType from './player.js';
import MapType from './map.js';
import TiersType from './tiers.js';
import DemoType from './demo.js';
import ServerType from './server.js';

export default new GraphQLObjectType({
    name: 'Demo',

    fields: () => ({
        id: {type: GraphQLInt},
        map: {type: MapType},
        filename: {type: GraphQLString},
        date: {type: GraphQLFloat},
        url: {type: GraphQLString},
        recording: {type: GraphQLBoolean},
        requested: {type: GraphQLBoolean},
        expired: {type: GraphQLBoolean},
        deleted: {type: GraphQLBoolean},
        uploader: {type: PlayerType},
        server: {type: ServerType}

    })
});
