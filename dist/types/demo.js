"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLObjectType({
  name: "Demo",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt
      },
      map: {
        type: _map["default"]
      },
      filename: {
        type: _graphql.GraphQLString
      },
      date: {
        type: _graphql.GraphQLFloat
      },
      url: {
        type: _graphql.GraphQLString
      },
      recording: {
        type: _graphql.GraphQLBoolean
      },
      requested: {
        type: _graphql.GraphQLBoolean
      },
      expired: {
        type: _graphql.GraphQLBoolean
      },
      deleted: {
        type: _graphql.GraphQLBoolean
      },
      uploader: {
        type: _player["default"]
      },
      server: {
        type: _server["default"]
      }
    };
  }
});

exports["default"] = _default;