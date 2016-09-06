/** App Routes */

import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { adminAuth } from './helpers/api';

import { 
  App,
  Home,
  Error404,
  PHLogin, PHList, PHMapView, PHDollView,
} from './containers';

function getRoutes (store) {

	function requirePlayhouseAccess ({location: {pathname, search = null}}, replace, cb) {
		if (!adminAuth.currentUser) {
			replace('/dashboard/login/playhouse?after=' + pathname + search);
		}
		cb();
	}

	return (
		<Route path="/dashboard" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="login/playhouse" component={ PHLogin } />
			<Route path="playhouse" onEnter={requirePlayhouseAccess}>
				<IndexRoute component={ PHList } />
				<Route path="map" component={ PHMapView } />
				<Route path="play/:uid" component={ PHDollView } />
			</Route>
			<Route path="*" component={ Error404 } />
	  </Route>
	)
};

export default getRoutes;
