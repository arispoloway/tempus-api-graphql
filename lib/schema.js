import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} from 'graphql';
import MapType from './types/map.js';
import Map from './models/map.js';
import PlayerType from './types/player.js';
import Player from './models/player.js';
import RecordType from './types/record.js';
import Record from './models/record.js';
import DemoType from './types/demo.js';
import Demo from './models/demo.js';
import ServerType from './types/server.js';
import Server from './models/server.js';

const QueryType = new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
        map: {
            type: MapType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: (root, args) => new Map(args)
        },
        player: {
            type: PlayerType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => new Player(args)
        },
        record: {
            type: RecordType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => new Record(args)
        },
        demo: {
            type: DemoType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => new Demo(args)
        },
        server: {
            type: ServerType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => new Server(args)
        }
        // TODO missing recent activity and rankings
        // TODO missing map listings
        // TODO missing search
        // TODO missing convenience fields that wrap the actual API
    })
});

export default new GraphQLSchema({
  query: QueryType,
});
