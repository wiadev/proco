import { assign } from '../../../core/utils';

const reducer = (data) => {
  const { blocked } = data;

  return Promise.resolve(assign(data, {
  }));
};

export default reducer;
