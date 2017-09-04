'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomPropsFallbacks = function () {
  _createClass(CustomPropsFallbacks, null, [{
    key: 'setsCustomProp',
    value: function setsCustomProp(decl) {
      return decl.prop.indexOf('--') === 0;
    }
  }, {
    key: 'usesCustomProp',
    value: function usesCustomProp(value) {
      return value.indexOf('var(--') !== -1;
    }
  }, {
    key: 'getVariableFrom',
    value: function getVariableFrom(value) {
      if (!CustomPropsFallbacks.usesCustomProp(value)) {
        return null;
      }

      var extractedValue = value.substring(value.indexOf('var(') + 4);

      if (extractedValue.indexOf(')') === -1) {
        return null;
      }

      return extractedValue.substring(0, extractedValue.indexOf(')'));
    }
  }]);

  function CustomPropsFallbacks(root) {
    _classCallCheck(this, CustomPropsFallbacks);

    this.root = root;
    this.customProps = {};

    this.addFallback = this.addFallback.bind(this);
    this.collectCustomProps = this.collectCustomProps.bind(this);

    this.collectCustomProps();
  }

  _createClass(CustomPropsFallbacks, [{
    key: 'shouldRun',
    value: function shouldRun() {
      return !!Object.keys(this.customProps).length;
    }
  }, {
    key: 'collectCustomProps',
    value: function collectCustomProps() {
      var _this = this;

      this.root.walkDecls(function (decl) {
        if (CustomPropsFallbacks.setsCustomProp(decl)) {
          _this.customProps[decl.prop] = decl.value.trim();
        }
      });
    }
  }, {
    key: 'addFallback',
    value: function addFallback(decl) {
      var originalValue = decl.value.trim();
      var value = CustomPropsFallbacks.getVariableFrom(originalValue);

      if (value === null || !(value in this.customProps)) {
        return;
      }

      var newValue = originalValue.replace('var(' + value + ')', this.customProps[value]);
      var newRule = '\n\t' + decl.prop + ': ' + newValue;
      decl.before(newRule);
    }
  }, {
    key: 'run',
    value: function run() {
      this.root.walkDecls(this.addFallback);
    }
  }]);

  return CustomPropsFallbacks;
}();

module.exports = _postcss2.default.plugin('custom-prop-fallbacks', function () {
  return function (root) {
    var customPropsFallbacks = new CustomPropsFallbacks(root);
    if (customPropsFallbacks.shouldRun()) {
      customPropsFallbacks.run();
    }
  };
});