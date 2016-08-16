const utils = require('../utils');
const typeUtils = require('../typeUtils');

const getCode = (code) => {

    let generate = false;

    if (!code) {
        generate = true;
        code = Math.floor(Math.random() * 900000) + 100000;
    }

    return new Promise((resolve, reject) => {

        return utils.getDataFromRef(
            utils.getDatabase().ref(`verifications/codes/${code}`)
        ).then(data => {
            if (data) return data;
            if (generate) return generateCode();
            reject('Code invalid');
        });

    });
};

export default getCode;