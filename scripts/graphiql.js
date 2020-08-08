/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import { graphqlHTTP } from "express-graphql";
/* eslint-enable import/no-extraneous-dependencies */
import schema from "../dist/schema";

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
