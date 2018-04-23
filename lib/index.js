'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalPrefix = 'id';
var lastId = 0;
function nextId(localPrefix) {
  lastId++;
  return '' + (localPrefix || globalPrefix) + lastId;
}

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/
var ResetHtmlIdGenerator = function (_React$Component) {
  _inherits(ResetHtmlIdGenerator, _React$Component);

  function ResetHtmlIdGenerator(props) {
    _classCallCheck(this, ResetHtmlIdGenerator);

    var _this = _possibleConstructorReturn(this, (ResetHtmlIdGenerator.__proto__ || Object.getPrototypeOf(ResetHtmlIdGenerator)).call(this, props));

    lastId = 0;
    if (props.prefix) {
      if (typeof props.prefix !== 'string') throw new Error('prefix should be of string type');
      globalPrefix = props.prefix;
    }
    return _this;
  }

  _createClass(ResetHtmlIdGenerator, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return ResetHtmlIdGenerator;
}(React.Component);

exports.default = nextId;
exports.ResetHtmlIdGenerator = ResetHtmlIdGenerator;
