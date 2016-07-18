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
import { loadPage, defaultState } from './messagesListScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageCountIcon from './../messageCountIcon/messageCountIcon';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
    backgroundColor: '#dadada',
  },
  topMenu: {
    paddingTop: 20,
    height: 65,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 0.5,
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
  topMenuLeft: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  topMenuRight: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  btnSave: {
    color: 'rgb(71,71,71)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  topMenuMid: {
    flex: 0,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
  menuTitle: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  rowItem: {
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgb(222,222,222)',
    borderBottomWidth: 1,
  },
  rowItemLeft: {
    flex: 0,
    width: width * 35 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  rowItemRight: {
    flex: 0,
    width: width * 15 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  rowItemImage: {
    height: 56,
    width: 56,
    margin: 0,
    borderRadius: 28,
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 56,
    height: 56,
    margin: 0,
  },
  listView: {
    flex: 0,
    width,
    flexDirection: 'row',
  },
  rowItemUsername: {
    fontSize: 18,
    color: 'rgb(22,20,23)',
    fontFamily: 'Montserrat-Regular',
  },
  rowItemUserTitle: {
    fontSize: 12,
    color: 'rgb(139,139,139)',
    fontFamily: 'Montserrat-Light',
  },
});

class messagesListScreenComp extends Component {
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
    StatusBar.setHidden(true);
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
              <Image style={this.styles.avatarImage} source={require('./../../images/exampleAvatar.jpg')} />
            </View>
          </View>
          <View style={[this.styles.rowItemLeft, {
            width: width * 65 / 100,
          }]}>
            <Text style={this.styles.rowItemUsername}>{rowData.userName + ', ' + rowData.userAge}</Text>
            <Text style={this.styles.rowItemUserTitle}>{rowData.userTitle}</Text>
          </View>
          <View style={this.styles.rowItemRight}>
            <MessageCountIcon
              messageCount={rowData.messageCount}
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
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={false}
        />
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

export default connect(() => defaultState.toJS())(messagesListScreenComp);
