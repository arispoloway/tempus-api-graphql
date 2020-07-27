import {
    GraphQLObjectType,
    GraphQLList
} from 'graphql';
import RecordType from './record.js';

export default new GraphQLObjectType({
    name: 'Activity',

    fields: () => ({
        bonusWrs: {type: new GraphQLList(RecordType)},
        courseWrs: {type: new GraphQLList(RecordType)},
        mapWrs: {type: new GraphQLList(RecordType)},
        mapTops: {type: new GraphQLList(RecordType)}
    })
});
