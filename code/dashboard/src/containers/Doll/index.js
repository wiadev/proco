import * as React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'

import {Loader} from '../../components';

import { adminDatabase, adminAuth, userAuth } from '../../helpers/api';


export class Doll extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoading: true,
          users: [],
      };

      this._loadDoll = () => adminDatabase.ref(`/internal/playhouse/dolls/`).child(id').once('value').then(snap => snap.val()).then(users =>
        this.setState({users: Object.keys(users).map((k) => users[k]), isLoading: false})
      );
    }

    componentWillMount(){
      this._loadDoll();
    }

    renderList() {
        return this.state.users.map((user, i) => {
            return (
                <div className="doll grid" key={i}>
                    <div>
                        <span className="doll-title">{user.name}</span><br />
                        <span className="doll-company fs-small">{user.first_name}, {user.last_name}</span><br/>
                        <span className="doll-company fs-small">Gender: {user.gender ? user.gender : 'Undefined.'}</span>
                    </div>
                    <div className="f-right">
                        {(user.uid && userAuth(user.uid).currentUser.providerData[0].uid == user.id) ?
                          <Link to={`/test-users/${userAuth(user.id).currentUser.uid}`} className="btn doll-action" href="#">User Details</Link> :
                          <Link to={`/login/user?access_token=${user.access_token}&after=details`} className="btn doll-action btn--link" href="#">Login as User</Link>}
                    </div>
                </div>
            );
        });
    }


    render() {
        return (
            <section className="wrapper">
                <h3>Test User Details</h3>
                <hr />
                { 
                    this.state.isLoading ? <Loader /> :
                    this.renderList()
                }
            </section>
        );
    }
}

export default Doll;