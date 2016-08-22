import React, { Component } from 'react';
import fbRequest from './fbRequest';

class UserProfile extends Component {
  state = {
    id: null,
    name: null,
    birthday: null,
    gender: null,
    age_range: null,
    first_name: null,
    last_name: null,
  }

  componentDidMount() {
    fbRequest.get(this.props.id, {
      params: {
        fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(',')
      }
    }).then(data =>this.setState(data.data));
  }
  
  render() {
    const { id, name, birthday, gender, age_range, first_name, last_name } = this.state;

    return (
      <div>
        <h1>{last_name}, {first_name} ({id})</h1>
        <p>{birthday}, {gender}</p>
        <hr />
      </div>
    );
  }
}


class TestUsers extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    fbRequest.get('1169837529717559/accounts/test-users').then(data => {
      this.setState({ 
          users: this.state.users.concat(data.data.data)
      });
    });
  }
  
  render() {

    const renderList = () => {
      return this.state.users.map((user, key) => {
        console.log(user);
        return <li key={key}><UserProfile id={user.id} /></li>;
      });
    }

    return (
      <div className="App">
        <h1>Test Users</h1>
        <ul>
          {renderList()}
        </ul>
      </div>
    );
  }
}

export default TestUsers;
