/**
 * Configuration file of Redux Store
 */

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const createLogger = require('redux-logger');
const router = routerMiddleware(browserHistory);

/**
 * Creates a Redux Store from a given initialState
 */
export function configureStore(initialState) {

    const logger = createLogger();

    let middlewares = [router, thunk, logger];

    const finalCreateStore = compose(
        applyMiddleware(...middlewares)
    )(createStore);

    /** Final Redux Store */
    const store = finalCreateStore(
        rootReducer,
        initialState,
    );

    return store;
};
