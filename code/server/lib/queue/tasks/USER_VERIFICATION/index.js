'use strict';

var TypeUtils = require('./TypeUtils');
var GetCode = require('./GetCode');

var worker = function worker(data, progress, resolve, reject) {

    if (data.payload.type !== 'email' || data.payload.type !== 'sms') throw 'Invalid type';

    var _TypeUtils$data$paylo = TypeUtils[data.payload.type];
    var verifier = _TypeUtils$data$paylo.verifier;
    var sender = _TypeUtils$data$paylo.sender;


    verifier(data.payload.to).then(function () {
        return getCode().then(function (code) {
            return utils.getDatabase().ref('verifications/users/' + data.payload.uid + '/' + data.payload.type + '/' + code).set({
                time: Date.now()
            }).then(function () {
                return sender(data.payload.to, code).then(function () {
                    resolve();
                });
            });
        });
    });
};

var key = 'USER_VERIFICATION';
module.exports = {
    worker: worker,
    key: key
};