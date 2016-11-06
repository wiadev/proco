import { authSagas } from '../core/auth/sagas';
import locationSagas from '../core/location';
import { userSagas } from '../modules/user/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
    ...locationSagas,
  ];
}
