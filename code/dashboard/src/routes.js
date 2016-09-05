/** App Routes */

import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { adminApp, userApp, loginWithToken } from './helpers/api';

import { 
	App, Home,
  Error404,
	MapContainer,
	TestUsersList,
	TestUserDetails,
	Login,
} from './containers';

function getRoutes (store) {

	function requirePlayhouseAccess (nextState, replace, cb) {
		if (!adminApp.auth().currentUser) {
			replace('/playhouse/login?type=admin&after=' + nextState.location.pathname);
		}
		cb();
	}

	return (
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="playhouse/login" onEnter={loginWithToken}  />
			<Route path="playhouse" onEnter={requirePlayhouseAccess}>
				<Route path="login" component={ Login } />
				<Route path="map" component={ MapContainer } />
				<Route path="dolls" component={ TestUsersList } />
				<Route path="dolls/:uid" component={ TestUserDetails } />
			</Route>
			<Route path="*" component={ Error404 } />
	  </Route>
	)
};

export default getRoutes;
