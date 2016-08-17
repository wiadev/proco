
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
  Permissions.getPermissionStatus('photo')
    .then(response => {
      //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    });
};
