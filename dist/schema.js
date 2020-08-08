"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _tempus = require("./tempus");

var _map = _interopRequireDefault(require("./types/map"));

var _map2 = _interopRequireDefault(require("./models/map"));

var _player = _interopRequireDefault(require("./types/player"));

var _player2 = _interopRequireDefault(require("./models/player"));

var _record = _interopRequireDefault(require("./types/record"));

var _record2 = _interopRequireDefault(require("./models/record"));

var _demo = _interopRequireDefault(require("./types/demo"));

var _demo2 = _interopRequireDefault(require("./models/demo"));

var _server = _interopRequireDefault(require("./types/server"));

var _server2 = _interopRequireDefault(require("./models/server"));

var _activity = _interopRequireDefault(require("./types/activity"));

var _activity2 = _interopRequireDefault(require("./models/activity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var QueryType = new _graphql.GraphQLObjectType({
  name: "Query",
  fields: function fields() {
    return {
      map: {
        type: _map["default"],
        args: {
          name: {
            type: _graphql.GraphQLString
          },
          id: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return new _map2["default"](args);
        }
      },
      maps: {
        type: new _graphql.GraphQLList(_map["default"]),
        args: {
          search: {
            type: _graphql.GraphQLString
          },
          start: {
            type: _graphql.GraphQLInt
          },
          limit: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var maps;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _tempus.allMaps.load();

                  case 2:
                    maps = _context.sent;
                    if (args.search) maps = maps.filter(function (map) {
                      return map.name.includes(args.search);
                    });
                    if (args.start) maps = maps.slice(args.start - 1);
                    if (args.limit) maps = maps.slice(0, args.limit);
                    return _context.abrupt("return", maps.map(function (m) {
                      return new _map2["default"](m);
                    }));

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      },
      player: {
        type: _player["default"],
        args: {
          id: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return new _player2["default"](args);
        }
      },
      record: {
        type: _record["default"],
        args: {
          id: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return new _record2["default"](args);
        }
      },
      demo: {
        type: _demo["default"],
        args: {
          id: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return new _demo2["default"](args);
        }
      },
      server: {
        type: _server["default"],
        args: {
          id: {
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return new _server2["default"](args);
        }
      },
      activity: {
        type: _activity["default"],
        resolve: function resolve() {
          return new _activity2["default"]();
        }
      } // TODO missing rankings
      // TODO missing search for players and convenience things for related fields
      // TODO missing convenience fields that wrap the actual API

    };
  }
});

var _default = new _graphql.GraphQLSchema({
  query: QueryType
});

exports["default"] = _default;