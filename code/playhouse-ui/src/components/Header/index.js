import * as React from "react";
import {Link} from "react-router";
require('./style.css');

import logo from '../../assets/images/logo.png';

export default class Header extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  renderUserPartial() {
    const {currentUser, logout} = this.props;
    if (currentUser) {
      const { displayName, uid } = currentUser;
      return (
        <span className="userinfo">
          Current (LoggedIn) User:
          {displayName} (<a href="#" onClick={logout}>Logout</a>)
          <br />
          <Link to={`/test-useres/${uid}`}>
             Go to User Details
          </Link>
        </span>
      );
    }

    return null;
  }

  render() {
    return (
      <header>
        <div className="grid wrapper">
          <div>
            <img src={logo} alt="Proco" id="logo" />
          </div>
          <div className="ta-right">
          {this.renderUserPartial()}
            <span className="menu">
                  <Link to={`/test-users`}>
                     Test Users
                  </Link> -&nbsp;
                <Link to={`/map`}>
                     Map
                  </Link>
            </span>
          </div>


        </div>

      </header>
    );
  }
}
