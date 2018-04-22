'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

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
  babelHelpers.inherits(ResetHtmlIdGenerator, _React$Component);

  function ResetHtmlIdGenerator(props) {
    babelHelpers.classCallCheck(this, ResetHtmlIdGenerator);

    var _this = babelHelpers.possibleConstructorReturn(this, (ResetHtmlIdGenerator.__proto__ || Object.getPrototypeOf(ResetHtmlIdGenerator)).call(this, props));

    lastId = 0;
    if (props.prefix) {
      if (typeof props.prefix !== 'string') throw new Error('prefix should be of string type');
      globalPrefix = props.prefix;
    }
    return _this;
  }

  babelHelpers.createClass(ResetHtmlIdGenerator, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ResetHtmlIdGenerator;
}(React.Component);

exports.default = nextId;
exports.ResetHtmlIdGenerator = ResetHtmlIdGenerator;
