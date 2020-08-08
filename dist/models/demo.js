"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base_model = _interopRequireDefault(require("./base_model"));

var _tempus = require("../tempus");

var _player = _interopRequireDefault(require("./player"));

var _map = _interopRequireDefault(require("./map"));

var _server = _interopRequireDefault(require("./server"));

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

var Demo = /*#__PURE__*/function (_BaseModel) {
  _inherits(Demo, _BaseModel);

  var _super = _createSuper(Demo);

  function Demo() {
    _classCallCheck(this, Demo);

    return _super.apply(this, arguments);
  }

  _createClass(Demo, [{
    key: "fetchRecord",
    value: function fetchRecord() {
      return _tempus.demosById.load(this.attrs.id);
    }
  }, {
    key: "id",
    value: function id() {
      return this.attrs.id;
    }
  }, {
    key: "map",
    value: function map() {
      return this.access("map", function (r) {
        return new _map["default"]({
          name: r.demo_info.mapname
        });
      });
    }
  }, {
    key: "filename",
    value: function filename() {
      return this.access("filename", function (r) {
        return r.demo_info.filename;
      });
    }
  }, {
    key: "date",
    value: function date() {
      return this.access("date", function (r) {
        return r.demo_info.date;
      });
    }
  }, {
    key: "url",
    value: function url() {
      return this.access("url", function (r) {
        return r.demo_info.url;
      });
    }
  }, {
    key: "recording",
    value: function recording() {
      return this.access("recording", function (r) {
        return r.demo_info.recording;
      });
    }
  }, {
    key: "requested",
    value: function requested() {
      return this.access("requested", function (r) {
        return r.demo_info.requested;
      });
    }
  }, {
    key: "expired",
    value: function expired() {
      return this.access("expired", function (r) {
        return r.demo_info.expired;
      });
    }
  }, {
    key: "deleted",
    value: function deleted() {
      return this.access("deleted", function (r) {
        return r.demo_info.deleted;
      });
    }
  }, {
    key: "uploader",
    value: function uploader() {
      return this.access("uploader", function (r) {
        return r.demo_info.uploader_id && new _player["default"]({
          id: r.demo_info.uploader_id
        });
      });
    }
  }, {
    key: "server",
    value: function server() {
      return this.access("server", function (r) {
        return new _server["default"](r.server_info);
      });
    }
  }]);

  return Demo;
}(_base_model["default"]);

var _default = Demo;
exports["default"] = _default;