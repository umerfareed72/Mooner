import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import colors from '../../../assets/colors';
import TrackOrderProfileCard from '../../../components/ssComponent/trackOrderProfileCard';
import Iicon from 'react-native-vector-icons/Ionicons';
import Oicon from 'react-native-vector-icons/Octicons';
import BackButton from '../../../components/backButton';

const TrackOrder = ({navigation}) => {
  return (
    <SafeWrapper color={colors.defaultRed}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.separator}></View>
          <View style={styles.estimatedTimeContainer}>
            <Text style={styles.estimatedTime}>Estimated Arrival</Text>
            <Text style={styles.estimatedTime}>12:25 pm</Text>
          </View>
          <Text style={styles.bookStatustxt}>
            <Text style={{fontFamily: 'Gilroy-SemiBold'}}>Booking</Text>
            <Text> Status</Text>
          </Text>
          <View style={{marginStart: 40}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CompletedStep />
              <Text style={{marginStart: 20, color: colors.white}}>
                Service Accepted
              </Text>
            </View>
            <View style={{marginStart: 7}}>
              <Text style={{color: colors.white}}>|</Text>
              <Text style={{color: colors.white}}>|</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InComplete />
              <Text style={{marginStart: 20, color: colors.white}}>
                Anytime Now
              </Text>
            </View>
            <View style={{marginStart: 7}}>
              <Text style={{color: colors.white}}>|</Text>
              <Text style={{color: colors.white}}>|</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InComplete />
              <Text style={{marginStart: 20, color: colors.white}}>
                At Your Doorstep
              </Text>
            </View>
            <View style={{marginStart: 7}}>
              <Text style={{color: colors.white}}>|</Text>
              <Text style={{color: colors.white}}>|</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InComplete />
              <Text style={{marginStart: 20, color: colors.white}}>
                Job Completed
              </Text>
            </View>
          </View>

          <View style={styles.line}></View>
          <TrackOrderProfileCard
            img="https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-profile-line-black-icon-png-image_691051.jpg"
            name="Johm Anderson"
            sericeId="#3256775"
            reviews="68"
            serviceName="Haircut Artist"
            star="5"
          />
          <View style={[styles.line, {marginTop: 40, opacity: 0.2}]}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '85%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
              Total
            </Text>
            <Text
              style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
              $45
            </Text>
          </View>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={{fontSize: 17, fontFamily: 'Gilroy-Regular'}}>
              Release Payment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeWrapper>
  );
};

export default TrackOrder;

const CompletedStep = () => {
  return (
    <View
      style={{
        backgroundColor: '#219653',
        borderRadius: 100,
        marginVertical: 6,
      }}>
      <Iicon
        name="checkmark"
        color={colors.white}
        size={15}
        style={{fontWeight: 'bold', padding: 2}}
      />
    </View>
  );
};

const InComplete = () => {
  return <Oicon name="primitive-dot" color={colors.halfWhite} size={35} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultRed,
    flex: 1,
  },
  separator: {
    height: 4,
    backgroundColor: colors.white,
    width: 130,
    alignSelf: 'center',
    borderRadius: 13,
    marginTop: 20,
  },
  estimatedTime: {
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  bookStatustxt: {
    color: colors.white,
    fontSize: 15,
    paddingStart: 20,
    paddingBottom: 20,
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: colors.white,
    opacity: 0.6,
    alignSelf: 'center',
    marginTop: 20,
  },
  btnContainer: {
    backgroundColor: colors.defaultYellow,
    width: '85%',
    alignSelf: 'center',
    height: 60,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
