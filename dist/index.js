'use strict';

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _addCustomPropFallbacks = require('./addCustomPropFallbacks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _postcss2.default.plugin('custom-prop-fallbacks', () => _addCustomPropFallbacks.addCustomPropFallbacks);