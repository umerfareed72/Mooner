import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../assets/colors';
import Colors from '../assets/colors';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
let AuthHeaderHeight = vh / 6;

export default StyleSheet.create({
  //Header
  authHeader: {
    height: AuthHeaderHeight,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    zIndex: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: Platform.OS == 'android' ? -25 : -25,
  },
  icon15: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  //Text

  authLogoText: {
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.defaultBlack,
    fontFamily: 'Gilroy-Bold',
  },
  authSkipText: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.defaultBlack,
    textDecorationLine: 'underline',
    fontFamily: 'Gilroy-SemiBold',
  },
  sectionLeft: {
    width: '20%',
    alignItems: 'flex-start',
  },
  sectionMiddle: {
    width: '60%',
    alignItems: 'center',
  },
  sectionRight: {
    width: '20%',
    alignItems: 'flex-end',
  },

  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  authImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  backButton: {
    height: 36,
    width: 36,
    position: 'absolute',
    top: Platform.OS == 'ios' ? '17%' : '12%',
    left: 30,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: Platform.OS == 'ios' ? 'white' : colors.white,
    elevation: Platform.OS == 'ios' ? 0 : 5,
    // borderWidth: Platform.OS == 'ios' ? 0.2 : 0,
    // borderColor: colors.defaultBlack,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  backButtonArrow: {
    height: 18,
    width: 10,
    // resideMode: 'contain',
    tintColor: colors.defaultRed,
  },
  h0Auth: {
    color: Colors.darkBlack,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Gilroy-Bold',
  },
  h1Auth: {
    color: Colors.darkBlack,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
  },
  h2Auth: {
    marginVertical: 10,
    color: Colors.defaultBlack,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Gilroy-Regular',
  },
  h1ServiceHeading: {
    color: Colors.darkBlack,
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Gilroy-SemiBold',
  },

  h3ServiceHeading: {
    color: Colors.darkBlack,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },

  h4ServiceHeading: {
    color: Colors.darkBlack,
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
  h5ServiceHeading: {
    color: Colors.darkBlack,

    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  h6ServiceHeading: {
    color: Colors.darkBlack,
    textAlign: 'left',
    fontSize: 10,
    fontFamily: 'Gilroy-SemiBold',
  },
  semiBoldBodyText: {
    color: Colors.darkBlack,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  regularSmallBodyText: {
    color: Colors.defaultBlack,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Gilroy-Regular',
  },

  //Images
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

  //Align center
  aiCenter: {
    alignItems: 'center',
  },
  aiflexEnd: {
    alignItems: 'flex-end',
  },
  jcCenter: {
    justifyContent: 'center',
  },
  //Padding
  pr10: {
    paddingRight: 10,
  },
  //Margins
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mt5: {
    marginTop: 5,
  },
  mt40: {
    marginTop: 40,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh30: {
    marginHorizontal: 30,
  },
  mh40: {
    marginHorizontal: 40,
  },
  mh50: {
    marginHorizontal: 50,
  },
  mt20: {
    marginTop: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  pb30: {
    paddingBottom: 30,
  },
  ph30: {
    paddingHorizontal: 30,
  },
  mv5: {
    marginVertical: 5,
  },
  icon13: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
  },
  icon56: {
    height: 56,
    width: 56,
    resizeMode: 'contain',
  },
  icon11: {
    height: 11,
    width: 11,
    resizeMode: 'contain',
  },
  icon26: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  icon15: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },

  mt10: {
    marginTop: 10,
  },
  icon56Container: {
    backgroundColor: colors.defaultYellow,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 56,
  },
  left: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  rightSpace: {
    marginRight: 20,
  },

  //Row Align
  row: {
    flexDirection: 'row',
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //Row Partitons
  widthinputAuth: {
    width: '80%',
    // right: 20,
  },
  pickerinput: {
    backgroundColor: colors.halfWhite,
    borderRadius: 8,
    height: 45,
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
  },
  androidPicker: {
    fontSize: 12,
    color: Colors.defaultBlack,
    fontFamily: 'Gilroy-Regular',
  },
  iosPicker: {
    fontSize: 12,
    color: Colors.defaultBlack,
    fontFamily: 'Gilroy-Regular',
    marginLeft: 30,
  },
  icon30: {
    height: 56,
    width: 56,
  },
  icon14: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  rightContainer: {
    alignSelf: 'flex-end',
  },
  linkText: {
    color: Colors.defaultRed,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  bodyContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  topZeroContainer: {
    marginTop: '0%',
    backgroundColor: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  text12smallAuth: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: 'Gilroy-Regular',
  },
  answerInputField: {
    backgroundColor: colors.halfWhite,
    justifyContent: 'flex-start',
    minHeight: 90,
    borderRadius: 16,
    padding: 10,
  },
  dropDownItem: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  staticDropDownContainer: {
    backgroundColor: 'white',
    elevation: 5,
    position: 'absolute',
    padding: 20,
    right: 60,
    bottom: -50,
    zIndex: 10000,
  },
  spStatsContainer: {
    backgroundColor: colors.halfWhite,
    width: '100%',
    height: 110,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 24,
    flexDirection: 'row',
  },
  spAddItemContainer: {
    backgroundColor: colors.lightPink,
    width: '100%',
    height: 85,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spStatsHalfContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  spHeadingRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonPill: {
    backgroundColor: colors.halfWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 22,
    borderRadius: 24,
  },
  weirdImageFrame: {
    height: '55%',
    width: '80%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 100,
    // resizeMode: 'contain',
  },
  font24: {
    fontSize: 24,
    color: 'black',
  },
  font16: {
    fontSize: 16,
    color: 'black',
  },
  font13: {
    fontSize: 13,
    color: 'black',
  },
  fontCenter: {
    textAlign: 'center',
  },
  fontRegular: {
    fontFamily: 'Gilroy-Regular',
    color: 'black',
  },
  fontBold: {
    fontFamily: 'Gilroy-Bold',
    color: 'black',
  },
  fontRegular: {
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
  },
  fontMedium: {
    fontFamily: 'Gilroy-Medium',
    color: 'black',
  },

  //input Item
  item: {
    fontSize: 16,
    fontFamily: 'Golroy-Medium',
    color: 'black',
  },
  loginInputIcon: {
    width: '100%',
    backgroundColor: colors.halfWhite,
    borderRadius: 16,
    paddingLeft: 20,
    height: 45,
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
  },
  ItemLabel: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  BigTextFieldHeight: {
    height: 85,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  modalLine: {
    width: '30%',
    resizeMode: 'contain',
  },
  text12smallAuth: {
    fontSize: 12,
    color: colors.red,
    fontFamily: 'Gilroy-Regular',
  },
});
