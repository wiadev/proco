import React, {
  PropTypes,
} from 'react';
import {
  View,
  Modal as RNModal,
  Dimensions,
} from 'react-native';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

import Header from '../../components/Header';

const propTypes = {
  navigationState: PropTypes.shape({
    children: PropTypes.array,
  }),
  onNavigate: PropTypes.func,
};

const Modal = (props) => <RNModal {...props}>{props.children}</RNModal>;

export default function Wrapper(props) {
  console.log("wraper", props);
  const children = props.navigationState.children;
  const state = children[0];
  return (
    <View style={{ flex: 1 }}>
      <DefaultRenderer
        navigationState={state}
        key={state.key}
        {...state}
        onNavigate={props.onNavigate}
      />
      {children.length > 1 && children.map((el, i) => {
        if (i > 0 && el.component) {
          const Component = el.component;
          const comp = <Component key={el.key} {...el} />;
          if (el.isModal) {
            return (
              <Modal {...el}>
                {el.hasHeader && <Header hideMid leftAction={Actions.pop} />}
                {comp}
              </Modal>
            );
          }
          return comp;
        }

        return null;
      })}
    </View>
  );
}

Wrapper.propTypes = propTypes;
