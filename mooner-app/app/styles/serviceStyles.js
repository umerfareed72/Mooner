import {StyleSheet, Dimensions, Platform} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from '../assets/colors';
import {WP} from '../utilities/responsive';
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
  childContainerRow: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  childContainer: {
    backgroundColor: colors.halfWhite,
    height: WP('48'),
    width: '47%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  littleChildContainer: {
    backgroundColor: colors.halfWhite,
    height: 23,
    width: 57,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  littleContainerText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: colors.darkBlack,
  },
  listmainContainer: {
    backgroundColor: colors.halfWhite,
    borderRadius: 32,
    padding: 20,
  },
  listinnerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listleftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listImageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  listbuttonConatiner: {
    backgroundColor: colors.defaultRed,
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    marginTop: 20,
    borderRadius: 10,
  },

  //Text

  signupImageAuth: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 4.5,
    width: '100%',
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
  questionText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: colors.defaultBlack,
  },
  servicesrightContainer: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  icon30: {
    height: 56,
    width: 56,
  },
  radioText: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: colors.defaultBlack,
  },
  notFoundText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
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

  ///Find Category
  serachbarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.halfWhite,
    padding: 30,
    marginTop: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  //Purple Forward Button
  purpleForwardButton: {
    backgroundColor: colors.defaultPurple,
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  forwardButtonArrow: {
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },

  //Success Pop Up
  popUpContainer: {
    backgroundColor: colors.defaultPurple,
    borderRadius: 40,
    width: '100%',
    bottom: 0,
  },
  popUpInnerPaddings: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  popUpImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
  },

  //active
  activeCircle: {
    height: 15,
    width: 15,
    borderRadius: 8,
    backgroundColor: '#219653',
    alignSelf: 'flex-end',
    marginTop: -30,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
  },

  itemContainer: {
    height: 100,
    width: '100%',
    backgroundColor: colors.halfWhite,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
  },
  itemLeftImage: {
    height: 67,
    width: 67,
    borderRadius: 26,
  },
  itemRightBlock: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  itemRBRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  //time picker
  spModalContainer: {
    backgroundColor: colors.defaultPurple,
    borderRadius: 40,
    width: '100%',
    bottom: 0,
  },
  spTimeModalButton: {
    marginTop: 20,
    backgroundColor: colors.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  spValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginRight: 10,
  },
  spModalHeading: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 24,
    color: 'white',
  },
  dayPills: {
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
});
