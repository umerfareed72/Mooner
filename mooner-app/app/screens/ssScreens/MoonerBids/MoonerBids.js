import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {HP, WP} from '../../../utilities/responsive';
import ActiveHeader from '../../../components/activeHeader';
import BackButton from '../../../components/backButton';
import {CommonActions} from '@react-navigation/native';
import appStyles from '../../../styles/appStyles';
import serviceStyles from '../../../styles/serviceStyles';
import {images} from '../../../assets/images';
import colors from '../../../assets/colors';
import {baseURL, imagesURL} from '../../../utilities/constant';
import GetLocation from 'react-native-get-location';
import SSSuccessModal from '../../../components/ssComponent/ssSuccessModal';
import MoonerBidCard from '../../../components/ssComponent/moonerBidCard';
import * as MYBOOKING from '../../../redux/actions/mybooking.action';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const MoonerBids = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.mybooking?.moonerBidsLoader);
  const moonerBidList = useSelector((state) => state?.mybooking?.moonerBids);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(MYBOOKING.getMoonersBids(route?.params?.job_id));
    }
  }, [isFocused]);

  const bookingHandler = async (sp_action, sp_id, bid_id) => {
    Alert.alert('Order', `Are you sure you want to ${sp_action} this order?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const response = await axios.post(
              `${baseURL}booking/provider_action_on_job/${route?.params?.job_id}/`,
              {sp_action, sp_id, bid_id},
            );
            if (response?.data && sp_action === 'accept') {
              setshowModal(true);
            } else {
              navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'ssHomeScreen'}],
                }),
              );
            }
          } catch (error) {
            console.log(error);
            sp_action === 'accept'
              ? alert('Error while order acceptance')
              : alert('Error while order decline');
          }
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar sbarStyle="dark-content" />
      <SafeAreaView style={appStyles.body}>
        {/* header */}
        <ActiveHeader navigation={navigation} />
        <BackButton navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback>
            <View style={[serviceStyles.signupbodyContainer]}>
              <View>
                <Image
                  style={[serviceStyles.signupImageAuth]}
                  source={images.mooners}></Image>
              </View>
              <View style={[appStyles.mt30]}>
                <Text style={[appStyles.h1ServiceHeading]}>We Promise</Text>
                <Text style={[appStyles.h3ServiceHeading, appStyles.mt10]}>
                  Best in{' '}
                  <Text style={{color: colors.defaultRed}}>
                    Class Professionals
                  </Text>
                </Text>
                <Text
                  style={[
                    appStyles.h4ServiceHeading,
                    appStyles.mt5,
                    {color: colors.defaultPurple},
                  ]}>
                  Background{' '}
                  <Text style={{fontFamily: 'Gilroy-Bold'}}>
                    verified, certified & skilled.
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  appStyles.rowAlign,
                  appStyles.mt40,
                  appStyles.aiCenter,
                ]}>
                <Text
                  style={[
                    appStyles.h1ServiceHeading,
                    {color: colors.defaultRed},
                  ]}>
                  Our Mooners
                </Text>
              </View>
              {/* questions */}
              <>
                {/* {this?.state?.moonersList?.length > 0 ? (
                  this.renderMooners()
                ) : (
                  <Text style={serviceStyles.notFoundText}>
                    No Mooners Available :(
                  </Text>
                )} */}
              </>
            </View>
          </TouchableWithoutFeedback>
          {loader ? (
            <View
              style={{
                height: HP('40'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={colors.defaultYellow} />
            </View>
          ) : moonerBidList?.length > 0 ? (
            <FlatList
              data={moonerBidList}
              renderItem={({item}) => (
                <MoonerBidCard
                  onPressMsg={() => {
                    alert('working');
                  }}
                  img={imagesURL + '/media/' + item?.sp_profile_image}
                  name={item?.sp_name}
                  review={item?.completed_jobs}
                  rating={item?.sp_rating || 0}
                  onPressAccept={() => {
                    bookingHandler('accept', item?.sp_id, item?.id);
                  }}
                  onPressReject={() => {
                    bookingHandler('decline', item?.sp_id, item?.id);
                  }}
                  price={item?.price}
                  service={item?.category_name}
                />
              )}
              keyExtractor={(item) => item?.toString()}
            />
          ) : (
            <View style={styles.noMoonerContainer}>
              <Text style={styles.noMoonerTxt}>No Mooner Bids Available.</Text>
            </View>
          )}
        </ScrollView>

        {showModal && (
          <SSSuccessModal
            show={showModal}
            onPress={() => {
              navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'ssHomeScreen'}],
                }),
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default MoonerBids;

const styles = StyleSheet.create({
  noMoonerContainer: {
    height: HP('30'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoonerTxt: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: WP('4'),
  },
});
