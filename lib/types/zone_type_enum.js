import {
    GraphQLEnumType,
} from 'graphql';

export default new GraphQLEnumType({
    name: 'ZoneType',
    values: {
        BONUS: { value: 'bonus' },
        MAP: { value: 'map' },
        COURSE: { value: 'course' }
    }
});
