import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
export default StyleSheet.create({
  welcomeImageAuth: {
    width: '100%',
    height: vh / 3,
    resizeMode: 'contain',
  },
  buttonContainerAuth: {
    marginVertical: 5,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.defaultRed,
  },
  btnTextAuth: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
    letterSpacing: 0.2,
    fontFamily: 'Gilroy-Bold',
  },
  otpContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  otpBox: {
    backgroundColor: colors.fieldBackgroundGrey,
    height: 46,
    width: 46,
    borderRadius: 8,
    fontSize: 20,
  },
});
