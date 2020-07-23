import {
    GraphQLEnumType,
} from 'graphql';

export default new GraphQLEnumType({
    name: 'Class',
    values: {
        SOLDIER: { value: 'SOLDIER' },
        DEMOMAN: { value: 'DEMOMAN' }
    }
});
