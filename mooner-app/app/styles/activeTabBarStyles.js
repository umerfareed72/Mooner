import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../assets/colors';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default StyleSheet.create({
  //footer Container
  activeFooter: {
    backgroundColor: colors.white,
    height: '11%',
    maxHeight: 95,
    width: '100%',
    marginBottom: 15,
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  innerContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 24,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 20,

    backgroundColor: Platform.OS == 'ios' ? '#0000' : 'white',
    elevation: Platform.OS == 'ios' ? 0 : 5,
    borderWidth: Platform.OS == 'ios' ? 0 : 0,
  },
  tabcontainer: {},
  centerTabContainer: {
    backgroundColor: colors.defaultYellow,
    padding: 10,
    height: 53,
    width: 53,
    borderRadius: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabImages: {
    tintColor: colors.defaultBlack,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tabImages: {
    tintColor: colors.defaultYellow,
    width: 25,
    height: 25,
    resizeMode: 'contain',
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
});
