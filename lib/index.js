"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var React = _interopDefault(require("react"));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var globalPrefix = "id";
var lastId = 0;
function nextId(localPrefix) {
  lastId++;
  return "".concat(localPrefix || globalPrefix).concat(lastId);
}
/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/

var ResetHtmlIdGenerator =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(ResetHtmlIdGenerator, _React$Component);

    function ResetHtmlIdGenerator(props) {
      var _this;

      _classCallCheck(this, ResetHtmlIdGenerator);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(ResetHtmlIdGenerator).call(this, props)
      );
      lastId = 0;

      if (props.prefix) {
        if (typeof props.prefix !== "string")
          throw new Error("prefix should be of string type");
        globalPrefix = props.prefix;
      }

      return _this;
    }

    _createClass(ResetHtmlIdGenerator, [
      {
        key: "render",
        value: function render() {
          return null;
        }
      }
    ]);

    return ResetHtmlIdGenerator;
  })(React.Component);

exports.ResetHtmlIdGenerator = ResetHtmlIdGenerator;
exports.default = nextId;
