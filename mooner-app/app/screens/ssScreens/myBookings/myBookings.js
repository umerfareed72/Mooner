import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import ActiveHeader from '../../../components/activeHeader';
import BackBtn from '../../../components/backButton';
import colors from '../../../assets/colors';
import MyBookingCard from '../../../components/ssComponent/myBookingCard';
import ActiveJobs from '../../../components/ssComponent/activeJobs';
import {useSelector, useDispatch} from 'react-redux';
import {WP, HP} from '../../../utilities/responsive';
import * as MYBOOKING from '../../../redux/actions/mybooking.action';
import {imagesURL} from '../../../utilities/constant';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const MyBookings = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [activePage, setActivePage] = useState('ongoing');

  const role = useSelector((state) => state?.common?.role);
  const loader = useSelector((state) => state?.mybooking?.loader);
  const activeJob = useSelector((state) => state?.mybooking?.activeJobs);
  const completeJobs = useSelector((state) => state?.mybooking?.completed);
  const ongoingJobs = useSelector((state) => state?.mybooking?.ongoing);

  useEffect(() => {
    if (isFocused) {
      if (role === 'ss') dispatch(MYBOOKING.getMyBookings('ss'));
      else dispatch(MYBOOKING.getMyBookings('sp'));
    }
  }, [isFocused, role]);
  console.log('Active Jobs', activeJob);
  return (
    <SafeWrapper>
      <ActiveHeader hideToggle={true} navigation={navigation} />
      <BackBtn navigation={navigation} styles={{marginTop: -40}} />
      {loader ? (
        <View style={styles.view}>
          <ActivityIndicator size="large" color={colors.defaultYellow} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.myBooking}>My Booking</Text>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => setActivePage('aj')}
              style={{marginStart: 30}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      role === 'sp'
                        ? colors.defaultPurple
                        : colors.defaultOrange,
                  },
                ]}>
                {role == 'sp' ? 'Active Bids' : 'Active Jobs'}
              </Text>
              {activePage == 'aj' && (
                <View
                  style={[
                    styles.bottomLine,
                    {
                      backgroundColor:
                        role === 'sp'
                          ? colors.defaultPurple
                          : colors.defaultOrange,
                    },
                  ]}></View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActivePage('ongoing')}
              style={{marginStart: 30}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      role === 'sp'
                        ? colors.defaultPurple
                        : colors.defaultOrange,
                  },
                ]}>
                Ongoing
              </Text>
              {activePage == 'ongoing' && (
                <View
                  style={[
                    styles.bottomLine,
                    {
                      backgroundColor:
                        role === 'sp'
                          ? colors.defaultPurple
                          : colors.defaultOrange,
                    },
                  ]}></View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActivePage('complete')}
              style={{marginStart: 30}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color:
                      role === 'sp'
                        ? colors.defaultPurple
                        : colors.defaultOrange,
                  },
                ]}>
                Completed
              </Text>
              {activePage == 'complete' && (
                <View
                  style={[
                    styles.bottomLine,
                    {
                      backgroundColor:
                        role === 'sp'
                          ? colors.defaultPurple
                          : colors.defaultOrange,
                    },
                  ]}></View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            {activePage === 'ongoing' ? (
              ongoingJobs?.length > 0 ? (
                <FlatList
                  contentContainerStyle={{paddingBottom: 250}}
                  data={ongoingJobs}
                  renderItem={({item}) => (
                    <MyBookingCard
                      onPress={() => {
                        if (role === 'ss') return;
                        else navigation.navigate('ssProfile');
                      }}
                      price={'$' + item?.budget}
                      serviceName={item?.category_name}
                      status={item?.order_status}
                      distance="3km"
                      date={moment(item?.end_date).format('MMM DD, YYYY')}
                      providerName={item?.provider_name}
                      img={imagesURL + '/media/' + item?.category_image}
                    />
                  )}
                  keyExtractor={(item) => item?.id?.toString()}
                />
              ) : (
                <View style={styles.view}>
                  <Text style={styles.msg}>No Ongoing Orders</Text>
                </View>
              )
            ) : activePage === 'aj' ? (
              activeJob?.length > 0 ? (
                <FlatList
                  style={{marginTop: WP('4')}}
                  key="aj"
                  numColumns={2}
                  contentContainerStyle={{paddingBottom: 100}}
                  data={activeJob}
                  renderItem={({item}) => (
                    <ActiveJobs
                      onPress={() => {
                        if (role == 'ss')
                          navigation.navigate('MoonerBids', {job_id: item?.id});
                        else {
                          navigation.navigate('ssProfile', {
                            item,
                            jobpost: true,
                          });
                        }
                      }}
                      isSS={role == 'ss'}
                      offer={item?.budget}
                      bids={item?.Total_bids}
                      name={item?.category_name}
                      img={imagesURL + '/media/' + item?.category_image}
                    />
                  )}
                  keyExtractor={(item) => item?.id?.toString()}
                />
              ) : (
                <View style={styles.view}>
                  <Text style={styles.msg}>No Active Jobs.</Text>
                </View>
              )
            ) : completeJobs?.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 250}}
                data={completeJobs}
                renderItem={({item}) => (
                  <MyBookingCard
                    price={'$' + item?.budget}
                    serviceName={item?.category_name}
                    status={item?.order_status}
                    distance="3km"
                    date={moment(item?.end_date).format('MMM DD, YYYY')}
                    // onPress={() => console.log(item)}
                    providerName={item?.provider_name}
                    img={imagesURL + '/media/' + item?.category_image}
                  />
                )}
                keyExtractor={(item) => item?.id?.toString()}
              />
            ) : (
              <View style={styles.view}>
                <Text style={styles.msg}>No Active Jobs.</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeWrapper>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  myBooking: {
    fontSize: 22,
    fontFamily: 'Gilroy-bold',
    color: colors.defaultBlack,
    paddingStart: 30,
  },
  bottomLine: {
    width: 30,
    height: 4,
    backgroundColor: colors.defaultOrange,
    marginTop: 3,
    marginStart: 3,
  },
  heading: {
    fontSize: 17,
    color: colors.defaultOrange,
    fontFamily: 'Gilroy-SemiBold',
  },
  headingContainer: {flexDirection: 'row', marginTop: 20},
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HP('55'),
  },
  msg: {
    fontSize: WP('5'),
    fontFamily: 'Gilroy-SemiBold',
  },
});
