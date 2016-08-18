const icon = '../../assets/images/cameraPermission.png';

export const ASK_CARD = {
  icon,
  title: 'You need to provide camera permission',
  text: 'Give permission',
  actions: [{
    onPress: () => {

    },
    text: 'Test'
  }]
};

export const BLOCKED_CARD = {
  icon,
  title: '',
  text: '',
  actions: []
};


export const requestPermission = () => {
  return (dispatch, getState) => {
    const {permissions} = getState();
    const cameraPermission = permissions.get('camera');

    if (cameraPermission === 'authorized') return;
    if (cameraPermission === 'denied' || cameraPermission === 'restricted') {
      Actions.Card(Object.assign(BLOCKED_CARD, {
        actions: [
          {
            text: 'Open Settings',
            onPress: () => {
              Permissions.openSettings();
            }
          },
          {
            text: 'More info & help',
            onPress: () => {

            }
          },
          {
            text: 'Cancel',
            type: 'cancel'
          }
        ]
      }));
      return;
    }

    Actions.Card(Object.assign(ASK_CARD, {
      actions: [
        {
          text: 'Give permission',
          onPress: () => {
            Permissions.requestPermission('camera')
              .then(response => {
                dispatch(syncPermissions());
              });
          }
        },
        {
          text: 'No',
          onPress: () => {

          }
        }
      ]
    }));

  }
};

