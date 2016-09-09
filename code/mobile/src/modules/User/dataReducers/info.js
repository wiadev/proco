import { assign } from '../../../core/utils';
import { getNetworkTitle } from '../../../core/Api';

const reducer = async (data) => {

  const network = data.network ? await getNetworkTitle(data.network) : null;

  return Promise.resolve(assign(data, {
    network
  }));
};

export default reducer;
