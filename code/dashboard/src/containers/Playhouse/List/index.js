import * as React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import moment from 'moment';

import {Loader} from '../../../components';

import { adminDatabase, adminAuth, userAuth } from '../../../helpers/api';

require('./style.css');

export class List extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoading: true,
          dolls: [],
      };

      this._loadDolls = () => adminDatabase.ref(`/internal/playhouse/dolls`).once('value').then(snap => snap.val()).then(dolls =>
        this.setState({dolls: Object.keys(dolls).map((key) => Object.assign(dolls[key], {
          key
        })), isLoading: false})
      );
    }

    componentWillMount(){
      this._loadDolls();
    }

    renderList() {
        return this.state.dolls.map(({data: {info: {name, first_name, last_name, gender, birthday}}, token, key}, i) => {

            return (
                <div className="doll grid" key={i}>
                    <div>
                        <span className="doll-title">{name} <small>{key}</small></span><br />
                        <span className="doll-company fs-small">{first_name}, {last_name}</span><br/>
                        <span className="doll-company fs-small">Gender: {gender ? gender : 'Undefined.'}</span><br />
                        <span className="doll-company fs-small">Birthday: {moment(birthday).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="f-right">
                        <a className="btn doll-action btn--link" target="_blank" href={`/dashboard/playhouse/play/${key}`}>Play</a>
                    </div>
                </div>
            );
        });
    }


    render() {
        return (
            <section className="wrapper">
                <h3>Playhouse</h3>
                <hr />
                { 
                    this.state.isLoading ? <Loader /> :
                    this.renderList()
                }
            </section>
        );
    }
}

export default List;
