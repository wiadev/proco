var functions = require('firebase-functions');
const handleOnboardedCheck = require('./handleOnboardedCheck');

module.exports = function(type) {
    return function(event) {

        if (!event.data.child('code').val() || (event.data.previous.child('code').val() === event.data.child('code').val())) {
            return Promise.resolve();
        }

        var data = event.data;
        var uid = event.params.uid;
        var adminRoot = data.adminRef.root;

        // @TODO: Handle brute forcing.

        if (event.data.child('code').val() === event.data.child('_code').val()) {
            return adminRoot.child('/users/is/' + uid + '/' + type + '_verified').set(true).then(function () {
                return data.adminRef.set(null).then(() => {
                    if (type === 'network_email') {
                        return handleOnboardedCheck(adminRoot, uid);
                    }
                    return Promise.resolve();
                })
            });
        } else {
            return data.adminRef.update({
                code: null,
                status: 'WRONG_CODE',
            });
        }

    };
};