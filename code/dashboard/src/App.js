import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import TestUsers from './components/TestUsers';
import TestMap from './components/TestMap';

function App() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="testusers" component={TestUsers}/>
        <Route path="testmap" component={TestMap}/>
        {/*<Route path="*" component={NoMatch}/>*/}
      </Route>
    </Router>
  );
}

export default App;
