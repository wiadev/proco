import {StyleSheet} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  infoBox: {
    flexDirection: 'row',
    padding: 10
  },
  infoBoxIcon: {
    marginRight: 10,
    color: colors.gray1,
    fontSize: 40
  },
  infoBoxContent: {
    flex: 1
  },
  infoBoxText: {
    color: colors.gray1,
    fontSize: 12
  },
  singleField: {
    marginVertical: 8
  },
  sectionTitle: {
    marginVertical: 10,
    paddingHorizontal: 16,
    fontSize: 12
  },
  procoLogoContainer: {
    height: 50,
    marginHorizontal: 80
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  versionContainer: {
    marginBottom: 6
  },
  version: {
    color: colors.gray1,
    fontSize: 10,
    textAlign: 'center'
  }
});

export default styles;
