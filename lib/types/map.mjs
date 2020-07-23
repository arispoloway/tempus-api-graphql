import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import { parseClassToEnum } from '../utils.mjs';
import { playersById } from '../tempus.mjs';
import Class from './class.mjs';
import Player from './player.mjs';

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

const MapVideo = new GraphQLObjectType({
    name: 'MapVideo',

    fields: () => ({
        url: {
            type: GraphQLString,
            resolve: video => `https://youtube.com/watch?v=${video.yt}`
        },
        class: {
            type: Class,
            resolve: video => parseClassToEnum(video.c)
        }
    })
});


export default new GraphQLObjectType({
    name: 'Map',
    description: 'A jump map',

    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: map => map.map_info.id
        },
        name: {
            type: GraphQLString,
            resolve: map => map.map_info.name
        },
        authors: {
            type: new GraphQLList(Author),
            resolve: map => map.authors
        },
        videos: {
            type: new GraphQLList(MapVideo),
            resolve: map => Object.entries(map.videos).filter(v => v[1]).map(v => ({ c: v[0], yt: v[1] }))
        }
    })
});
