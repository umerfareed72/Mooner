import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import ActiveHeader from '../../../components/activeHeader';
import BackBtn from '../../../components/backButton';
import colors from '../../../assets/colors';

const {width, height} = Dimensions.get('window');
const TermCondition = ({navigation}) => {
  return (
    <SafeWrapper>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ActiveHeader navigation={navigation} />
        <BackBtn navigation={navigation} styles={{marginTop: -20}} />
        <Image
          source={require('../../../assets/images/termcondition.png')}
          style={styles.img}
        />
        <Text style={styles.privacyTxt}>Term & Conditions</Text>
      </ScrollView>
    </SafeWrapper>
  );
};

export default TermCondition;

const styles = StyleSheet.create({
  img: {
    width: width - 150,
    height: width - 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 60,
  },
  privacyTxt: {
    fontSize: 25,
    fontFamily: 'Gilroy-Bold',
    color: colors.defaultOrange,
    padding: 20,
  },
});
