import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {BlurView} from 'react-native-blur';
import {
  MKTextField,
} from 'react-native-material-kit';
import styles from './styles';
import {serverAction} from '../../../core/Api/actions';
import {getUserRef,updateUser} from '../../../modules/User/actions';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Card from '../../../components/Card';
import { sendEmailVerification, updateEmail } from 'rn-firebase-bridge/user';
import { reAuthenticate } from '../../../modules/Authentication/actions';

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class Verification extends Component {

  static propTypes = {
    onVerifyClick: React.PropTypes.any,
  };

  static defaultProps = {
    onVerifyClick: null,
  };

  constructor(props) {
    super(props);
  }

  state = {
    isChecking: true,
  };

  componentWillMount() {

    this.props.dispatch(reAuthenticate(() => {
      updateEmail(this.props.email).then(() => {
        sendEmailVerification().then(() => {
          console.log("oldu");
        }).catch((e) => {
          console.log("olmadı", e)
        })
      }).catch(e => {
        console.log(e, "firebase mail dnied");
      });
    }));

  }

  render() {
    return (<Card
        label="One last step!"
        text={`We've just sent a link to ${this.props.email}. You can click the link on any device to verify your university email.`}
        buttons={[]}
        noClose={this.state.isChecking}
        renderThis={() => this.state.isChecking ? <ActivityIndicator
          style={styles.container}
          size="large"
          color="#ffffff"
        /> : null}
      />
    );
  }
}

export default Verification;
