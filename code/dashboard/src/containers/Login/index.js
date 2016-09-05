import * as React from 'react';
import { Link, browserHistory } from 'react-router';
import { userApp, adminApp } from '../../helpers/api';

export default class Login extends React.Component<void, void> {

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
    }
  }

	componentWillMount() {
    const {type, after = '/', uid} = this.props.location.query;
    if (type) {
      let app;

      if (type === 'admin') {
        app = adminApp;
      } else if (type === 'user') {
        app = userApp(uid);
      }

      const unsubs = app.auth().onAuthStateChanged((user) => {
        if (user) {
          unsubs();
          if (type === 'admin' || (uid === user.uid)) {
              browserHistory.push(after);
          }

        } else {
          // No user is signed in.
        }
      });
    }

	}


	render() {
		return (
      <section className="wrapper ta-center">
        <h3>You need to be authenticated.</h3>
        {this.props.location.query.type && <h2>Waiting for authentication...</h2>}
        {this.props.location.query.type && <p>{`You'll be automatically redirected.`}</p>}
        {(this.props.location.query.type && this.props.location.query.type === 'admin')
        && <small><strong>Important:</strong> To see the list and the general map, you need to have the Playhouse permissions.</small>}
        <p>{`If you've been waiting for a while, try using Parrot to login.`}</p>
    	</section>

		);
	}
}
