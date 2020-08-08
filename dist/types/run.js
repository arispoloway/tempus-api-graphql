"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _player = _interopRequireDefault(require("./player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLObjectType({
  name: "Run",
  fields: function fields() {
    return {
      duration: {
        type: _graphql.GraphQLFloat
      },
      player: {
        type: _player["default"]
      }
    };
  }
});

exports["default"] = _default;