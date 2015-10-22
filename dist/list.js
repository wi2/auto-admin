"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listSort = require('./list-sort');

var _listSort2 = _interopRequireDefault(_listSort);

var _listFilter = require('./list-filter');

var _listFilter2 = _interopRequireDefault(_listFilter);

var _rcPagination = require('rc-pagination');

var _rcPagination2 = _interopRequireDefault(_rcPagination);

var _listItem = require('./list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'sortBy',
    value: function sortBy(lbl) {
      this.props.sortBy(lbl);
    }
  }, {
    key: 'filterBy',
    value: function filterBy(lbl, val) {
      this.props.filterBy(lbl, val);
    }
  }, {
    key: 'changePage',
    value: function changePage(lbl) {
      this.props.changePage(lbl);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var fItem = this.props.formItem || [{ label: 'id' }];
      var items = this.props.items;
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
            _react2['default'].createElement(_listSort2['default'], { item: fItem, sortBy: this.sortBy.bind(this) }),
            _react2['default'].createElement(_listFilter2['default'], { item: fItem, filterBy: this.filterBy.bind(this) })
          ),
          _react2['default'].createElement(
            'tbody',
            null,
            items && items.map(function (item) {
              var urlParams = { identity: _this.props.identity, id: item.id };
              return _react2['default'].createElement(_listItem2['default'], { key: item.id, item: item, fItem: fItem, urlParams: urlParams });
            })
          )
        ),
        _react2['default'].createElement(_rcPagination2['default'], { onChange: this.changePage.bind(this),
          pageSize: this.props.limit,
          current: this.props.current,
          total: this.props.total })
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];