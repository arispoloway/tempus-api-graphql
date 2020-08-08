import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../dist/schema.js";

const app = express();
app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000);
console.log("GraphQL server started at http://localhost:4000/graphql");
console.log("GraphiQL server started at http://localhost:4000/graphiql");
