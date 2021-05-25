import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../assets/colors';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  innerView: {
    height: vh,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  sectionCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  rightAbsoluteContainer: {
    position: 'absolute',
    bottom: 30,
    right: 0,
  },
  icon30: {
    height: 50,
    width: 50,
  },
  h1SplashTitle: {
    position: 'absolute',
    bottom: 130,
    textAlign: 'left',
    left: 30,
  },
});
