import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';

import Text from '../../../components/Text';
import Button from '../../../components/Button';
import List from '../../../components/Chat/ConversationList';
import Modal from '../../../components/Modal';

import styles from './styles';

@connect(
  state => ({
    threads: state.chat.threads,
    profiles: state.profiles,
  })
)
export default class ConversationList extends React.Component {
  render() {
    // TODO: Modal in here is just for testing, should be deleted.
    return (
      <View style={styles.conversationList}>
        <StatusBar hidden={false} barStyle="dark-content"/>

        <List threads={this.props.threads} profiles={this.props.profiles} />

        <Modal ref="modal" isOpen={true} height={0.34}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text style={{marginBottom: 10, textAlign: 'center', fontWeight: '500'}}>Here goes your messages!</Text>

              <Text style={{textAlign: 'center'}}>Don't worry if you don't have any yet. Just keep browsing and soon you'll get some.</Text>
            </View>

            <Button type="text" text="Gotcha" highlight={true} onPress={() => this.refs.modal.close()} />
          </View>
        </Modal>
      </View>
    );
  }
}
