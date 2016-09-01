var functions = require('firebase-functions');

module.exports = functions.database().path('/tasks/user-cleanup/{uid}').on('write', function(event) {

    if (event.data.val() !== true) return Promise.resolve();

    const ref = (type) => event.data.adminRef.root.child(`/users/${type}/${event.params.uid}`);

    let actions = [];

    actions.push(ref('info').set(null));
    actions.push(ref('settings').set(null));
    actions.push(ref('filters').set(null));
    actions.push(ref('interactions').set(null));
    actions.push(ref('interaction-indexes').set(null));
    actions.push(ref('tokens').set(null));
    actions.push(ref('photos').set(null));
    actions.push(ref('summary').set(null));
    actions.push(ref('is').set(null));

    return Promise.all(actions).then(() => event.data.ref.set(null));

});
