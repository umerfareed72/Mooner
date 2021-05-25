import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import ActiveHeader from '../../../components/activeHeader';
import BackBtn from '../../../components/backButton';
import colors from '../../../assets/colors';
import MoonerProfileComponent from '../../../components/ssComponent/moonerProfileComponent';
import SSPortfolio from '../../../components/ssComponent/ssPortfolio';
import SSAbout from '../../../components/ssComponent/ssAbout';
import SSQA from '../../../components/ssComponent/ssQA';
import SSCertification from '../../../components/ssComponent/ssCertification';
import ssPortfolio from '../../../components/ssComponent/ssPortfolio';
import {WP} from '../../../utilities/responsive';
import SSShowImages from '../../../components/ssComponent/ssShowImages';

const MoonerProfile = ({navigation}) => {
  const [activePage, setActivePage] = useState('portfolio');
  const [show, setShow] = useState(false);

  return (
    <>
      <SafeWrapper>
        <ImageBackground
          style={{
            width: '100%',
          }}
          resizeMode="contain"
          source={require('../../../assets/images/moonerProfileBg.png')}>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../../assets/images/backBtn.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('icon pressed')}>
              <Image source={require('../../../assets/images/share.png')} />
            </TouchableOpacity>
          </View>
          <MoonerProfileComponent
            img="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            name="Johny Bravo"
            rating="4"
            review="15"
            onPress={() => console.log('here')}
          />
          <View style={{flexDirection: 'row', marginTop: WP('10')}}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setActivePage('portfolio');
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      activePage === 'portfolio'
                        ? colors.defaultOrange
                        : colors.defaultBlack,
                  },
                ]}>
                Portfolio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setActivePage('about');
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      activePage === 'about'
                        ? colors.defaultOrange
                        : colors.defaultBlack,
                  },
                ]}>
                About Umer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setActivePage('qa');
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      activePage === 'qa'
                        ? colors.defaultOrange
                        : colors.defaultBlack,
                  },
                ]}>
                Q&A
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setActivePage('certificate');
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      activePage === 'certificate'
                        ? colors.defaultOrange
                        : colors.defaultBlack,
                  },
                ]}>
                Certification
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView>
          {show && (
            <SSShowImages
              show={show}
              onPressClose={() => setShow(false)}></SSShowImages>
          )}
          {activePage === 'portfolio' && (
            <SSPortfolio onPressImage={() => setShow(true)} />
          )}
          {activePage === 'about' && <SSAbout />}
          {activePage === 'qa' && <SSQA />}
          {activePage === 'certificate' && <SSCertification />}
        </ScrollView>
      </SafeWrapper>
    </>
  );
};

export default MoonerProfile;

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  textContainer: {marginStart: 20},
});
