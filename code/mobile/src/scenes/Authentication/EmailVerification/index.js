import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import {logout,updateNetworkEmail} from '../../../modules/Authentication/actions';

import Card from '../../../components/Card';

@connect(
  state => ({
    user: state.user,
  }),
)
class Verification extends React.Component {

  state = {
    isChecking: true,
  };

  render() {
    return (<Card
        label="One last step!"
        text={`We've just sent a link to ${this.props.user.email}. You can click the link on any device to verify your university email.`}
        buttons={[
          {
            text: "Resend",
            onPress: () => this.props.dispatch(updateNetworkEmail(this.props.user.email))
          },
          {
            text: "Logout",
            onPress: () => this.props.dispatch(logout())
          },
        ]}
        noClose={this.state.isChecking}
        renderThis={() => this.state.isChecking ? <ActivityIndicator
          style={{marginTop: 5}}
          size="large"
          color="#ffffff"
        /> : null}
      />
    );
  }
}

export default Verification;
