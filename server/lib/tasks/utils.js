'use strict';

var firebase = require('firebase');
var database = firebase.database();

var postResults = function postResults(data, result) {
	return database.ref('queues').child(data.action).child('results').child(data.payload.key).set(result);
};

var getDatabase = function getDatabase() {
	return database;
};

var getUserRef = function getUserRef(uid) {
	return database.ref('users').child(uid);
};

var getDataFromRef = function getDataFromRef(ref) {
	return ref.once('value').then(function (snap) {
		return snap.val();
	});
};

module.exports = {
	postResults: postResults,
	getUserRef: getUserRef,
	getDatabase: getDatabase,
	getDataFromRef: getDataFromRef
};