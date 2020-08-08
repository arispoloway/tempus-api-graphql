"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base_model = _interopRequireDefault(require("./base_model"));

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

var _demo = _interopRequireDefault(require("./demo"));

var _server = _interopRequireDefault(require("./server"));

var _tempus = require("../tempus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Record = /*#__PURE__*/function (_BaseModel) {
  _inherits(Record, _BaseModel);

  var _super = _createSuper(Record);

  function Record() {
    _classCallCheck(this, Record);

    return _super.apply(this, arguments);
  }

  _createClass(Record, [{
    key: "fetchRecord",
    value: function fetchRecord() {
      return _tempus.recordsById.load(this.attrs.id);
    }
  }, {
    key: "id",
    value: function id() {
      return this.attrs.id;
    }
  }, {
    key: "player",
    value: function player() {
      if (this.attrs.player_info) return new _player["default"](this.attrs.player_info);
      return this.access("player", function (r) {
        return new _player["default"](r.player_info);
      });
    }
  }, {
    key: "duration",
    value: function duration() {
      return this.access("duration", function (r) {
        return r.record_info.duration;
      });
    }
  }, {
    key: "date",
    value: function date() {
      return this.access("date", function (r) {
        return r.record_info.date;
      });
    }
  }, {
    key: "rank",
    value: function rank() {
      return this.access("rank", function (r) {
        return r.record_info.rank;
      });
    }
  }, {
    key: "tiers",
    value: function tiers() {
      return this.access("tiers", function (r) {
        return r.tier_info;
      });
    }
  }, {
    key: "map",
    value: function map() {
      if (this.attrs.map_info) return new _map["default"](this.attrs.map_info);
      return this.access("map", function (r) {
        return new _map["default"](r.map_info);
      });
    }
  }, {
    key: "demo",
    value: function demo() {
      return this.access("demo", function (r) {
        return r.demo_info && new _demo["default"](r.demo_info);
      });
    }
  }, {
    key: "demoStartTick",
    value: function demoStartTick() {
      return this.access("demo_start_tick", function (r) {
        return r.record_info.demo_start_tick;
      });
    }
  }, {
    key: "demoEndTick",
    value: function demoEndTick() {
      return this.access("demo_end_tick", function (r) {
        return r.record_info.demo_end_tick;
      });
    }
  }, {
    key: "server",
    value: function server() {
      return this.access("server", function (r) {
        return new _server["default"]({
          id: r.record_info.server_id
        });
      });
    }
  }]);

  return Record;
}(_base_model["default"]);

var _default = Record;
exports["default"] = _default;