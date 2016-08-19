import React, {Component} from 'react';
import {NetInfo} from 'react-native';
import {connect} from 'react-redux';
import {requestPermission, openSettings} from '../../modules/Permissions/actions';
import {CardModal} from '../Card';
import { Actions } from 'react-native-router-flux';

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

    let modalProps = {
      show: true,
      head: 'bla bla',
      text: type
    };

    if (this.state.isInProgres) {
      modalProps.renderThis = () => (<ActivityIndicator size="large" color="#ffffff"/>);
    } else {
      if (status === 'denied') {
        modalProps.buttons = [
          {
            text: "Open Settings",
            onPress: () => {
              this.props.dispatch(openSettings());
            }
          },
          {
            text: "Learn more",
            onPress: () => {
              Actions.WebViewModal()
            }
          }
        ];
      } else {
        modalProps.buttons = [
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

    return (<CardModal {...modalProps} />);
  }
};
