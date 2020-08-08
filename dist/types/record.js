"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

var _tiers = _interopRequireDefault(require("./tiers"));

var _demo = _interopRequireDefault(require("./demo"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLObjectType({
  name: "Record",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt
      },
      player: {
        type: _player["default"]
      },
      duration: {
        type: _graphql.GraphQLFloat
      },
      rank: {
        type: _graphql.GraphQLInt
      },
      date: {
        type: _graphql.GraphQLFloat
      },
      tiers: {
        type: _tiers["default"]
      },
      map: {
        type: _map["default"]
      },
      demo: {
        type: _demo["default"]
      },
      demoStartTick: {
        type: _graphql.GraphQLInt
      },
      demoEndTick: {
        type: _graphql.GraphQLInt
      },
      server: {
        type: _server["default"]
      } // TODO missing zone information. Also elsewhere in the graph
      // TODO missing class information. Also probably elsewhere

    };
  }
});

exports["default"] = _default;