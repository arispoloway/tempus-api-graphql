"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-underscore-dangle */
var BaseModel = /*#__PURE__*/function () {
  function BaseModel(attrs) {
    _classCallCheck(this, BaseModel);

    this.attrs = attrs;
  }

  _createClass(BaseModel, [{
    key: "ensureRecordLoaded",
    value: function () {
      var _ensureRecordLoaded = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._record) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return this.fetchRecord();

              case 3:
                this._record = _context.sent;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ensureRecordLoaded() {
        return _ensureRecordLoaded.apply(this, arguments);
      }

      return ensureRecordLoaded;
    }()
  }, {
    key: "access",
    value: function () {
      var _access = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, loader) {
        var r;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!key) {
                  _context2.next = 4;
                  break;
                }

                r = this.attrs[key];

                if (!r) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", r);

              case 4:
                _context2.next = 6;
                return this.ensureRecordLoaded();

              case 6:
                if (!this._record) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", loader(this._record));

              case 8:
                return _context2.abrupt("return", null);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function access(_x, _x2) {
        return _access.apply(this, arguments);
      }

      return access;
    }()
  }]);

  return BaseModel;
}();
/* eslint-enable no-underscore-dangle */


var _default = BaseModel;
exports["default"] = _default;