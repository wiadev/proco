import authSagas from '../core/auth/sagas';
import locationSagas from '../core/location';
import poolSagas from '../modules/pool/sagas';
import userSagas from '../modules/user/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
    ...locationSagas,
    ...poolSagas,
  ];
}
