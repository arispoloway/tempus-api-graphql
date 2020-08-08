"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base_model = _interopRequireDefault(require("./base_model"));

var _tempus = require("../tempus");

var _record = _interopRequireDefault(require("./record"));

var _run = _interopRequireDefault(require("./run"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Map = /*#__PURE__*/function (_BaseModel) {
  _inherits(Map, _BaseModel);

  var _super = _createSuper(Map);

  function Map() {
    _classCallCheck(this, Map);

    return _super.apply(this, arguments);
  }

  _createClass(Map, [{
    key: "fetchRecord",
    value: function fetchRecord() {
      return _tempus.mapsByName.load(this.attrs.name);
    }
  }, {
    key: "id",
    value: function id() {
      return this.access("id", function (r) {
        return r.map_info.id;
      });
    }
  }, {
    key: "name",
    value: function name() {
      return this.access("name", function (r) {
        return r.map_info.name;
      });
    }
  }, {
    key: "authors",
    value: function authors() {
      return this.access("authors", function (r) {
        return r.authors;
      });
    }
  }, {
    key: "videos",
    value: function videos() {
      return this.access("videos", function (r) {
        return r.videos;
      });
    }
  }, {
    key: "tiers",
    value: function tiers() {
      return this.access("tier_info", function (r) {
        return r.tier_info;
      });
    }
  }, {
    key: "runs",
    value: function runs() {
      return this.access("runs", function (r) {
        return {
          soldier: r.soldier_runs.map(function (run) {
            return new _run["default"](run);
          }),
          demoman: r.demoman_runs.map(function (run) {
            return new _run["default"](run);
          })
        };
      });
    }
  }, {
    key: "records",
    value: function () {
      var _records = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
        var rs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                rs = null;

                if (!this.attrs.name) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return _tempus.recordListByMapName.load(_objectSpread({
                  mapName: this.attrs.name
                }, args));

              case 4:
                rs = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return _tempus.recordListByMapId.load(_objectSpread({
                  mapId: this.attrs.id
                }, args));

              case 9:
                rs = _context.sent;

              case 10:
                return _context.abrupt("return", {
                  soldier: rs.results.soldier.map(function (record) {
                    return new _record["default"](record);
                  }),
                  demoman: rs.results.demoman.map(function (record) {
                    return new _record["default"](record);
                  })
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function records(_x) {
        return _records.apply(this, arguments);
      }

      return records;
    }()
  }]);

  return Map;
}(_base_model["default"]);

var _default = Map;
exports["default"] = _default;