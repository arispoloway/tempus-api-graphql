import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import { parseClassToEnum } from '../utils.js';
import { playersById } from '../tempus.js';
import Player from './player.js';
import Tiers from './tiers.js';
import Run from './run.js';
import ZoneTypeEnum from './zone_type_enum.js';
import RecordType from './record.js';

const Author = new GraphQLObjectType({
    name: 'Author',

    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: author => author.id
        },
        name: {
            type: GraphQLString,
            resolve: author => author.name
        },
        player: {
            type: Player,
            resolve: author => author.id ? playersById.load(author.id) : null
        }
    })
});

const MapVideos = new GraphQLObjectType({
    name: 'MapVideos',

    fields: () => ({
        soldier: {
            type: GraphQLString,
            resolve: videos => videos.soldier && `https://youtube.com/watch?v=${videos.soldier}`
        },
        demoman: {
            type: GraphQLString,
            resolve: videos => videos.demoman && `https://youtube.com/watch?v=${videos.demoman}`
        }
    })
});

const ClassRunListing = new GraphQLObjectType({
    name: 'ClassRunListing',

    fields: () => ({
        soldier: {type: new GraphQLList(Run)},
        demoman: {type: new GraphQLList(Run)}
    })
});

const ClassRecordListing = new GraphQLObjectType({
    name: 'ClassRecordListing',

    fields: () => ({
        soldier: {type: new GraphQLList(RecordType)},
        demoman: {type: new GraphQLList(RecordType)}
    })
});

export default new GraphQLObjectType({
    name: 'Map',
    description: 'A jump map',

    fields: () => ({
        id: {type: GraphQLString,},
        name: {type: GraphQLString,},
        authors: {type: new GraphQLList(Author),},
        videos: {type: MapVideos},
        tiers: {type: Tiers},
        runs: {type: ClassRunListing},
        records: {
            type: ClassRecordListing,
            args: {
                zoneType: { type: ZoneTypeEnum },
                zoneId: { type: GraphQLInt },
                start: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            }
        }
    })
});
