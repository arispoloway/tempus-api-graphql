import schema from '../lib/schema.js';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

let app = express();
app.use('/graphiql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4000);
console.log('GraphQL server started at http://localhost:4000/graphql');
