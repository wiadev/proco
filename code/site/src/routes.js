import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Error404 } from './containers';
import TestUsers from './components/TestUsers';

function getRoutes (store) {

	function requireLogin (nextState, replace, cb) {
		//if (!store.getState().user.isAuthenticated) { replace('/'); }
		cb();
	}

	return (
		<Route path="/dashboard" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="testusers" component={ TestUsers } />
			<Route path="*" component={ Error404 } />
	  </Route>
	)
};

export default getRoutes;