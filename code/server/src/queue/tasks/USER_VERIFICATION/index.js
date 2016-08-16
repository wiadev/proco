const TypeUtils = require('./TypeUtils');
const GetCode = require('./GetCode');

const worker = (data, progress, resolve, reject) => {

    if (data.payload.type !== 'email' || data.payload.type !== 'sms') throw 'Invalid type';

    const { verifier, sender } = TypeUtils[data.payload.type];

    verifier(data.payload.to).then(() => {
        return getCode().then(code => {
            return utils.getDatabase()
                .ref(`verifications/users/${data.payload.uid}/${data.payload.type}/${code}`)
                .set({
                    time: Date.now()
                })
                .then(() => {
                    return sender(data.payload.to, code).then(() => {
                        resolve();
                    });
                });
        });
    });

};

const key = 'USER_VERIFICATION';
module.exports = {
    worker,
    key
};