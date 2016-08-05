import { Dispatcher } from '../tasks/queueCreator';

exports.releaseTrigger = (req, res) => {

    if (req.query.challenge === '2156e499-366d-45b3-a8c6-2fb599f627aa' && req.body.ref) {

        Dispatcher('APP_GIT_PUSH_RECEIVED', {
            payload: req.body
        });

    } else {

        res.status(403).send('You are not welcomed here.');

    }

};