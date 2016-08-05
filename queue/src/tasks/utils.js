const firebase = require('firebase');
const database = firebase.database();

const postResults = (data, result) => {
	return database.ref('queues')
				   .child(data.action)
				   .child('results')
				   .child(data.payload.key)
				   .set(result);
};

const getDatabase = () => {
	return database;
};

const getUserRef = (uid) => {
	return database.ref('users').child(uid);
};

const getDataFromRef = (ref) => ref.once('value').then(snap => snap.val());

module.exports = {
	postResults,
	getUserRef,
	getDatabase,
	getDataFromRef
};