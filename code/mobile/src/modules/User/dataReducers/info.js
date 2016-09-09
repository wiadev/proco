import { assign } from '../../../core/utils';
import { getNetworkTitle } from '../../../core/Api';
import moment from 'moment';

const reducer = async (data) => {

  const network = data.network ? await getNetworkTitle(data.network) : null;
  const birthday = data.birthday ? moment(data.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;

  return Promise.resolve(assign(data, {
    network,
    birthday,
  }));
};

export default reducer;
