/**
 * Configuration file of Redux Reducers
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { userReducer } from './modules/user/u';

const rootReducer: Redux.Reducer = combineReducers({
	user: userReducer,
	routing: routerReducer
});

export default rootReducer;
