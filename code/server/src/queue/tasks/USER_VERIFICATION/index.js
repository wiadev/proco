import * as firebase from 'firebase';
const TypeUtils = require('./TypeUtils');
const database = () => firebase.database();
const getUserRef = (uid) => database().ref(`users/${uid}`);
const getDataFromRef = (ref) => ref.once('value').then(snap => snap.val());

const getCode = () => Math.floor(Math.random() * 900000) + 100000;


const worker = (data, progress, resolve, reject) => {

    const { verifier, sender } = TypeUtils[data.payload.type];
    const userRef = getUserRef(data.payload.uid);

    verifier(data.payload.to).then((to) => {
        const code = getCode();
        userRef
                .child(`verifications/${data.payload.type}/${code}`)
                .set({
                    time: Date.now()
                })
                .then(() => {
                    sender(to, code).then((data) => {
                        console.log("data", data)
                        resolve();
                    }).catch(e => console.log(e))
                });
    });

};

const key = 'USER_VERIFICATION';
module.exports = {
    worker,
    key
};
