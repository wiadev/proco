'use strict';

var _queueCreator = require('../queueCreator');

var worker = function worker(data, progress, resolve, reject) {

    var branches = {
        'refs/heads/master': {}
    };

    if (branches.hasOwnProperty(data.payload.ref)) {
        (0, _queueCreator.Dispatcher)({
            type: 'APP_PUSH_RELEASE',
            payload: {}
        });
    }
};

var key = 'APP_GIT_PUSH_RECEIVED';

module.exports = {
    worker: worker,
    key: key
};