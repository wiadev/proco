/** App Routes */

import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { adminApp, userApp, loginAsTestUser, loginAsAdmin } from './helpers/api';

import { 
	App, Home,
  Error404,
	MapContainer,
	TestUsersList,
	TestUserDetails,
	Login,
} from './containers';

function getRoutes (store) {

	function requireAdmin (nextState, replace, cb) {
		if (!adminApp.auth().currentUser) {
			replace('/login?type=admin&after=' + nextState.location.pathname);
		}
		cb();
	}

	function requireAppUser (nextState, replace, cb) {
		const {location: { pathname }, params: {uid}} = nextState;
		const currentUser = userApp(uid).auth().currentUser;
		replace('/login?type=user&uid=' + uid + '&after=' + pathname);
		cb();
	}


	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="login/user" onEnter={loginAsTestUser} />
			<Route path="login/admin" onEnter={loginAsAdmin} />
			<Route path="login" component={ Login } />
			<Route path="map" onEnter={requireAdmin} component={ MapContainer } />
			<Route path="test-users" onEnter={requireAdmin} component={ TestUsersList } />
			<Route path="test-users/:uid" onEnter={requireAppUser} component={ TestUserDetails } />
			<Route path="*" component={ Error404 } />
	  </Route>
	)
};

export default getRoutes;
