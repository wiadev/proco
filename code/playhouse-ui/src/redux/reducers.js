/**
 * Configuration file of Redux Reducers
 */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

const appReducer = combineReducers({
	routing,
	form,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
