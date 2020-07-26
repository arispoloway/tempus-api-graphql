import {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLInt
} from 'graphql';
import PlayerType from './player.js';
import MapType from './map.js';
import TiersType from './tiers.js';
import DemoType from './demo.js';
import ServerType from './server.js';

export default new GraphQLObjectType({
    name: 'Record',

    fields: () => ({
        id: {type: GraphQLInt},
        player: {type: PlayerType},
        duration: {type: GraphQLFloat},
        rank: {type: GraphQLInt},
        date: {type: GraphQLFloat},
        tiers: {type: TiersType},
        map: {type: MapType},
        demo: {type: DemoType},
        server: {type: ServerType}
        // TODO missing zone information. Also elsewhere in the graph
        // TODO missing class information. Also probably elsewhere
    })
});
