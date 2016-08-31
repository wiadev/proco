const functions = require('firebase-functions');
const moment = require('moment');
const deepEqual = require('deep-equal');

const handleOnboardedCheck = require('./common/handleOnboardedCheck');

const generateUserSummary = ({
    network = null,
    gender = null,
    birthday = null,
    first_name = null,
    last_name = null,
} = {}) => {
    let summary = {};

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

module.exports = functions.database().path('/users/info/{uid}').on('write', function (event) {

    const data = event.data;
    const uid =  event.params.uid;

    const previousData = data.previous.val();
    const currentData = data.val();

    const previous = generateUserSummary(previousData);
    const current = generateUserSummary(currentData);

    if (deepEqual(previous, current)) return Promise.resolve();

    const adminRootRef = data.adminRef.root;
    const summary = adminRootRef.child('/users/summary/' + uid)
        .update(current)
        .then(() => {
            if (previousData) return Promise.resolve();
            return data.event.ref.child('register_date').set(moment().format('YYYY-MM-DD'));
        });

    return Promise.all([summary, handleOnboardedCheck(adminRootRef, uid)]);

});
