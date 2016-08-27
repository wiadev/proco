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
    friends: []
  }

  componentDidMount() {
    fbRequest.get(this.props.id, {
      params: {
        fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name', 'email'].join(',')
      }
    }).then(data =>this.setState(Object.assign(data.data, {
      friends: [],
    })));

    fbRequest.get(`${this.props.id}/friends`).then(data => {
      this.setState({friends: data.data.data})
    });

  }
  
  render() {
    const { id, name, email, birthday, gender, age_range, first_name, last_name } = this.state;

    const renderList = () => {
      return this.state.friends.map((user, key) => {
        return <span key={key}>{user.name}, </span>;
      });
    }

    return (
      <div>
        <h1>{name} ({id})</h1>
        <p>{birthday}, {gender}, {email}</p>
        {this.state.friends && renderList()}
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
