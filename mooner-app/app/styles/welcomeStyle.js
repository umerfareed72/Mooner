import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default StyleSheet.create({
  // welcomeImageAuth: {
  //   height: '50%',
  //   resizeMode: 'contain',
  //   top: '-10%',
  //   alignSelf: 'center',
  //   // backgroundColor: 'red',
  //   zIndex: 2,
  // },
  welcomeloginImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 3,
  },

  welcomeImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 2,
  },

  buttonContainerAuth: {
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.defaultRed,
  },
  loginbuttonContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 60,
    borderRadius: 8,
    width: '100%',
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
  welcomebodyContainer: {
    top: '-16%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  btnTextAuth: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'Gilroy-Bold',
  },
  btnTextLoginAuth: {
    textAlign: 'center',
    color: colors.defaultPurple,
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'Gilroy-SemiBold',
  },
  Icon15Auth: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  Icon24Auth: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  fbIconAuth: {height: 24, width: 12, resizeMode: 'contain'},
  phoneIconAuth: {
    height: 22,
    width: 14,
    resizeMode: 'contain',
  },
  textmediumAuth: {
    textAlign: 'center',
    color: colors.red,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'Gilroy-Medium',
  },
  text14medium: {
    fontSize: 14,
    color: colors.defaultBlack,
    fontFamily: 'Gilroy-Medium',
  },
  IconAlignEnd: {
    marginRight: 15,
  },
});
