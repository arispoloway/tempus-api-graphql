"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _default = new _graphql.GraphQLObjectType({
  name: "Player",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt
      },
      name: {
        type: _graphql.GraphQLString
      },
      country: {
        type: _graphql.GraphQLString
      },
      countryCode: {
        type: _graphql.GraphQLString
      },
      steamId: {
        type: _graphql.GraphQLString
      },
      firstSeen: {
        type: _graphql.GraphQLFloat
      },
      lastSeen: {
        type: _graphql.GraphQLFloat
      } // TODO missing all of the ranking information

    };
  }
});

exports["default"] = _default;