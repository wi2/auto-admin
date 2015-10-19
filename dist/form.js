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

var _newforms = require('newforms');

var _newformsBootstrap = require('newforms-bootstrap');

var _newformsBootstrap2 = _interopRequireDefault(_newformsBootstrap);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(_default, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.makeForm(this.props.formItem);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.mForm) delete this.mForm;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      if (this.props.formItem != props.formItem) this.makeForm(props.formItem);
    }
  }, {
    key: 'makeForm',
    value: function makeForm(formItem) {
      var data = this.props.item || null;
      var mobj = {};
      if (formItem) {
        for (var i = 0, len = formItem.length; i < len; i++) {
          var item = formItem[i];
          if (['id', 'createdAt', 'updatedAt'].indexOf(item.label) === -1) {
            var params = item;

            if (data && data[item.label]) params.initial = data[item.label];else if (item.defaultsTo) params.initial = item.defaultsTo;
            delete params.defaultsTo;

            switch (item.input) {
              case 'binary':
                if (data && data[item.label]) params.initial = this.getFile(item.label, data[item.label]);
                mobj[item.label] = (0, _newforms.FileField)(params);break;
              case 'image':
                if (data && data[item.label]) params.initial = this.getFile(item.label, data[item.label]);
                mobj[item.label] = (0, _newforms.ImageField)(params);break;
              case 'email':
                mobj[item.label] = (0, _newforms.EmailField)(params);break;
              case 'url':
                mobj[item.label] = (0, _newforms.URLField)(params);break;
              case 'urlish':
                mobj[item.label] = (0, _newforms.FilePathField)(params);break;
              case 'ipv4':
                mobj[item.label] = (0, _newforms.GenericIPAddressField)(params, 'ipv4');break;
              case 'ipv6':
                mobj[item.label] = (0, _newforms.GenericIPAddressField)(params, 'ipv6');break;
              case 'text':
                params.widget = _newforms.Textarea;
              case 'string':
                mobj[item.label] = (0, _newforms.CharField)(params);break;
              case 'regex':
                mobj[item.label] = (0, _newforms.RegexField)(eval(item.pattern), params);break;
              case 'slug':
                mobj[item.label] = (0, _newforms.SlugField)(params);break;
              case 'integer':
                mobj[item.label] = (0, _newforms.IntegerField)(params);break;
              case 'float':
                mobj[item.label] = (0, _newforms.FloatField)(params);break;
              case 'date':
                mobj[item.label] = (0, _newforms.DateField)(params);break;
              case 'datetime':
                mobj[item.label] = (0, _newforms.DateTimeField)(params);break;
              case 'boolean':
                mobj[item.label] = (0, _newforms.BooleanField)(params);break;
              case 'choice':
                params.choices = item['in'];
                mobj[item.label] = (0, _newforms.ChoiceField)(params);break;
            }
          }
        }
      }
      this.mForm = _newforms.Form.extend(mobj);
    }
  }, {
    key: 'getFile',
    value: function getFile(name, url) {
      function CurrentFile() {
        this.name = name;
        this.url = url;
      }
      CurrentFile.prototype.toString = function () {
        return this.name;
      };
      return new CurrentFile(name, url);
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(e) {
      e.preventDefault();
      var form = this.refs.mForm.getForm();
      if (form.validate()) this.props.onSave(form.cleanedData);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.mForm) return _react2['default'].createElement('form', null);

      if (this.props.modelForm) return _react2['default'].createElement(
        'form',
        { onSubmit: this._onSubmit.bind(this), encType: 'multipart/form-data' },
        _react2['default'].createElement(
          _newforms.RenderForm,
          { form: this.mForm, ref: 'mForm' },
          this.props.modelForm
        )
      );

      return _react2['default'].createElement(
        'form',
        { onSubmit: this._onSubmit.bind(this), encType: 'multipart/form-data' },
        _react2['default'].createElement(
          'h1',
          null,
          this.props.identity
        ),
        _react2['default'].createElement('hr', null),
        _react2['default'].createElement(
          'p',
          { className: 'text-right' },
          _react2['default'].createElement(
            'button',
            { className: 'btn btn-default' },
            'Save'
          )
        ),
        _react2['default'].createElement(
          _newforms.RenderForm,
          { form: this.mForm, ref: 'mForm' },
          _react2['default'].createElement(_newformsBootstrap2['default'], { form: this.mForm })
        )
      );
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];