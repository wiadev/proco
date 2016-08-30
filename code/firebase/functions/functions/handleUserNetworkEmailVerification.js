var functions = require('firebase-functions');
var axios = require('axios');

module.exports = functions.database().path('/users/verifications/mobile_number/{uid}').on('write', function(event) {

    if (!event.data.child('code').val() || (event.data.previous.child('code').val() === event.data.child('code').val())) {
        return Promise.resolve();
    }

    var data = event.data;
    var uid = event.params.uid;
    var adminRoot = data.adminRef.root;

    // @TODO: Handle brute forcing.

    if (event.data.child('code').val() === event.data.child('_code').val()) {
        return adminRoot.child('/users/is/' + uid + '/mobile_number_verified').set(true).then(function () {
           return data.adminRef.set(null);
        });
    } else {
        return data.adminRef.update({
            code: null,
            status: 'WRONG_CODE',
        });
    }

});
