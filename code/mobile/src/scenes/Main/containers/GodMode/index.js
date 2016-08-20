import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
const icon = '../../../../assets/images/cameraPermission.png';
import Permissions from 'react-native-permissions';
import {
  CAMERA_PERMISSIONS_DETAILS,
  CAMERA_PERMISSIONS_DETAILS_MORE,
  LOCATION_PERMISSIONS_DETAILS,
  LOCATION_PERMISSIONS_DETAILS_MORE,
  NOTIFICATION_PERMISSIONS_DETAILS,
} from '../../../../core/StaticPages';
import Settings from '../../../Settings';
class GodMode extends Component {

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
          head: 'Sadly, your school hasnt been invited to Proco yet',
          text: 'If you want, we can send an SMS when we are at your school',
          buttons: [{
            onPress: () => {

            },
            text: 'Leave number'
          },
            {
              text: 'contact Proco',
              onPress: () => {

              }
            }]
        });
      }}>school not in</Text>

          <Text onPress={() => {
            Actions.ProcoModal({
              component: <Settings />
            });
          }}>Çıldırın</Text>


          <Text onPress={() => {
            Actions.CardModal({
              title: 'Proco needs to know about where you are.',
              text: 'Since Proco only works at your campus, we\'ll need to verify your location. Since you\'ve denied permission, you\'ll need to Open Settings and give us permission.',
              buttons: [
                {
                  text: "Open Settings",
                  onPress: Permissions.openSettings,
                },
                {
                  text: "Learn more",
                  onPress: () => {
                    Actions.WebViewModal(LOCATION_PERMISSIONS_DETAILS_MORE)
                  },
                }
              ]
            });
          }}>No Location Error</Text>

          <Text onPress={() => {
            Actions.CardModal({
              title: 'Proco needs to access your camera for loops.',
              text: 'One of core parts of Proco is the profile loops. We need access to your camera so you can shoot them. Since you\'ve denied permission before, you\'ll need to Open Settings and give us permission.',
              buttons: [
                {
                  text: "Open Settings",
                  onPress: Permissions.openSettings,
                },
                {
                  text: "Learn more",
                  onPress: () => {
                    Actions.WebViewModal(CAMERA_PERMISSIONS_DETAILS_MORE)
                  },
                }
              ]
            });
          }}>No Camera Error</Text>


          <Text onPress={() => {
            Actions.CardModal({
              title: 'We\'ll need to verify your school e-mail.',
              text: 'You can easily do that by either entering the code we\'ve just sent you by clicking the link in the e-mail you\'ve recieved.',
              renderThis: () => { return <NetworkVerification />; }
            });
          }}>Camera Permission Request</Text>

        </View>
      </View>
    );
  }
}

export default GodMode;
