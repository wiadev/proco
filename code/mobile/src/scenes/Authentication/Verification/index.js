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
    code: null,
    isChecking: false,
    error: false,
  };

  componentWillMount() {
    this.props.dispatch(serverAction({
      type: 'USER_VERIFICATION',
      payload: {
        type: this.props.verify,
        to: this.props.to,
      }
    }));
  }

  checkCode(code) {
    this.setState({isChecking: true, code});

    getUserRef(this.props.auth.uid, `verifications/${this.props.verify}/${code}`).once('value', snap => {
      const data = snap.val();
      if (!data) {
        this.setState({isChecking: false, code, error: true});
        return;
      }

      this.props.dispatch(updateUser('is', {
        verified: true
      }, () => {
        Actions.pop();
      }));



    });
  }

  renderVerification() {
    return (<View>
      <MKTextField
        autoCapitalize={'characters'}
        autoCorrect={false}
        autoFocus={true}
        keyboardType={'numeric'}
        tintColor={'transparent'}
        placeholder="XXXXXX"
        textInputStyle={styles.passwordTxt}
        style={styles.password}
        underlineEnabled={false}
        placeholderTextColor={'rgb(180, 180, 190)'}
        onTextChange={(code) => {
          if (code.length === 6) {
            this.checkCode(code);
          }
        }}
        maxLength={6}
        returnKeyTyp={'go'}
      />
      {this.state.error && <Text style={styles.error}>Code you've entered appears to be wrong.</Text>}
    </View>);
  }

  render() {
    const {to, verify} = this.props;
    let destination;
    if (verify === 'email') {
      destination = 'university email';
    } else if (verify === 'sms') {
      destination = 'mobile phone';
    }
    return (<Card
        label="One last step!"
        text={`We've just sent an 6-digit verification code to ${this.props.to} to verify your ${destination}`}
        buttons={[]}
        noClose={this.state.isChecking}
        renderThis={() => this.state.isChecking ? <ActivityIndicator
          style={styles.container}
          size="large"
          color="#ffffff"
        /> : ::this.renderVerification()}
      />
    );
  }
}

export default Verification;
