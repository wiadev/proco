import * as React from 'react';
import { browserHistory } from 'react-router';
import { adminAuth } from '../../../helpers/api';

export default class Login extends React.Component<void, void> {

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
    }
  }


	componentWillMount() {

    const {token = null, after = '/'} = this.props.location.query;
    if (token) adminAuth.signInWithCustomToken(token);

    const unsubs = adminAuth.onAuthStateChanged((user) => {
      if (user) {
        unsubs();
        browserHistory.push(after);
      }
    });

	}


	render() {
		return (
      <section className="wrapper ta-center">
        <h3>You need to be authenticated to access the Playhouse.</h3>
        {this.props.location.query.token && <h2>Logging you in...</h2>}
        {!this.props.location.query.token && <h2>Waiting for authentication...</h2>}
        {!this.props.location.query.token && <p>{`You'll be automatically redirected even if you login from another page.`}</p>}
        <p>{`If you've been waiting for a while, try again using Parrot.`}</p>
    	</section>

		);
	}
}
