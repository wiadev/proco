import { Map } from 'immutable';

const initialState = Map({
  camera: null,
  notifications: null,
  location: null,
  backgroundRefresh: null,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'PERMISSION_STATUS_CHANGED':
      return state.set('camera', action.payload.camera)
        .set('notifications', action.payload.notifications)
        .set('location', action.payload.location)
        .set('backgroundRefresh', action.payload.backgroundRefresh);
  }
}
