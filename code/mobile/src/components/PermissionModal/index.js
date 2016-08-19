import React, {Component} from 'react';
import {NetInfo} from 'react-native';
import {connect} from 'react-redux';
import {requestPermission, openSettings} from '../../modules/Permissions/actions';
import {Card} from '../Card';
import { Actions } from 'react-native-router-flux';
import {
  LOCATION_PERMISSIONS_DETAILS_MORE, LOCATION_PERMISSIONS_DETAILS,
  NOTIFICATION_PERMISSIONS_DETAILS,
  CAMERA_PERMISSIONS_DETAILS_MORE, CAMERA_PERMISSIONS_DETAILS,
} from '../../core/StaticPages';

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

    if (status === null) return null;
    if (status === 'authorized') return null;
    //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

    let screenProps = {
      show: true,
      head: 'bla bla',
      text: type
    };

    if (this.state.isInProgres) {
      screenProps.renderThis = () => (<ActivityIndicator size="large" color="#ffffff"/>);
    } else {
      if (status === 'denied') {
        screenProps.buttons = [
          {
            text: "Open Settings",
            onPress: () => {
              this.props.dispatch(openSettings());
            }
          },
          {
            text: "Learn more",
            onPress: () => {
              Actions.WebViewModal(LOCATION_PERMISSIONS_DETAILS_MORE)
            }
          }
        ];
      } else {
        screenProps.buttons = [
          {
            text: "Ok, go ahead",
            onPress: () => {
              this.setState({isInProgress: true});
              this.props.dispatch(requestPermission(type));
            }
          },
          {
            text: "Learn more",
            onPress: () => {
              Actions.WebViewModal()

            }
          }
        ];
      }

    }

    return (<Card {...screenProps} />);
  }
};
