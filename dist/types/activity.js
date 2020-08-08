"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _record = _interopRequireDefault(require("./record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLObjectType({
  name: "Activity",
  fields: function fields() {
    return {
      bonusWrs: {
        type: new _graphql.GraphQLList(_record["default"])
      },
      courseWrs: {
        type: new _graphql.GraphQLList(_record["default"])
      },
      mapWrs: {
        type: new _graphql.GraphQLList(_record["default"])
      },
      mapTops: {
        type: new _graphql.GraphQLList(_record["default"])
      }
    };
  }
});

exports["default"] = _default;