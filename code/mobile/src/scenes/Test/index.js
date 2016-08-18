import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
const icon = '../../assets/images/cameraPermission.png';
import NetworkVerification from '../../components/NetworkVerification';

class Test extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.preview}>
        <View style={styles.permissionArea} >
      <Text onPress={() => {
        Actions.CardModal({
          icon,
          title: 'You need to provide camera permission',
          text: 'Give permission',
          buttons: [{
            onPress: () => {

            },
            text: 'Test'
          }]
        });
      }}>TEst</Text>

          <Text onPress={() => {
            Actions.CardModal({
              title: 'We\'ll need to verify your school e-mail.',
              text: 'You can easily do that by either entering the code we\'ve just sent you by clicking the link in the e-mail you\'ve recieved.',
              renderThis: () => { return <NetworkVerification />; }
            });
          }}>Çıldırın</Text>


        </View>
      </View>
    );
  }
}

export default Test;
