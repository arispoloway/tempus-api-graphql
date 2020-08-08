"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _default = new _graphql.GraphQLObjectType({
  name: "Tiers",
  fields: function fields() {
    return {
      soldier: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(t) {
          return t.soldier || t[3];
        }
      },
      demoman: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(t) {
          return t.demoman || t[4];
        }
      }
    };
  }
});

exports["default"] = _default;