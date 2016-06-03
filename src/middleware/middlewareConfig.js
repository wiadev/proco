import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './reduxLogger';

export default [
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
];
