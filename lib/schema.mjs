import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';
import { mapsByName } from './tempus.mjs'
import MapType from './types/map.mjs'

const QueryType = new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
        map: {
            type: MapType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: (root, args) => mapsByName.load(args.name)
        }
    })
});

export default new GraphQLSchema({
  query: QueryType,
});
