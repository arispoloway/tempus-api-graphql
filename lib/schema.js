import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} from 'graphql';
import { allMaps, allServers } from './tempus.js';
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
import ActivityType from './types/activity.js';
import Activity from './models/activity.js';

const QueryType = new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
        map: {
            type: MapType,
            args: {
                name: { type: GraphQLString },
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => new Map(args)
        },
        maps: {
            type: new GraphQLList(MapType),
            args: {
                search: { type: GraphQLString },
                start: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve: async function(root, args) {
                let maps = await allMaps.load();
                if (args.search) maps = maps.filter(map => map.name.includes(args.search));
                if (args.start) maps = maps.slice(args.start - 1);
                if (args.limit) maps = maps.slice(0, args.limit);
                return maps.map(m => new Map(m));
            }
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
        },
        activity: {
            type: ActivityType,
            resolve: (root, args) => new Activity()
        }
        // TODO missing rankings
        // TODO missing search for players and convenience things for related fields
        // TODO missing convenience fields that wrap the actual API
    })
});

export default new GraphQLSchema({
  query: QueryType,
});
