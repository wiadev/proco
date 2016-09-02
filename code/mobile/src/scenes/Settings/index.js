import React, {Component} from "react";
import {View, Text, Dimensions, ScrollView, Image, Alert, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import {MKSwitch, setTheme} from "react-native-material-kit";
import {round} from "lodash";
import {base} from "../../core/Api";
import {setStatusBarStyle} from "../../modules/StatusBar/actions";
import {getUserRefForTypeAsString} from "../../modules/User/actions";
import {logout} from "../../modules/Authentication/actions";
import appStyles from "../../core/style";
import {assign} from "../../core/utils";
import styles from "./styles";
import Header from "../../components/Header";

const width = Dimensions.get('window').width;

setTheme({
  radioStyle: {
    fillColor: 'rgb(249,54,95)',
    borderOnColor: 'rgb(215,215,215)',
    borderOffColor: 'rgb(215,215,215)',
  },
});

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(getUserRefForTypeAsString('settings', this.props.auth.uid), {
      context: this,
      state: 'settings',
    });
    this.props.dispatch(setStatusBarStyle('default'));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Header title="Settings" rightActorType="text" rightActor="Done" rightAction={() => this._onSave()}/>

        <ScrollView style={styles.container}>
          <View style={[{
            flexDirection: 'column',
            width,
            marginTop: 5,
            marginBottom: -5,
            padding: 10,
            flex: 0,
            alignItems: 'center',
          }]}>
            <View style={{
              flex: 0,
              width: width - 28,
              flexDirection: 'row',
            }}>
              <View style={[styles.inputBoxLeft, {
                alignItems: 'flex-start',
                width: (width - 28) * 15 / 100,
                flex: 0,
              }]}>
                <IconM name="info-outline" size={42} color="rgba(0, 0, 0, 0.3)"/>
              </View>
              <View style={[styles.inputBoxRight, {
                alignItems: 'flex-start',
                width: (width - 28) * 85 / 100,
                flex: 0,
                justifyContent: 'flex-start',
                flexDirection: 'column'
              }]}>
                <Text style={[styles.blackText, {fontSize: 12}]}>
                  We synchronize your name, gender and birthday from your Facebook profile.
                  If you've changed it there, you should see it appear here shortly.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={styles.pinkText}>Birthday</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <Text
                style={[styles.blackText]}
              >{this.props.user.birthday}</Text>
            </View>
          </View>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={styles.pinkText}>University</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <Text
                style={[styles.blackText]}
              >{this.props.user.network}</Text>
            </View>
          </View>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={[styles.blackText, {fontSize: 14}]}>Suspend Discovery</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <MKSwitch
                style={styles.mkSwitch2}
                onCheckedChange={(e) => this.setState({settings: assign(this.state.settings, {
                  suspendDiscovery: e.checked,
                })})}
                onColor={'#43da5e'}
                thumbOnColor={'white'}
                checked={this.state.settings.suspendDiscovery}
                trackSize={32}
              />
            </View>
          </View>
          <Text style={styles.underMessage}>
            When you suspend discovery, you'll no longer recieve answers
            or will be able to answer questions. You'll still be able to
            chat with current matches.
          </Text>
          <Text style={[styles.underMessage, {
            marginTop: 10,
            color: 'black',
            fontFamily: 'OpenSans',
          }]}>
            NOTIFICATIONS
          </Text>
          <View style={[styles.inputBox, {
            flexDirection: 'column',
            alignItems: 'flex-start',
          }]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[styles.inputBoxLeft, {
                width: (width - 28) * 75 / 100,
              }]}>
                <Text style={[styles.blackText, {fontSize: 14}]}>New messages from your matches</Text>
              </View>
              <View style={[styles.inputBoxRight, {
                width: (width - 28) * 25 / 100,
              }]}>
                <MKSwitch
                  style={styles.mkSwitch}
                  onCheckedChange={(e) => this.setState({settings: assign(this.state.settings, {
                    notifyNewMessagesFromMatches: e.checked,
                  })})}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.settings.notifyNewMessagesFromMatches}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[styles.blackText, {fontSize: 14}]}>New messages</Text>
              </View>
              <View style={[styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={styles.mkSwitch}
                  onCheckedChange={(e) => this.setState({settings: assign(this.state.settings, {
                    notifyNewMessages: e.checked,
                  })})}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.settings.notifyNewMessages}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[styles.blackText, {fontSize: 14}]}>New answers</Text>
              </View>
              <View style={[styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={styles.mkSwitch}
                  onCheckedChange={
                    (e) => {
                      Alert.alert(
                        'Are you sure?',
                        'You may get too many notifications on peak hours. You can always disable this again from this menu.',
                        [
                          {
                            text: 'Cancel', onPress: () => {

                          }
                          },
                          {
                            text: 'No problem!',
                            onPress: () => {

                              this.setState({settings: assign(this.state.settings, {
                                notifyNewAnswers: e.checked,
                              })});

                            }
                          },
                        ]
                      );
                    }
                  }
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.settings.notifyNewAnswers}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[styles.blackText, {fontSize: 14}]}>Announcements & Updates</Text>
              </View>
              <View style={[styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={styles.mkSwitch}
                  onCheckedChange={(e) => this.setState({settings: assign(this.state.settings, {
                    notifyAnnouncements: e.checked,
                  })})}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.settings.notifyAnnouncements}
                  trackSize={32}
                />
              </View>
            </View>
          </View>
          <Text style={[styles.underMessage, {
            marginTop: 10,
            color: 'black',
            fontFamily: 'OpenSans',
          }]}>
            PROCO
          </Text>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={[styles.blackText, {fontSize: 14}]}>Contact</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <View style={[styles.inputBox, {
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight: 10,
          }]}>
            <View style={{
              width: width - 20,
              marginBottom: 10,
            }}>
              <Text style={[styles.pinkText]}>People</Text>
            </View>
            <View style={{
              width: width - 20,
              marginBottom: 10,
            }}>
              <Text style={[styles.blackText, {fontSize: 14}]}>These are the people who've made Proco. Tap to anyone to
                see
                their loops and chat with them.</Text>
            </View>
            <ScrollView
              ref={(scrollView) => {
                _scrollView = scrollView;
              }}
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              scrollEventThrottle={200}
              style={styles.scrollView}
            >
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
              <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')}/>
              </View>
            </ScrollView>
          </View>
          <Text style={[styles.underMessage, {
            marginTop: 10,
            color: 'black',
            fontFamily: 'OpenSans',
          }]}>
            LEGAL
          </Text>
          <TouchableHighlight onPress={Actions.PrivacyPolicy}>
            <View style={[styles.inputBox, {
              borderBottomWidth: 0,
            }]}>
              <View style={styles.inputBoxLeft}>
                <Text style={[styles.blackText, {fontSize: 14}]}>Privacy Policy</Text>
              </View>
              <View style={styles.inputBoxRight}>
                <Icon
                  name="angle-right"
                  size={30}
                  color="#c2c2c2"
                />
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={Actions.TermsOfUsage}>
            <View style={[styles.inputBox, {
              marginTop: 0,
              borderBottomWidth: 0,
            }]}>
              <View style={styles.inputBoxLeft}>
                <Text style={[styles.blackText, {fontSize: 14}]}>Terms of Service</Text>
              </View>
              <View style={styles.inputBoxRight}>
                <Icon
                  name="angle-right"
                  size={30}
                  color="#c2c2c2"
                />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={Actions.Licenses}>
            <View style={[styles.inputBox, {
              marginTop: 0,
            }]}>
              <View style={styles.inputBoxLeft}>
                <Text style={[styles.blackText, {fontSize: 14}]}>Licenses</Text>
              </View>
              <View style={styles.inputBoxRight}>
                <Icon
                  name="angle-right"
                  size={30}
                  color="#c2c2c2"
                />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.appLogoBottom}>
            <Image source={require('../../assets/images/logo.png')}/>
          </View>
          <TouchableHighlight onPress={() => {
            this.props.dispatch(logout());
          }}>
            <View style={styles.inputBox}>
              <View style={styles.inputBoxLeft}>
                <Text style={[styles.blackText, {fontSize: 14}]}>Logout</Text>
              </View>
              <View style={styles.inputBoxRight}>
                <Icon
                  name="angle-right"
                  size={30}
                  color="#c2c2c2"
                />
              </View>
            </View>
          </TouchableHighlight>
          <Text style={styles.underMessage}>
            No longer enjoying Proco? You can suspend discovery at the top of this page and no one will be able to see
            your questions but you'll be able to chat with your current matches.
          </Text>
        </ScrollView>
      </View>
    );
  }

  _onSave() {
    Actions.pop();
  }
}

export default Settings;
