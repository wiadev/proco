import authSagas from '../core/auth/sagas';
import locationSagas from '../core/location';
import poolSagas from '../modules/pool/sagas';
import userSagas from '../modules/user/sagas';
import chatSagas from '../modules/chat/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
    ...locationSagas,
    ...poolSagas,
    ...chatSagas,
  ];
}
