"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.Routes = Routes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _reactRouter = require('react-router');

var AdminComponent = (function (_React$Component) {
  _inherits(AdminComponent, _React$Component);

  function AdminComponent() {
    _classCallCheck(this, AdminComponent);

    _get(Object.getPrototypeOf(AdminComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AdminComponent, null, [{
    key: 'defaultProps',
    value: {
      root: '/admin'
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      root: _react2['default'].PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return AdminComponent;
})(_react2['default'].Component);

var Home = (function (_AdminComponent) {
  _inherits(Home, _AdminComponent);

  function Home() {
    _classCallCheck(this, Home);

    _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Home, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      if (typeof io !== "undefined") io.socket.get(this.props.root, function (res) {
        _this.setState(res);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var CurrentLayout = this.props.layout || _layout2['default'];
      return _react2['default'].createElement(
        CurrentLayout,
        _extends({}, this.props, this.state),
        _react2['default'].createElement(
          'h1',
          null,
          'ADMIN: HomePage'
        )
      );
    }
  }]);

  return Home;
})(AdminComponent);

exports.Home = Home;

var FormItem = (function (_AdminComponent2) {
  _inherits(FormItem, _AdminComponent2);

  function FormItem() {
    _classCallCheck(this, FormItem);

    _get(Object.getPrototypeOf(FormItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FormItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.item) this.getItem(this.props.identity || this.props.params.identity);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      if (this.props.params.identity !== props.params.identity) this.getItem(props.params.identity);
    }
  }, {
    key: 'getItem',
    value: function getItem(identity) {
      var _this2 = this;

      this.loading = true;
      var url = this.props.params.id ? "/" + this.props.params.id : "/new";
      if (typeof io !== "undefined") {
        io.socket.get(this.props.root + "/" + identity + url, function (res) {
          _this2.loading = false;
          _this2.setState(res);
        });
      }
    }
  }, {
    key: 'multipart',
    value: function multipart(data, binaries, cb) {
      var _this3 = this;

      if (binaries.length) {
        (function () {
          var tmp = binaries.pop();
          if (data[tmp.label] instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function (upload) {
              data[tmp.label] = upload.target.result;
              _this3.multipart(data, binaries, cb);
            };
            reader.readAsDataURL(data[tmp.label]);
          } else _this3.multipart(data, binaries, cb);
        })();
      } else cb(data);
    }
  }, {
    key: 'saving',
    value: function saving(data, url, cb) {
      if (typeof io !== "undefined") {
        if (typeof url === 'function') {
          cb = url;
          url = "";
        }
        var identity = this.props.identity || this.props.params.identity,
            fItem = this.props.formItem;
        if (this.state && this.state.formItem) fItem = this.state.formItem;
        var binaries = fItem.filter(function (a) {
          return a.type === 'binary';
        });
        this.multipart(data, binaries, function (result) {
          io.socket.post("/" + identity + url, result, function (res) {
            if (cb) cb(res);
          });
        });
      }
    }
  }, {
    key: 'onSave',
    value: function onSave(data) {}
  }, {
    key: 'render',
    value: function render() {
      var CurrentLayout = this.props.layout || _layout2['default'];
      var modelForm = undefined;
      if (this.props.models) {
        var identity = this.props.identity || this.props.params.identity;
        modelForm = this.props.models[identity];
      }
      if (this.props.formItem || this.state && this.state.formItem) var CurrentAdForm = _react2['default'].createElement(_form2['default'], _extends({}, this.props, this.state, { onSave: this.onSave.bind(this), modelForm: modelForm }));
      return _react2['default'].createElement(
        CurrentLayout,
        _extends({}, this.props, this.state),
        CurrentAdForm || ''
      );
    }
  }]);

  return FormItem;
})(AdminComponent);

FormItem.contextTypes = { router: _reactRouter.Navigation.contextTypes };

var Update = (function (_FormItem) {
  _inherits(Update, _FormItem);

  function Update() {
    _classCallCheck(this, Update);

    _get(Object.getPrototypeOf(Update.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Update, [{
    key: 'onSave',
    value: function onSave(data) {
      var _this4 = this;

      var identity = this.props.identity || this.props.params.identity;
      this.saving(data, "/" + this.props.params.id, function (res) {
        _this4.context.router.transitionTo("list", { identity: identity });
      });
    }
  }]);

  return Update;
})(FormItem);

exports.Update = Update;

var Create = (function (_FormItem2) {
  _inherits(Create, _FormItem2);

  function Create() {
    _classCallCheck(this, Create);

    _get(Object.getPrototypeOf(Create.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Create, [{
    key: 'onSave',
    value: function onSave(data) {
      var _this5 = this;

      var identity = this.props.identity || this.props.params.identity;
      this.saving(data, function (res) {
        _this5.context.router.transitionTo("list", { identity: identity });
      });
    }
  }]);

  return Create;
})(FormItem);

exports.Create = Create;

var List = (function (_AdminComponent3) {
  _inherits(List, _AdminComponent3);

  function List() {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      filter: {}
    };
  }

  _createClass(List, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.item) {
        this.getItems(this.props.identity || this.props.params.identity);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      if (this.props.params.identity !== props.params.identity) {
        this.getItems(props.params.identity);
      }
    }
  }, {
    key: 'getItems',
    value: function getItems(identity, params) {
      var _this6 = this;

      if (typeof io !== "undefined") {
        io.socket.get(this.props.root + "/" + identity, params || {}, function (res) {
          _this6.setState(res);
        });
      }
    }
  }, {
    key: 'filterBy',
    value: function filterBy(lbl, val) {
      var filter = this.state.filter;
      filter[lbl] = { 'contains': val };
      if (val.length) {
        this.setState(filter);
      } else if (this.state.filter[lbl]) {
        delete this.state.filter[lbl];
      }
      this.getItems(this.props.identity || this.props.params.identity, val ? { contain: this.state.filter } : null);
    }
  }, {
    key: 'sortBy',
    value: function sortBy(lbl) {
      if (!this.sort) {
        this.sort = [lbl, 'DESC'];
      } else {
        if (this.sort[0] === lbl) this.sort[1] = this.sort[1] === 'ASC' ? 'DESC' : 'ASC';else this.sort[0] = lbl; // this.sort = [lbl, 'ASC'];
      }
      this.getItems(this.props.identity || this.props.params.identity, { sort: this.sort.join(" ") });
    }
  }, {
    key: 'render',
    value: function render() {
      var CurrentLayout = this.props.layout || _layout2['default'];
      return _react2['default'].createElement(
        CurrentLayout,
        _extends({}, this.props, this.state),
        _react2['default'].createElement(_list2['default'], _extends({ items: [] }, this.props.params, this.props, this.state, {
          sortBy: this.sortBy.bind(this), filterBy: this.filterBy.bind(this) }))
      );
    }
  }]);

  return List;
})(AdminComponent);

exports.List = List;

function Routes() {
  var root = arguments.length <= 0 || arguments[0] === undefined ? '/admin' : arguments[0];

  return _react2['default'].createElement(
    _reactRouter.Route,
    { handler: _reactRouter.RouteHandler },
    _react2['default'].createElement(_reactRouter.Route, { name: 'home', path: root, handler: Home }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'list', path: root + '/:identity', handler: List }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'create', path: root + '/:identity/new', handler: Create }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'update', path: root + '/:identity/:id', handler: Update })
  );
}