'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _default = (function (_React$Component) {
  var _class = function _default() {
    _classCallCheck(this, _class);

    _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
  };

  _inherits(_class, _React$Component);

  _createClass(_class, [{
    key: 'sortBy',
    value: function sortBy(lbl, e) {
      e.preventDefault();
      this.props.sortBy(lbl);
    }
  }, {
    key: 'filterBy',
    value: function filterBy(lbl, e) {
      e.preventDefault();
      this.props.filterBy(lbl, e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var fItem = this.props.formItem || [{ label: 'id' }];
      return _react2['default'].createElement(
        'div',
        { className: 'table-responsive' },
        _react2['default'].createElement(
          'h1',
          null,
          this.props.identity,
          ' List'
        ),
        _react2['default'].createElement(
          'table',
          { className: 'table' },
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement(
              'tr',
              null,
              fItem.map(function (fItem) {
                return _react2['default'].createElement(
                  'th',
                  { key: fItem.label, onClick: _this.sortBy.bind(_this, fItem.label) },
                  fItem.label
                );
              }),
              _react2['default'].createElement('th', null)
            ),
            _react2['default'].createElement(
              'tr',
              null,
              fItem.map(function (fItem) {
                return _react2['default'].createElement(
                  'th',
                  { key: fItem.label },
                  _react2['default'].createElement('input', { type: 'text', name: fItem.label, onChange: _this.filterBy.bind(_this, fItem.label) })
                );
              }),
              _react2['default'].createElement('th', null)
            )
          ),
          _react2['default'].createElement(
            'tbody',
            null,
            this.props.items && this.props.items.map(function (item) {
              var URLparams = { identity: _this.props.identity, id: item.id };
              return _react2['default'].createElement(
                'tr',
                { key: item.id },
                fItem.map(function (it) {
                  return _react2['default'].createElement(
                    'td',
                    { key: it.label },
                    _react2['default'].createElement(Content, { item: item[it.label], type: it.type })
                  );
                }),
                _react2['default'].createElement(
                  'td',
                  null,
                  _react2['default'].createElement(
                    _reactRouter.Link,
                    { to: 'update', params: URLparams },
                    'Edit'
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return _class;
})(_react2['default'].Component);

exports['default'] = _default;

var Content = (function (_React$Component2) {
  function Content() {
    _classCallCheck(this, Content);

    _get(Object.getPrototypeOf(Content.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(Content, _React$Component2);

  _createClass(Content, [{
    key: 'render',
    value: function render() {
      var item = this.props.item;
      if (this.props.type === 'binary') {
        if (!item) return _react2['default'].createElement('span', null);else if (item.split('/')[0] === 'data:image') return _react2['default'].createElement('img', { src: item || 'data:image/png;base64,null' });else return _react2['default'].createElement(
          'a',
          { href: item },
          'Download'
        );
      } else if (this.props.type === 'boolean') {
        return _react2['default'].createElement(
          'span',
          null,
          item ? 'true' : 'false'
        );
      } else {
        return _react2['default'].createElement(
          'span',
          null,
          item || '-'
        );
      }
    }
  }]);

  return Content;
})(_react2['default'].Component);

module.exports = exports['default'];