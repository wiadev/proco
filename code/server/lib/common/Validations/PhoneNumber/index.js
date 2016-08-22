'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = require('validator');

var Validate = function Validate(number) {
    var test = (0, _validator.isMobilePhone)(number, 'tr-TR');

    if (tests) return number;
    return false;
};

exports.default = Validate;