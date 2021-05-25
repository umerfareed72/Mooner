import {StyleSheet, Dimensions} from 'react-native';
import colors from '../assets/colors';
import Colors from '../assets/colors';
import {WP} from '../utilities/responsive';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default StyleSheet.create({
  //Body
  body: {
    flex: 1,
    backgroundColor: Colors.white,
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

  searchBarContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  searchButton: {
    height: 56,
    width: 56,
    borderRadius: 24,
    backgroundColor: colors.fieldBackgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchItem: {
    height: 56,
    width: '50%',
    borderRadius: 24,
    backgroundColor: colors.fieldBackgroundGrey,
    paddingRight: 10,
    borderBottomWidth: 0,
  },

  modaltextheader: {
    color: colors.defaultYellow,
    fontFamily: 'Gilroy-Medium',
    fontSize: WP('6'),
    lineHeight: 30,
    textAlign: 'center',
  },
  modaltextheading3: {
    fontSize: WP('3.5'),
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Gilroy-SemiBold',
    color: colors.white,
  },
  flexEndContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: -10,
  },
  header1Bold: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 24,
    color: colors.white,
  },
  textInputContainer: {
    marginTop: WP('2'),
    width: '100%',
    paddingTop: WP('4'),
    paddingBottom: WP('5'),
    flexDirection: 'row',
  },
  heading4: {
    fontSize: 12,
    color: colors.white,
  },
  leftView: {
    width: '20%',
    marginTop: WP('3'),
    alignItems: 'center',
  },
});
