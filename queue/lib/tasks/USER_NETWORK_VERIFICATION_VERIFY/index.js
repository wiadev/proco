'use strict';

var utils = require('../utils');

var worker = function worker(data, progress, resolve, reject) {

    var networkRef = utils.getUserRef(data.payload.uid).child('network');

    utils.getDataFromRef(networkRef.child('verification_code')).then(function (result) {
        if (result.code === data.payload.code) {
            // verify the user  and add network info here
            utils.postResults(data, {
                success: true
            });
            codeRef.remove();
        } else {
            utils.postResults(data, {
                success: false
            });
        }

        resolve();
    });
};

var key = 'USER_NETWORK_VERIFICATION_VERIFY';
module.exports = {
    worker: worker,
    key: key
};