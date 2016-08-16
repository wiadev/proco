import { NetworkEmail, PhoneNumber } from '../../../Validations';
import axios from 'axios';

const email = {
    verifier: (email) => {
        return new Promise((resolve, reject) => {

        // verify email here
        emailPieces = email.split('@');
        extension = emailPieces[1].split('.').join('-');

        const networkExtensionsRef = utils.getDatabase().ref('network-extensions');
        return utils.getDataFromRef(networkExtensionsRef.child(extension)).then(network => {
            if (network) {
                resolve(code);
            }

            reject('INVALID_EMAIL');
        });
    },
    sender: (number, code) => {
        return axios({
            method: 'post',
            url: 'https://api.mailgun.net/v3/services.procoapp.com/messages',
            data: {
                to: number,
                from: 'Proco Verification <verification@services.procoapp.com>',
                subject: `Use ${code} to verify your e-mail - Proco App`,
                text: `This is going to be an HTML template with the code  ${code} `
            },
            auth: {
                username: 'api',
                password: 'key-c31f9f2fec6c5f5d99e19868314c0323'
            }
        });
    }
}

const sms = {
    verifier: (number, code) => {
        return new Promise((resolve, reject) => {
            resolve(number);
            return;
        });
    },
    sender: (number, code) => {
        return axios({
            method: 'post',
            url: 'https://api.bulutfon.com/messages',
            data: {
                receivers: to,
                title: 'BARBAR',
                content: `Use ${code} to verify your number.`
            },
            query: {
                access_token: 'fdfd82458426e29178c8861851bf12d6c1461ecafb4abada67c62eea4db211f2'
            }
        });
    }
} 

export default typeUtils = {
    email,
    sms
};
