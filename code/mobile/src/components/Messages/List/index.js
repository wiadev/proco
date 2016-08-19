import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState } from './redux';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageCountIcon from '../MessageCountIcon';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import styles from './styles';

class MessagesListScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = store.getState().messagesListScreenReducer.toJS();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state.dataSource = ds.cloneWithRows(this.state.messageList);
  }

  state = {};

  componentWillMount() {
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onItemPress() {
    Actions.talkScreen();
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={::this.onItemPress}>
        <View style={this.styles.rowItem} onPress={::this.onItemPress}>
          <View style={[this.styles.rowItemLeft, {
            width: width * 20 / 100,
          }]}>
            <View style={this.styles.rowItemImage}>
              <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
            </View>
          </View>
          <View style={[this.styles.rowItemLeft, {
            width: width * 65 / 100,
          }]}>
            <Text style={this.styles.rowItemUsername}>{rowData.userName}</Text>
          </View>
          <View style={this.styles.rowItemRight}>
            <MessageCountIcon
              messageCount={rowData.messageCount}
              messageDot={{borderColor: 'white'}}
              textColor={rowData.messageCount ? 'rgb(249,54,95)' : 'rgb(209,213,217)'}
              textStyles={rowData.messageCount ? {color: 'white', fontSize: 12, left: -31} : {color: 'transparent'}}
              showEmpty={false}
              size={25}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={this.styles.preview}>
        <View style={this.styles.topMenu}>
          <View style={this.styles.topMenuLeft}>
            <Icon
              name="angle-left"
              size={42}
              color="rgba(0, 0, 0, 0.3)"
              onPress={() => {
                Actions.pop();
              }}
            />
          </View>
          <View style={this.styles.topMenuMid}>
            <Text style={this.styles.menuTitle}>Messages</Text>
          </View>
          <View style={this.styles.topMenuRight}>
            <Text style={this.styles.btnSave} />
          </View>
        </View>
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={::this.renderRow}
            style={this.styles.listView}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(MessagesListScreen);
