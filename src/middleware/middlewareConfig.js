import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './reduxLogger';
import serverActionMiddleware from '../middleware/serverAction';

export default [
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
  serverActionMiddleware,
];
