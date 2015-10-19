"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _default = (function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var identities = this.props.identities;
      return _react2['default'].createElement(
        'nav',
        { className: 'navbar navbar-default navbar-fixed-top' },
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'ul',
            { className: 'nav navbar-nav' },
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: 'home' },
                'Admin'
              )
            ),
            identities && identities.map(function (identity) {
              return _react2['default'].createElement(
                'li',
                { className: 'dropdown', key: identity },
                _react2['default'].createElement(
                  'a',
                  { href: '#', className: 'dropdown-toggle',
                    'data-toggle': 'dropdown', role: 'button',
                    'aria-haspopup': 'true', 'aria-expanded': 'false' },
                  identity,
                  _react2['default'].createElement('span', { className: 'caret' })
                ),
                _react2['default'].createElement(
                  'ul',
                  { className: 'dropdown-menu' },
                  _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: 'list', params: { identity: identity } },
                      'List'
                    )
                  ),
                  _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: 'create', params: { identity: identity } },
                      'Create'
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];