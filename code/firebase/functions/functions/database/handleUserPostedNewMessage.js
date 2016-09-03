const functions = require('firebase-functions');

module.exports = functions.database().path('/threads/_/{thread_id}/{key}')
  .on('write', (event) => {
    console.log("new message", event.data.val(), event.params);
    return Promise.resolve();
  });
