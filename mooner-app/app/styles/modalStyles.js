import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
import {WP} from '../utilities/responsive';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
export default StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.defaultRed,
    minHeight: vh / 2,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
  },
  modalContainerScroll: {
    backgroundColor: colors.defaultRed,
    minHeight: vh / 1.5,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
  },

  modalImage: {
    height: Dimensions.get('window').height / 4.5,
    resizeMode: 'contain',
  },
  modalImagesm: {
    height: Dimensions.get('window').height / 5,

    resizeMode: 'contain',
  },
  modalTextSemi: {
    textAlign: 'center',
    color: colors.white,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  modalTextRegular: {
    textAlign: 'center',
    color: colors.white,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    lineHeight: 20,
  },
  modalbutton: {
    marginVertical: 20,
    backgroundColor: colors.white,
    height: 42,
    width: Dimensions.get('window').width / 2.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: colors.defaultRed,
    letterSpacing: 2,
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
});
