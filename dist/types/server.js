"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLObjectType({
  name: "Server",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt
      },
      currentMap: {
        type: _map["default"]
      },
      freeDisk: {
        type: _graphql.GraphQLInt
      },
      gameVersion: {
        type: _graphql.GraphQLInt
      },
      hostName: {
        type: _graphql.GraphQLString
      },
      maxPlayers: {
        type: _graphql.GraphQLInt
      },
      nextMap: {
        type: _map["default"]
      },
      playerCount: {
        type: _graphql.GraphQLInt
      },
      players: {
        type: new _graphql.GraphQLList(_player["default"])
      },
      address: {
        type: _graphql.GraphQLString
      },
      country: {
        type: _graphql.GraphQLString
      },
      hidden: {
        type: _graphql.GraphQLBoolean
      },
      name: {
        type: _graphql.GraphQLString
      },
      port: {
        type: _graphql.GraphQLInt
      },
      shortname: {
        type: _graphql.GraphQLString
      }
    };
  }
});

exports["default"] = _default;