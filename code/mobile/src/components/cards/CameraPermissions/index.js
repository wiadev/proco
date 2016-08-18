const icon = '../../assets/images/cameraPermission.png';

export const CAMERA_PERMISSION_ASK = {
  icon,
  title: 'You need to provide camera permission',
  text: 'Give permission',
  actions: [{
    onPress: () => {

    },
    text: 'Test'
  }]
};

export const CAMERA_PERMISSION_BLOCKED = {
  icon,
  title: '',
  text: '',
  actions: []
};
