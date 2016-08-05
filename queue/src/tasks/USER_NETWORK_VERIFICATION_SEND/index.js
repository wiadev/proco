const axios = require('axios');
const utils = require('../utils');

const worker = (data, progress, resolve, reject) => {

    const email = data.payload.email;
    emailPieces = email.split('@');
    extension = emailPieces[1].split('.').join('-');

    const networkExtensionsRef = utils.getDatabase().ref('network-extensions');
    utils.getDataFromRef(networkExtensionsRef.child(extension)).then(network => {
        if(network === null) {
            utils.postResults(data, {
                success: false,
                error: "EXTENSION_NOT_VALID"
            });
        } else {
            const code = Math.floor(Math.random()*900000) + 100000;
            const networkRef = utils.getUserRef(data.payload.uid).child('network');

            networkRef.set({
                code: {
                 code: code, time: Date.now()
                },
                network: network
            });

            axios({
                method: 'post',
                url: 'https://api.mailgun.net/v3/icoz.co/messages',
                data: {
                    to: data.payload.email,
                    from: 'Proco Verification <verification@icoz.co>',
                    subject: `Use ${code} to verify your e-mail - Proco App`,
                    text: `This is going to be an HTML template with the code  ${code} `
                },
                auth: {
                    username: 'api',
                    password: 'key-c31f9f2fec6c5f5d99e19868314c0323'
                }
            }).then(() => {

                resolve();
            });
        }
    });

};

const key = 'USER_NETWORK_VERIFICATION_SEND';
module.exports = {
    worker,
    key
};