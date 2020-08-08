"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _default = new _graphql.GraphQLEnumType({
  name: "ZoneType",
  values: {
    BONUS: {
      value: "bonus"
    },
    MAP: {
      value: "map"
    },
    COURSE: {
      value: "course"
    }
  }
});

exports["default"] = _default;