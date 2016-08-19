'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sms = exports.email = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var email = exports.email = {
    verifier: function verifier(email) {
        return new Promise(function (resolve, reject) {

            return resolve(email);
            /*
            // verify email here
            emailPieces = email.split('@');
            extension = emailPieces[1].split('.').join('-');
             const networkExtensionsRef = utils.getDatabase().ref('network-extensions');
            return utils.getDataFromRef(networkExtensionsRef.child(extension)).then(network => {
                if (network) {
                    resolve(code);
                }
                 reject('INVALID_EMAIL');
            });*/
        });
    },
    sender: function sender(to, code) {
        return (0, _axios2.default)({
            method: 'post',
            url: 'https://api.mailgun.net/v3/services.procoapp.com/messages',
            data: {
                to: to,
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

var sms = exports.sms = {
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