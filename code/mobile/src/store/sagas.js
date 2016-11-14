import authSagas from '../core/auth/sagas';
import userSagas from '../modules/user/sagas';
import locationSagas from '../core/location/sagas';
import fcmSagas from '../core/fcm/sagas';
import profilesSagas from '../modules/profiles/sagas';
import poolSagas from '../modules/pool/sagas';
import chatSagas from '../modules/chat/sagas';
import inAppAlertSagas from '../modules/inappalerts/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
    ...locationSagas,
    ...fcmSagas,
    ...profilesSagas,
    ...poolSagas,
    ...chatSagas,
    ...inAppAlertSagas,
  ];
}
