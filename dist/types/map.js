"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _tiers = _interopRequireDefault(require("./tiers"));

var _run = _interopRequireDefault(require("./run"));

var _zone_type_enum = _interopRequireDefault(require("./zone_type_enum"));

var _record = _interopRequireDefault(require("./record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Author = new _graphql.GraphQLObjectType({
  name: "Author",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(author) {
          return author.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(author) {
          return author.name;
        }
      }
    };
  }
});
var MapVideos = new _graphql.GraphQLObjectType({
  name: "MapVideos",
  fields: function fields() {
    return {
      soldier: {
        type: _graphql.GraphQLString,
        resolve: function resolve(videos) {
          return videos.soldier && "https://youtube.com/watch?v=".concat(videos.soldier);
        }
      },
      demoman: {
        type: _graphql.GraphQLString,
        resolve: function resolve(videos) {
          return videos.demoman && "https://youtube.com/watch?v=".concat(videos.demoman);
        }
      }
    };
  }
});
var ClassRunListing = new _graphql.GraphQLObjectType({
  name: "ClassRunListing",
  fields: function fields() {
    return {
      soldier: {
        type: new _graphql.GraphQLList(_run["default"])
      },
      demoman: {
        type: new _graphql.GraphQLList(_run["default"])
      }
    };
  }
});
var ClassRecordListing = new _graphql.GraphQLObjectType({
  name: "ClassRecordListing",
  fields: function fields() {
    return {
      soldier: {
        type: new _graphql.GraphQLList(_record["default"])
      },
      demoman: {
        type: new _graphql.GraphQLList(_record["default"])
      }
    };
  }
});

var _default = new _graphql.GraphQLObjectType({
  name: "Map",
  description: "A jump map",
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString
      },
      name: {
        type: _graphql.GraphQLString
      },
      authors: {
        type: new _graphql.GraphQLList(Author)
      },
      videos: {
        type: MapVideos
      },
      tiers: {
        type: _tiers["default"]
      },
      runs: {
        type: ClassRunListing
      },
      records: {
        type: ClassRecordListing,
        args: {
          zoneType: {
            type: _zone_type_enum["default"]
          },
          zoneId: {
            type: _graphql.GraphQLInt
          },
          start: {
            type: _graphql.GraphQLInt
          },
          limit: {
            type: _graphql.GraphQLInt
          }
        }
      }
    };
  }
});

exports["default"] = _default;