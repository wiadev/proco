var functions = require('firebase-functions');
var axios = require('axios');

module.exports = functions.database().path('/users/info/{uid}').on('write', function(event) {

    if (event.data.previous.child('mobile_number').val() === event.data.child('mobile_number').val()) {
        return Promise.resolve();
    }

    var data = event.data;
    var uid = event.params.uid;
    var adminRoot = data.adminRef.root;

    // @TODO: Verify the number here too.
    // @TODO: Handle brute forcing.

    return adminRoot.child('/users/is/' + uid + '/mobile_number_verified').set(false).then(function () {

        if (!event.data.child('mobile_number').val()) { // so the user deleted their number, somehow; the don't support this for now
            return Promise.resolve();
        }

        var code = Math.floor(Math.random() * 900000) + 100000;
        var verRef = adminRoot.child('/users/verifications/mobile_number/' + uid); // verification ref
        return verRef.child('_code').set(code).then(function () {
            var mobile_number = data.child('mobile_number').val();
            return axios({
                method: 'post',
                url: 'https://api.bulutfon.com/messages',
                data: {
                    receivers: mobile_number,
                    title: 'BARBAR',
                    content: `Use ${code} to verify your number.`,
                    access_token: 'a110f6e2e5528ab87352ea4daa671cf41ab0cbb1eb32d4f96b1f42bc64ff8cae',
                },
            }).then(function (data) {
                return verRef.child('status').set('SENT_SMS');
            }).catch(function (e) {
                console.log("There was an error with the mobile number verification", e);
                return verRef.child('status').set('FAILED_SMS');
            })
        });
    });

});
