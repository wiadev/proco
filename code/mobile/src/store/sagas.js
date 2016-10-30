import { authSagas } from '../core/auth/sagas';
import { userSagas } from '../modules/user/sagas';

export default function* sagas() {
  yield [
    ...authSagas,
    ...userSagas,
  ];
}
