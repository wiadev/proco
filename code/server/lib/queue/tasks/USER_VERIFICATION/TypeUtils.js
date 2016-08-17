'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$Validations = require('proco-common').Validations;

var NetworkEmailValidation = _require$Validations.NetworkEmailValidation;
var PhoneNumberValidation = _require$Validations.PhoneNumberValidation;


var email = {
    verifier: function verifier(email) {
        return new Promise(function (resolve, reject) {

            // verify email here
            emailPieces = email.split('@');
            extension = emailPieces[1].split('.').join('-');

            var networkExtensionsRef = utils.getDatabase().ref('network-extensions');
            return utils.getDataFromRef(networkExtensionsRef.child(extension)).then(function (network) {
                if (network) {
                    resolve(code);
                }

                reject('INVALID_EMAIL');
            });
        });
    },
    sender: function sender(number, code) {
        return (0, _axios2.default)({
            method: 'post',
            url: 'https://api.mailgun.net/v3/services.procoapp.com/messages',
            data: {
                to: number,
                from: 'Proco Verification <verification@services.procoapp.com>',
                subject: 'Use ' + code + ' to verify your e-mail - Proco App',
                text: 'This is going to be an HTML template with the code  ' + code + ' '
            },
            auth: {
                username: 'api',
                password: 'key-c31f9f2fec6c5f5d99e19868314c0323'
            }
        });
    }
};

var sms = {
    verifier: function verifier(number, code) {
        return new Promise(function (resolve, reject) {
            resolve(number);
            return;
        });
    },
    sender: function sender(number, code) {
        return (0, _axios2.default)({
            method: 'post',
            url: 'https://api.bulutfon.com/messages',
            data: {
                receivers: to,
                title: 'BARBAR',
                content: 'Use ' + code + ' to verify your number.'
            },
            query: {
                access_token: 'fdfd82458426e29178c8861851bf12d6c1461ecafb4abada67c62eea4db211f2'
            }
        });
    }
};

exports.default = typeUtils = {
    email: email,
    sms: sms
};