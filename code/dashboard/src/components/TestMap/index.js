import React, { Component } from 'react';
import fbRequest from './fbRequest';

class TestMap extends Component {
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

export default TestMap;
