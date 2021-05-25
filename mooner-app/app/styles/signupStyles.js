import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
export default StyleSheet.create({
  ////////////////Sign Up Auth//////////////

  //Body
  signupImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 4,
  },
  signupbodyContainer: {
    paddingHorizontal: 30,
  },
  //Text

  signupImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 4,
  },
  pickerStyleImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  signupbodyContainer: {
    paddingHorizontal: 30,
  },
  //Icons
  Icon10Auth: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  iconxms: {
    height: 6,
    width: 6,
    resizeMode: 'contain',
  },
  loginInputIcon: {
    backgroundColor: colors.halfWhite,
    borderRadius: 8,
    paddingLeft: 20,
    height: 45,
    width: '100%',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
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
    color: colors.defaultBlack,
    fontFamily: 'Gilroy-Regular',
  },
  textmediumAuth: {
    textAlign: 'center',
    color: colors.red,
    fontSize: 12,

    fontFamily: 'Gilroy-Medium',
  },
});
