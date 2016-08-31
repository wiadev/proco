const functions = require('firebase-functions');

module.exports = functions.database().path('/users/photos/{uid}').on('write', function(event) {

    const data = event.data;
    let promises = [];

    const summaryRef = data.adminRef.root.child('/users/summary/' + event.params.uid);

    const currentAvatar = data.child('avatar').val();
    if (!(data.previous.child('avatar').val() === currentAvatar)) {
        promises.push(summaryRef.child('avatar').set(currentAvatar));
    }

    //@TODO: Handle loops here.

    return Promise.all(promises);

});
