const functions = require('firebase-functions');
const moment = require('moment');
const deepEqual = require('deep-equal');

const generateUserSummary = (info = {}) => {
    let summary = {};

    const { network, gender, birthday, first_name, last_name } = info;

    if (network) summary.network = network;
    if (gender) summary.gender = gender;

    if (birthday) {
        summary.age = moment().diff(moment(birthday, 'YYYY-MM-DD'), 'years');
    }

    if (first_name && last_name) {
        summary.display_name = `${first_name} ${last_name.charAt(0)}.`;
    }

    return summary;
};

module.exports = functions.database().path('/users/info/{uid}').on('write', function(event) {

    const data = event.data;

    const previousData = data.previous.val();

    const previous = generateUserSummary(previousData);
    const current = generateUserSummary(data.val());

    if (deepEqual(previous, current)) return Promise.resolve();

    const summaryRef = data.adminRef.root.child('/users/summary/' + event.params.uid);
    return summaryRef
        .update(current)
        .then(() => {
            if (previousData) return Promise.resolve();
            return data.event.ref.child('register_date').set(moment().format('YYYY-MM-DD'));
        });

});
