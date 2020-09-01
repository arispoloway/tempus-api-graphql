# tempus-api-graphql

A [GraphQL](https://graphql.org/) wrapper for the [tempus.xyz](https://tempus.xyz/) API. The spiritual successor of [tempus-api](https://github.com/arispoloway/tempus-api).

[![npm version](https://badge.fury.io/js/tempus-api-graphql.svg)](https://badge.fury.io/js/tempus-api-graphql)

## Usage

### As a dependency of another project

This package exports a `GraphQLSchema` object to be used with the `graphql` package ([link](https://www.npmjs.com/package/graphql)).

Below is an example usage:

```js
const { graphql } = require("graphql");
const { schema } = require("tempus-api-graphql");

const query = `
{
  map(name: "jump_rush") {
    authors {
      name
      player {
        steamId
        country
      }
    }
    records(limit: 1) {
      soldier {
        duration
        player {
          name
        }
        demo {
          url
          server {
            name
            online
          }
        }
      }
    }
  }
}`;
graphql(schema, query).then((result) => {
  console.log(result);
});
```

Under the hood, this would request the 6 endpoints required to resolve all of the requested fields:

- `jump_rush` map overview
- `jump_rush` map record listing
- `author` player stats
- `record` overview
- `demo` overview
- `server` status list

These requests are cached and the resolvers attempt to make the fewest requests possible to resolve the requested fields.

At time of writing, that query results in the following:

```json
{
  "data": {
    "map": {
      "authors": [
        {
          "name": "Bob+M|M+",
          "player": {
            "steamId": "STEAM_0:1:19865974",
            "country": "United States"
          }
        }
      ],
      "records": {
        "soldier": [
          {
            "duration": 46.91956281661987,
            "player": {
              "name": "Boshy"
            },
            "demo": {
              "url": "http://tempus-demos.s3.amazonaws.com/23/auto-20181102-140940-jump_rush.zip",
              "server": {
                "name": "jump.tf (France) Rank 50 Only",
                "online": true
              }
            }
          }
        ]
      }
    }
  }
}
```

Check out an [example project](https://xff7m.csb.app/) that uses `tempus-api-graphql` to power an entirely in-browser `GraphiQL` instance. Source for this example found [here](https://codesandbox.io/s/graphiql-tempus-api-graphql-demo-xff7m).

### Standalone

This repo also includes a `graphiql` script for running a standalone GraphQL server with `express-graphql`.
To start the server, clone this repo and run `npm install` and `npm run graphiql`.

This will start a server listening at `localhost:4000/graphql`, along with a [GraphiQL](https://github.com/graphql/graphiql) instance at `localhost:4000/graphiql`.
