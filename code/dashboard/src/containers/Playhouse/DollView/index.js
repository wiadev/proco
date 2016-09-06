import * as React from 'react';
import geofire from 'geofire';
import {connect} from 'react-redux';
import { Link } from 'react-router'

import {Loader, MapView} from '../../../components';

import { adminDatabase, userAuth } from '../../../helpers/api';


export class DollView extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoading: true,
          drops: [],
          info: {},
          settings: {},
          summary: {}
      };

    }

    componentWillMount(){
      const { params: {uid} } = this.props;

      this.authRef = userAuth(uid).onAuthStateChanged((user) => {
        if (user) {
          this.authRef();



        } else {
          adminDatabase.ref(`internal/playhouse/dolls/${uid}/token`)
            .once('value')
            .then(snap => snap.val())
            .then(token => userAuth(uid).signInWithCustomToken(token));
        }
      });
      console.log(this.props);
/*
      adminDatabase.ref(`/internal/playhouse/dolls/${}`).child('id').once('value').then(snap => snap.val()).then(users =>
        this.setState({users: Object.keys(users).map((k) => users[k]), isLoading: false})
      );
*/

    }

    componentWillUnmount() {
      if(this.authRef) this.authRef();
    }


    render() {
        return (
            <section className="wrapper">
                <h3>Doll Details</h3>

                <MapView />
               
            </section>
        );
    }
}

export default DollView;
