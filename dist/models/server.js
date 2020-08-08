"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base_model = _interopRequireDefault(require("./base_model"));

var _tempus = require("../tempus");

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

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

var Server = /*#__PURE__*/function (_BaseModel) {
  _inherits(Server, _BaseModel);

  var _super = _createSuper(Server);

  function Server() {
    _classCallCheck(this, Server);

    return _super.apply(this, arguments);
  }

  _createClass(Server, [{
    key: "fetchRecord",
    value: function fetchRecord() {
      return _tempus.serversById.load(this.attrs.id);
    }
  }, {
    key: "id",
    value: function id() {
      return this.access("id", function (r) {
        return r.id;
      });
    }
  }, {
    key: "currentMap",
    value: function currentMap() {
      return this.access(null, function (r) {
        return new _map["default"]({
          name: r.currentMap
        });
      });
    }
  }, {
    key: "freeDisk",
    value: function freeDisk() {
      return this.access("freeDisk", function (r) {
        return r.freeDisk;
      });
    }
  }, {
    key: "gameVersion",
    value: function gameVersion() {
      return this.access("gameVersion", function (r) {
        return r.gameVersion;
      });
    }
  }, {
    key: "hostName",
    value: function hostName() {
      return this.access("hostName", function (r) {
        return r.hostName;
      });
    }
  }, {
    key: "maxPlayers",
    value: function maxPlayers() {
      return this.access("maxPlayers", function (r) {
        return r.maxPlayers;
      });
    }
  }, {
    key: "nextMap",
    value: function nextMap() {
      return this.access(null, function (r) {
        return new _map["default"]({
          name: r.nextMap
        });
      });
    }
  }, {
    key: "playerCount",
    value: function playerCount() {
      return this.access("playerCount", function (r) {
        return r.playerCount;
      });
    }
  }, {
    key: "players",
    value: function players() {
      return this.access(null, function (r) {
        return r.users.map(function (u) {
          return new _player["default"](u);
        });
      });
    }
  }, {
    key: "address",
    value: function address() {
      return this.access("address", function (r) {
        return r.address;
      });
    }
  }, {
    key: "country",
    value: function country() {
      return this.access("country", function (r) {
        return r.country;
      });
    }
  }, {
    key: "hidden",
    value: function hidden() {
      return this.access("hidden", function (r) {
        return r.hidden;
      });
    }
  }, {
    key: "name",
    value: function name() {
      return this.access("name", function (r) {
        return r.name;
      });
    }
  }, {
    key: "port",
    value: function port() {
      return this.access("port", function (r) {
        return r.port;
      });
    }
  }, {
    key: "shortname",
    value: function shortname() {
      return this.access("shortname", function (r) {
        return r.shortname;
      });
    }
  }]);

  return Server;
}(_base_model["default"]);

var _default = Server;
exports["default"] = _default;