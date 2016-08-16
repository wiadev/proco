'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = require('validator');

var _Utils = require('../../Utils');

var AllowedNetworks = Object.keys(require('../../../config/AllowedNetworks.json'));

var Validate = function Validate(email) {
    email = (0, _validator.normalizeEmail)(email);

    var tests = (0, _Utils.IsAllTrue)([(0, _validator.isEmail)(email), (0, _Utils.InArray)(AllowedNetworks, email.split('@')[1])]);

    if (tests) return email;
    return false;
};

exports.default = Validate;