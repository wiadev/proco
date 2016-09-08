const functions = require('firebase-functions');

const $ = {};

$.ocean = functions.database().path('/ocean/{key}')
  .on('write', (event) => generator(event));

$.pools = functions.database().path('/pools/{key}')
  .on('write', (event) => (event.data.val() ? Promise.resolve() : generator(event)));

$.filters = functions.database().path('/users/filters/{key}')
  .on('write', (event) => (event.data.previous.val() === null ? Promise.resolve() : generator(event)));

module.exports = $;