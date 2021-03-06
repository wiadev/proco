import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import codePush from 'react-native-code-push';
import _ from 'lodash';

import Text from '../../components/Text';
import {database} from "../../core/Api";
import {assign} from "../../core/utils";
import {getUserRefForTypeAsString} from "../../modules/User/actions";
import {logout} from "../../modules/Authentication/actions";
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Field from '../../components/Field';
import styles from './styles';

@connect(state => ({auth: state.auth, user: state.api.data.userInfo, settings: state.api.data.userSettings}))
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.ref = database.ref(getUserRefForTypeAsString('settings', this.props.auth.uid));

    this.state = {
      settings: null,
      version: null
    };
  }

  componentWillMount() {
    this.setState({settings: assign(_.omit(this.props.settings, 'isLoaded'))});

    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
      .then(currentVersionData => {
        this.setState({
          version: `${currentVersionData.appVersion} (${currentVersionData.label})`
        });
      });
  }

  render() {
    // TODO: Clicking on Contact should do something.
    if (this.state.settings === null) {
      return (
        <Loading />
      );
    }

    return (
      <View style={styles.settings}>
        <StatusBar hidden={false} />
        <Header theme="light" title="Settings" rightActorType="text" rightActor="Done" rightAction={() => this._done()} />

        <ScrollView>
          <View style={styles.infoBox}>
            <Icon name="ios-information-circle-outline" style={styles.infoBoxIcon} />

            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                We synchronize your name, gender and birthday from your Facebook profile.
                If you've changed it there, you should see it appear here shortly.
              </Text>
            </View>
          </View>

          <Field type="text" legend="Birthday" value={this.props.user.birthday_display} style={styles.singleField} />

          <Field type="text" legend="University" value={this.props.user.network} style={styles.singleField} />

          <Field type="bool" legend="Suspend Discovery" value={this.state.settings.suspend_discovery} onChange={value => this._updateSetting('suspend_discovery', value)} style={styles.singleField} />

          <View style={styles.infoBox}>
            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                When you suspend discovery, you'll no longer receive answers
                or will be able to answer questions. You'll still be able to
                chat with current matches.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>

          <Field type="bool" legend="New messages" value={this.state.settings.notify_new_messages} onChange={value => this._updateSetting('notify_new_messages', value)} />

          <Field type="bool" legend="Announcements & Updates" value={this.state.settings.notify_announcements} onChange={value => this._updateSetting('notify_announcements', value)} stickToPrevious={true} />

          <Text style={styles.sectionTitle}>PROCO</Text>

          <Field type="link" legend="Contact" onPress={() => true} />

          <Text style={styles.sectionTitle}>LEGAL</Text>

          <Field type="link" legend="Privacy Policy" onPress={Actions.PRIVACY_POLICY} />

          <Field type="link" legend="Terms of Usage" onPress={Actions.TERMS_OF_USAGE} stickToPrevious={true} />

          <Field type="link" legend="Licenses" onPress={Actions.LICENSES} stickToPrevious={true} />


          <Field type="link" legend="Logout" onPress={() => this.props.dispatch(logout())} stickToPrevious={true} />

          <View style={styles.infoBox}>
            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                No longer enjoying Proco? You can suspend discovery at the top of this page and no one will be able to
                see your questions but you'll be able to chat with your current matches.
              </Text>
            </View>
          </View>
          
          <View style={styles.procoLogoContainer}>
            <Image source={require('../../assets/images/logo-light.png')} style={styles.logo} />
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.version}>{this.state.version}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _updateSetting(name, value) {
    this.setState({
      settings: Object.assign({}, this.state.settings, {[name]: value})
    });
  }

  _done() {
    this.ref.set(this.state.settings);

    Actions.pop();
  }
}

export default Settings;
