'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = require('../utils');
var typeUtils = require('../typeUtils');

var getCode = function getCode(code) {

    var generate = false;

    if (!code) {
        generate = true;
        code = Math.floor(Math.random() * 900000) + 100000;
    }

    return new Promise(function (resolve, reject) {

        return utils.getDataFromRef(utils.getDatabase().ref('verifications/codes/' + code)).then(function (data) {
            if (data) return data;
            if (generate) return generateCode();
            reject('Code invalid');
        });
    });
};

exports.default = getCode;