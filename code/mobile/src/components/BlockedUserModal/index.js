import React, {Component} from 'react';
import {NetInfo, Modal} from 'react-native';
import Card  from '../Card';

export default function BlockedUserModal(props) {

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={true}
    >
      <Card
        label={`Sorry ${props.name}, you are banned from Proco`}
        text={`If you believe this is a mistake, please contact us. ${(typeof props.blocked === 'string') && props.blocked}`}
        buttons={[
          {
            text: "Contact",
            onPress: props.contact
          },
          {
            text: "Logout",
            onPress: props.logout
          }
        ]}
        noClose
      />
    </Modal>
  );
}
