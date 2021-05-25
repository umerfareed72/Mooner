import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
export default StyleSheet.create({
  ////////////////Sign Up Auth//////////////
  signupImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 4,
  },
  signupbodyContainer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  loginbuttonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.halfWhite,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnTextLoginAuth: {
    textAlign: 'center',
    color: colors.defaultPurple,
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'Gilroy-SemiBold',
  },
  //Text
  textmediumAuth: {
    textAlign: 'center',
    color: colors.red,
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: 'Gilroy-Medium',
  },
  //Icons
  fbIconAuth: {height: 24, width: 12, resizeMode: 'contain'},
  phoneIconAuth: {
    height: 22,
    width: 14,
    resizeMode: 'contain',
  },
  IconAlignEnd: {
    marginRight: 15,
    // width: '20%',
    // alignItems: 'flex-end',
  },
});
