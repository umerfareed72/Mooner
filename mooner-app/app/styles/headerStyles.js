import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';

var vw = Dimensions.get('window').width;
var vh = Dimensions.get('window').height;

export default StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  activeHeader: {
    height: '12%',
    width: '100%',
    backgroundColor: colors.white,
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 20,
    paddingHorizontal: 30,
  },
  header2: {
    height: 60,
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBackground: {
    height: 40,
    width: 40,
    marginLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageBackgroundImage: {borderRadius: 20, borderColor: 'black'},
  imageIcon: {height: 10, width: 10},
  activeLogoText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 3,
  },
  sectionMiddle: {
    height: '100%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLeft: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sectionRight: {
    height: '100%',
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
