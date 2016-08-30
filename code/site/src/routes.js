import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Verifications, Error404 } from './containers';
import TestUsers from './components/TestUsers';

function getRoutes (store) {

	function requireLogin (nextState, replace, cb) {
		//if (!store.getState().user.isAuthenticated) { replace('/'); }
		cb();
	}

	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="a">
				<Route path="verifications" component={ Verifications } />
			</Route>
			<Route path="*" component={ Error404 } />
	  </Route>
	)
}

export default getRoutes;