import { Dispatcher } from '../queueCreator';

const worker = (data, progress, resolve, reject) => {

    const branches = {
        'refs/heads/master': {

        }
    };

    if (branches.hasOwnProperty(data.payload.ref)) {
        Dispatcher({
            type: 'APP_PUSH_RELEASE',
            payload: {

            }
        })
    }
};

const key = 'APP_GIT_PUSH_RECEIVED';

module.exports = {
    worker,
    key
};