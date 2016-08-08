const utils = require('../utils');

const worker = (data, progress, resolve, reject) => {

    const networkRef = utils.getUserRef(data.payload.uid).child('network');

    utils.getDataFromRef(networkRef.child('verification_code')).then((result) => {
        if(result.code === data.payload.code) {
            // verify the user  and add network info here
            utils.postResults(data, {
                success: true
            });
            codeRef.remove();
        } else {
            utils.postResults(data, {
                success: false
            });
        }

        resolve();
    });
};

const key = 'USER_NETWORK_VERIFICATION_VERIFY';
module.exports = {
    worker,
    key
};