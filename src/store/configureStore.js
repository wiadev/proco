/* @flow */

import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import devTools from 'remote-redux-devtools';
import middleware from './../middleware/middlewareConfig';
import reducer from './configureReducers';
import immutableTransform from 'redux-persist-transform-immutable'

export const configureStore = (onCompletion = () => {}) => {

  const enhancer = compose(
    applyMiddleware(...middleware),
    devTools({
      name: 'ProcoApp', realtime: true
    }),
    autoRehydrate()
  );

  let store = createStore(
    reducer,
    null,
    enhancer
  );

  persistStore(store, {
    storage: AsyncStorage,
    transforms: [immutableTransform()]
  }, onCompletion);

  return store;

};
