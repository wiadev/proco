import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './reduxLogger';

export default [
  thunkMiddleware,
  loggerMiddleware,
];
