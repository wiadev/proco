import authSagas from '../core/auth/sagas';
import userSagas from '../modules/user/sagas';
import locationSagas from '../core/location';
import profilesSagas from '../modules/profiles/sagas';
import poolSagas from '../modules/pool/sagas';
import chatSagas from '../modules/chat/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
    ...locationSagas,
    ...profilesSagas,
    ...poolSagas,
    ...chatSagas,
  ];
}
