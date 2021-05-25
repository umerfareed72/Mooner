import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
export default StyleSheet.create({
  loginbodyContainer: {
    top: '-10%',
    paddingHorizontal: 30,
  },
  loginImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 2.5,
  },
  loginInputIcon: {
    backgroundColor: colors.halfWhite,
    borderRadius: 8,
    paddingLeft: 20,
    height: 45,
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    width: '100%',
  },

  text14mediumAuth: {
    fontSize: 14,
    color: colors.defaultBlack,
    fontFamily: 'Gilroy-Medium',
  },
  text10smallAuth: {
    fontSize: 10,
    color: colors.defaultBlack,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  text12smallAuth: {
    fontSize: 12,
    color: colors.red,
    fontFamily: 'Gilroy-Regular',
  },
  loginrightContainer: {
    alignItems: 'flex-end',
  },
  // loginrightAbsoluteContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  // },
  icon30: {
    height: 56,
    width: 56,
  },
  ////////////////Reset Password Auth//////////////
  resetImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 3,
  },
  resetbodyContainer: {
    paddingHorizontal: 30,
  },

  //forgot Password
  pickerStyleImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
