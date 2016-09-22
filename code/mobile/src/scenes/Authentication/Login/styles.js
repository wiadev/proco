import {StyleSheet} from 'react-native';

import colors from '../../../core/style/colors';

const facebookBlue = '#3B5998';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column'
  },
  logoRow: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20
  },
  logoSideCushion: {
    flex: 1
  },
  logo: {
    flex: 5,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  swiperRow: {
    flex: 3,
    justifyContent: 'center'
  },
  swiperPagination: {
    // This one is merged with the default styling of the Swiper's pagination.
    bottom: 10
  },
  swiperPaginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primaryAlt,
  },
  swiperPaginationActiveDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 7,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryAlt,
  },
  swiperPaginationActiveDotInner: {
    backgroundColor: colors.primaryAlt,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  swiperSlide: {
    flex: 1,
    paddingBottom: 50
  },
  swiperSlideImageContainer: {
    flex: 1
  },
  swiperSlideImageSideCushion: {
    flex: 1
  },
  swiperSlideImage: {
    flex: 16,
    marginVertical: 20,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  swiperSlideText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.primary3,
    textAlign: 'center'
  },
  loginButtonRow: {
    flex: 2,
    justifyContent: 'center'
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 40,
    backgroundColor: colors.primaryAlt
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginButtonIcon: {
    marginRight: 14,
    color: facebookBlue,
    fontSize: 26,
    borderRadius: 8,
    overflow: 'hidden'
  },
  loginButtonText: {
    flex: 1,
    color: facebookBlue,
    fontSize: 14,
    fontWeight: 'bold'
  },
  privacyPolicyNotice: {
    marginHorizontal: 30,
    marginBottom: 20,
    color: colors.primaryAlt,
    fontSize: 12,
    textAlign: 'center'
  }
});

export default styles;
