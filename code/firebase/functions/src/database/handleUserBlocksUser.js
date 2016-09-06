const functions = require('firebase-functions');

module.exports = functions.database().path('/users/blocks/{blocker}/{blocked}').on('write', function(event) {

    const data = event.data;
    const { blocker, blocked } = event.params;
    const poolsRef = data.adminRef.root.child('pools');

    let promises = [];
    promises.push(poolsRef.child(`${blocker}/${blocked}`).set(null));
    promises.push(poolsRef.child(`${blocked}/${blocker}`).set(null));
    
    return Promise.all(promises);

});
