/* @flow */

import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import middleware from './../middleware/middlewareConfig';
import reducer from './configureReducers';

export const configureStore = (onCompletion = () => {}) => {

  const store = autoRehydrate()(createStore)(reducer, applyMiddleware(...middleware));

  // persistStore(store, {
  //   storage: AsyncStorage,
  // }, onCompletion);

  onCompletion();
  return store;

};
