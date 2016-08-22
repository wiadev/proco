'use strict';

var _PhoneNumber = require('./PhoneNumber');

var _PhoneNumber2 = _interopRequireDefault(_PhoneNumber);

var _NetworkEmail = require('./NetworkEmail');

var _NetworkEmail2 = _interopRequireDefault(_NetworkEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  PhoneNumberValidation: _PhoneNumber2.default,
  NetworkEmailValidation: _NetworkEmail2.default
};