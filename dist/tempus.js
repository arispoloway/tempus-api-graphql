"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activity = exports.allMaps = exports.allServers = exports.serversById = exports.demosById = exports.recordsById = exports.recordListByMapId = exports.recordListByMapName = exports.playersById = exports.mapsByName = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _lruCache = _interopRequireDefault(require("lru-cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BASE_URL = "https://tempus.xyz/api/";

function fetchResponseByURL(relativeURL) {
  /* eslint-disable no-console */
  console.log("Fetching ".concat(BASE_URL).concat(relativeURL));
  /* eslint-enable no-console */

  return (0, _nodeFetch["default"])("".concat(BASE_URL).concat(relativeURL)).then(function (res) {
    var j = res.json();
    return j.error ? null : j;
  });
}

var CachedByKeyResource = /*#__PURE__*/function () {
  function CachedByKeyResource(loader) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CachedByKeyResource);

    var timeout = options.timeout || 60;
    var max = options.max || 10;
    this.loader = loader;

    this.keyFunc = options.keyFunc || function (x) {
      return JSON.stringify(x);
    }; // insired by https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
    // My knowledge of JS's runtime is not good enough to fully vet this, but seems reasonable ish
    // Also I don't really need concurrency guarantees for this project anyway


    this.inFlight = {};
    this.cache = new _lruCache["default"]({
      max: max,
      maxAge: timeout * 1000
    });
  }

  _createClass(CachedByKeyResource, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
        var _this = this;

        var key, inFlight;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(item === null)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", null);

              case 2:
                key = this.keyFunc(item);
                inFlight = this.inFlight;

                if (!inFlight[key]) {
                  inFlight[key] = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var cached, r;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            cached = _this.cache.get(key);

                            if (!cached) {
                              _context2.next = 6;
                              break;
                            }

                            _context2.next = 5;
                            return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                          case 5:
                            return _context2.abrupt("return", cached);

                          case 6:
                            _context2.next = 8;
                            return _this.loader(item);

                          case 8:
                            r = _context2.sent;

                            _this.cache.set(key, r);

                            return _context2.abrupt("return", r);

                          case 11:
                            _context2.prev = 11;
                            delete inFlight[key];
                            return _context2.finish(11);

                          case 14:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[0,, 11, 14]]);
                  }))();
                }

                return _context3.abrupt("return", inFlight[key]);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return CachedByKeyResource;
}();

var CachedResource = /*#__PURE__*/function (_CachedByKeyResource) {
  _inherits(CachedResource, _CachedByKeyResource);

  var _super = _createSuper(CachedResource);

  function CachedResource(loader) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CachedResource);

    return _super.call(this, loader, _objectSpread(_objectSpread({}, options), {}, {
      max: 1
    }));
  }

  _createClass(CachedResource, [{
    key: "load",
    value: function load() {
      return _get(_getPrototypeOf(CachedResource.prototype), "load", this).call(this, "0"); // Just use 0 as the cache key for everything
    }
  }]);

  return CachedResource;
}(CachedByKeyResource);

var allMaps = new CachedResource(function () {
  return fetchResponseByURL("maps/detailedList");
}, {
  timeout: 600
});
exports.allMaps = allMaps;
var activity = new CachedResource(function () {
  return fetchResponseByURL("activity");
});
exports.activity = activity;
var allServers = new CachedResource( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var r;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return fetchResponseByURL("servers/statusList");

        case 2:
          r = _context4.sent;
          return _context4.abrupt("return", r.map(function (server) {
            return _objectSpread(_objectSpread({}, server.server_info), server.game_info);
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
exports.allServers = allServers;
var mapsByName = new CachedByKeyResource(function (name) {
  return fetchResponseByURL("maps/name/".concat(name, "/fullOverview"));
});
exports.mapsByName = mapsByName;
var playersById = new CachedByKeyResource(function (id) {
  return fetchResponseByURL("players/id/".concat(id, "/stats"));
});
exports.playersById = playersById;
var recordListByMapName = new CachedByKeyResource(function (info) {
  return fetchResponseByURL("maps/name/".concat(info.mapName, "/zones/typeindex/").concat(info.zoneType || "map", "/").concat(info.zoneId || 1, "/records/list?start=").concat(info.start || 1, "&limit=").concat(info.limit || 25));
});
exports.recordListByMapName = recordListByMapName;
var recordListByMapId = new CachedByKeyResource(function (info) {
  return fetchResponseByURL("maps/id/".concat(info.mapId, "/zones/typeindex/").concat(info.zoneType || "map", "/").concat(info.zoneId || 1, "/records/list?start=").concat(info.start || 1, "&limit=").concat(info.limit || 25));
});
exports.recordListByMapId = recordListByMapId;
var recordsById = new CachedByKeyResource(function (id) {
  return fetchResponseByURL("records/id/".concat(id, "/overview"));
}, {
  timeout: Infinity
});
exports.recordsById = recordsById;
var demosById = new CachedByKeyResource(function (id) {
  return fetchResponseByURL("demos/id/".concat(id, "/overview"));
}, {
  timeout: Infinity
});
exports.demosById = demosById;
var serversById = {
  load: function () {
    var _load2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var servers;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return allServers.load();

            case 2:
              servers = _context5.sent;
              return _context5.abrupt("return", servers.find(function (s) {
                return s.id === id;
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function load(_x2) {
      return _load2.apply(this, arguments);
    }

    return load;
  }()
};
exports.serversById = serversById;