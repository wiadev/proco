import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Image, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import codePush from "react-native-code-push";
import _ from "lodash";
import Text from "../../components/Text";
import { assign } from "../../core/utils";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import Field from "../../components/Field";
import styles from "./styles";
import {userSaveSetting} from "../../modules/user/actions";

const genderChoices = [
  {
    label: "Female",
    value: 'female'
  },
  {
    label: "Male",
    value: 'male'
  },
  {
    label: "Both",
    value: 'both'
  }
];
@connect(
  state => ({
    auth: state.auth,
    user: state.user.info,
    settings: state.user.settings,
  }),
  dispatch => ({
    save: (key, value) => dispatch(userSaveSetting(key, value)),
  }),
)
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: null
    };
  }

  componentWillMount() {
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
      .then(currentVersionData => {
        this.setState({
          version: `${currentVersionData.appVersion} (${currentVersionData.label})`
        });
      });
  }

  render() {

    return (
      <View style={styles.settings}>
        <StatusBar hidden={false}/>
        <Header theme="light" title="Settings" rightActorType="text" rightActor="Done"
                rightAction={() => this._done()}/>

        <ScrollView>
          <View style={styles.group}>
            <Text style={styles.sectionTitle}>Show me</Text>

            {genderChoices.map((choice, key) => {
              return (
                <Field
                  key={key}
                  type="choice"
                  legend={choice.label}
                  value={this.props.settings.get('gender') === choice.value}
                  onPress={() => this.props.save('gender', choice.value)}
                  stickToPrevious={key !== 0}
                />
              );
            })}
          </View>

          <View style={styles.group}>
            <Field
              type="range"
              legend="Age limits"
              value={[this.props.settings.get('age_min'), this.props.settings.get('age_max')]}
              minValue={18}
              maxValue={45}
              onChange={newValue => this._updateAgeLimits(newValue)}
            />
          </View>

          <View style={styles.group}>
            <Field type="bool" legend="People only from my university" value={this.props.settings.get('only_from_network')}
                   onChange={newValue => this.props.save('only_from_network', newValue)}/>
          </View>
          <View style={styles.infoBox}>
            <Icon name="ios-information-circle-outline" style={styles.infoBoxIcon}/>

            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                We synchronize your name, gender and birthday from your Facebook profile.
                If you've changed it there, you should see it appear here shortly.
              </Text>
            </View>
          </View>

          <Field type="text" legend="Birthday" value={this.props.user.get('birthday')} style={styles.singleField}/>

          <Field type="text" legend="University" value={this.props.user.get('network')} style={styles.singleField}/>

          <Field type="bool" legend="Suspend Discovery" value={this.props.settings.get('suspend_discovery')}
                 onChange={value => this.props.save('suspend_discovery', value)} style={styles.singleField}/>

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

          <Field type="bool" legend="New messages" value={this.props.settings.get('notify_new_messages')}
                 onChange={value => this.props.save('notify_new_messages', value)}/>

          <Field type="bool" legend="Announcements & Updates" value={this.props.settings.get('notify_announcements')}
                 onChange={value => this.props.save('notify_announcements', value)} stickToPrevious={true}/>

          <Text style={styles.sectionTitle}>PROCO</Text>

          <Field type="link" legend="Contact" onPress={() => true}/>

          <Text style={styles.sectionTitle}>LEGAL</Text>

          <Field type="link" legend="Privacy Policy" onPress={Actions.PRIVACY_POLICY}/>

          <Field type="link" legend="Terms of Usage" onPress={Actions.TERMS_OF_USAGE} stickToPrevious={true}/>

          <Field type="link" legend="Licenses" onPress={Actions.LICENSES} stickToPrevious={true}/>


          <Field type="link" legend="Logout" onPress={() => this.props.dispatch(logout())} stickToPrevious={true}/>

          <View style={styles.infoBox}>
            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxText}>
                No longer enjoying Proco? You can suspend discovery at the top of this page and no one will be able to
                see your questions but you'll be able to chat with your current matches.
              </Text>
            </View>
          </View>

          <View style={styles.procoLogoContainer}>
            <Image source={require('../../assets/images/logo-light.png')} style={styles.logo}/>
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.version}>{this.state.version}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _updateAgeLimits(value) {
    this.props.save('age_min', value[0]);
    this.props.save('age_max', value[1]);
  }

  _done() {
    Actions.pop();
  }
}

export default Settings;
