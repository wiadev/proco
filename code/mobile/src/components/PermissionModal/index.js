import React, {Component} from 'react';
import {NetInfo} from 'react-native';
import {connect} from 'react-redux';
import {requestPermission, openSettings} from '../../modules/Permissions/actions';
import Card from '../Card';
import { Actions } from 'react-native-router-flux';

const Permissions = require('react-native-permissions');

const texts = {
  'camera': {
    label: `We need access your camera.`,
    text: `We use your camera when you are shooting loops.`,
    action: () => Actions.CAMERA_PERMISSIONS_DETAILS(),
    actionOnDenied: () => Actions.CAMERA_PERMISSIONS_DETAILS_DENIED(),
  },
  'location': {
    label: 'Where are you?',
    text: `Since Proco only works in campuses, we need to access your location to verify where you are.`,
    noClose: true,
    action: () => Actions.LOCATION_PERMISSIONS_DETAILS(),
    actionOnDenied: () => Actions.LOCATION_PERMISSIONS_DETAILS_DENIED(),
  },
  'notifications': {
    label: 'Do you want to know when you have new matches and messages from your matches?',
    text: 'You can turn off notifications you don\'t want easily in the Settings menu.',
    action: () => Actions.NOTIFICATIONS_PERMISSIONS_DETAILS(),
    actionOnDenied: () => Actions.NOTIFICATIONS_PERMISSIONS_DETAILS_DENIED(),
  }
};

@connect(
  state => ({
    permissions: state.permissions,
  }),
)
export default class PermissionModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isInProgres: false,
  };

  componentWillReceiveProps() {
    this.setState({isInProgress: false});
  }

  render() {
    const type = this.props.type;
    const status = this.props.permissions[type];
    const text = texts[type];

    if (status === null) return null;
    if (status === 'authorized') return null;
    //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

    let screenProps = Object.assign({
      show: true,
    }, text);

    if (this.state.isInProgres) {
      screenProps.renderThis = () => (<ActivityIndicator size="large" color="#ffffff"/>);
    } else {

      if (status === 'denied') {
        screenProps.buttons = [
          {
            text: "Open Settings",
            onPress: () => Permissions.openSettings()
          },
          {
            text: "Learn more",
            onPress: () => text.actionOnDenied(),
          }
        ];
      } else {
        screenProps.buttons = [
          {
            text: "Allow access",
            onPress: () => {
              this.setState({isInProgress: true});
              this.props.dispatch(requestPermission(type));
            }
          },
          {
            text: "Learn more",
            onPress: () => text.action(),
          }
        ];
      }

    }

    return (<Card {...screenProps} />);
  }
};
