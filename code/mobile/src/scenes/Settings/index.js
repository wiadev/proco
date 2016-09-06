import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';

import {database} from "../../core/Api";
import {getUserRefForTypeAsString} from "../../modules/User/actions";
import BlockerActivity from '../../components/BlockerActivity';
import Header from '../../components/Header';
import Field from '../../components/Field';
import styles from './styles';

@connect(state => ({auth: state.auth, user: state.user}))
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.ref = database.ref(getUserRefForTypeAsString('settings', this.props.auth.uid));

    this.state = {
      settings: null
    };
  }

  componentWillMount() {
    this.ref.once('value').then(settings => this.setState({settings: settings.val()}));
  }

  render() {
    console.log(this.state);
    if (this.state.settings === null) {
      return (
        <BlockerActivity />
      );
    }

    return (
      <View style={styles.settings}>
        <ScrollView>
          <Header theme="light" title="Settings" rightActorType="text" rightActor="Done" rightAction={() => this._done()} />

          <View style={styles.infoBox}>
            <Icon name="info-outline" style={styles.infoBoxIcon} />

            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                We synchronize your name, gender and birthday from your Facebook profile.
                If you've changed it there, you should see it appear here shortly.
              </Text>
            </View>
          </View>

          <Field type="text" legend="Birthday" value={this.props.user.birthday} style={styles.singleField} />

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

          <Field type="bool" legend="Announcements & Updates" value={this.state.settings.notify_announcements} onChange={value => this._updateSetting('notify_announcements', value)} />
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

    Actions.Main();
  }
}

export default Settings;
