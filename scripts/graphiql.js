/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
/* eslint-enable import/no-extraneous-dependencies */
const { schema } = require("../dist/schema");

const app = express();
app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000);
/* eslint-disable no-console */
console.log("GraphQL server started at http://localhost:4000/graphql");
console.log("GraphiQL server started at http://localhost:4000/graphiql");
/* eslint-enable no-console */
