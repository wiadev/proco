import {database} from '../../core/Api';
import { CONVERSATION_LIST_STARTED_LOADING, CONVERSATION_LIST_UPDATED } from './actionTypes';

export const getConversationListRef = (uid) => database().ref().child(`conversations/${uid}}`);

export function updateConversationsLocally(data) {
  return {
    type: CONVERSATION_LIST_UPDATED,
    payload: {
      ...data
    }
  };
}

export function loadConversationList() {
  return (dispatch, getState) => {
    const {auth,chat} = getState();
    if (!auth.uid) return;

    dispatch({
      type: CONVERSATION_LIST_STARTED_LOADING
    });

    const unsubs = getConversationListRef(auth.uid).on('value',
      async (snapshot) => {
        const data = await snapshot.val();
        if (data) {
          dispatch(updateConversationsLocally(data));
        }
      });

    console.log(unsubs)
  };
}
