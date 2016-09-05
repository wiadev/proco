const functions = require('firebase-functions');

module.exports = functions.database()
  .path('/users/matches/{by}/{to}').on('write', (event) => {


      console.log("match", event);
      return Promise.resolve();
});
