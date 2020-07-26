import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
    name: 'Tiers',

    fields: () => ({
        soldier: {
            type: GraphQLInt,
            resolve: (t) => t.soldier || t[3]
        },
        demoman: {
            type: GraphQLInt,
            resolve: (t) => t.demoman || t[4]
        }
    })
});
