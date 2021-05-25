import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import ActiveHeader from '../../../components/activeHeader';
import BackBtn from '../../../components/backButton';
import colors from '../../../assets/colors';
import MoonerProfileComponent from '../../../components/ssComponent/moonerProfileComponent';
import {WP} from '../../../utilities/responsive';
import SPMakeOffer from '../../../components/spComponents/spMakeOffer';
import axios from 'axios';
import {baseURL} from '../../../utilities/constant';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import JobStatusModal from '../../../components/spComponents/aceeptRejectJob';
import Toast from 'react-native-tiny-toast';

const SsProfile = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedtab] = useState('job');
  const [offer, setOffer] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [jobStatusModal, setJobStatusModal] = useState(false);
  // console.log('Job Id', route?.params?.item?.id);

  const getJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}booking/edit_jobs_posted_by_seeker/${route?.params?.item?.id}/`,
      );
      if (response?.data) {
        console.log(response.data.data);
        setJobData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getJobDetails();
  }, [route?.params?.item?.id, isFocused]);

  const makeOffer = async (job_id) => {
    if (!/^\d+$/.test(offer) || offer?.length == 0) {
      alert('Enter Valid Offer');
    } else {
      try {
        let formData = new FormData();
        formData.append('job_id', job_id);
        formData.append('offer_amount', offer);
        const response = await axios.post(
          `${baseURL}booking/sp_bid/`,
          formData,
        );
        if (response?.data) {
          // console.log(response?.data);
          if (response?.data?.status) {
            Toast.show(response?.data?.message, {
              position: Toast.position.TOP,
            });
            setOffer('');
            setshowModal(false);
            navigation?.goBack();
          } else {
            setOffer('');
            Toast.show(response?.data?.message, {
              position: Toast.position.TOP,
            });
            setshowModal(false);
          }
        }
      } catch (error) {
        alert(error?.response?.message || error?.message);
      }
    }
  };

  const changeJobStatus = async (sp_action) => {
    Alert.alert(
      'Job Offer',
      `Are you sure you want to ${sp_action} the offer ?`,
      [
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
                `${baseURL}booking/provider_action_on_job/${route?.params?.item?.id}/`,
                {sp_action},
              );
              if (response?.data) {
                setJobStatusModal(false);
                alert(response?.data?.message);
                navigation.goBack();
              }
            } catch (error) {
              alert(error?.response?.data || error?.message);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeWrapper>
      <View style={{height: '40%'}}>
        <ImageBackground
          style={{flex: 1}}
          resizeMode="contain"
          source={require('../../../assets/images/ssBg.png')}>
          <View style={styles.iconRow}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() => navigation.goBack()}>
              <Image source={require('../../../assets/images/backBtn.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('icon pressed')}>
              <Image source={require('../../../assets/images/share.png')} />
            </TouchableOpacity>
          </View>
          <MoonerProfileComponent
            img={
              jobData?.user[0]?.seeker_image ||
              'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            }
            name={jobData?.user[0]?.seeker_name || 'Seeker'}
            rating={jobData?.user[0]?.rating ?? 0}
            review={jobData?.user[0]?.booking_count}
            budget={jobData?.user[0]?.budget}
            onPress={() => console.log('here')}
            jobpost={route?.params?.jobpost}
          />
        </ImageBackground>
      </View>
      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <View style={styles.shadow}>
          <TouchableOpacity onPress={() => setSelectedtab('job')}>
            <Text
              style={selectedTab == 'job' ? styles.activeTab : styles.inActive}>
              Job Description
            </Text>
            {selectedTab == 'job' && <View style={styles.bottom}></View>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedtab('qna')}>
            <Text
              style={selectedTab == 'qna' ? styles.activeTab : styles.inActive}>
              Q&A
            </Text>
            {selectedTab == 'qna' && (
              <View style={[styles.bottom, {width: 35}]}></View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {selectedTab == 'job' ? (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={styles.jobHeader}>{jobData?.job[0]?.category_name}</Text>
          <Text style={styles.desc}>{jobData?.job[0]?.job_description}</Text>
          <Text style={styles.jobHeader}>Schedule</Text>
          <Text style={styles.dateTxt}>Date</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: WP('5'),
              marginStart: WP('3'),
            }}>
            <View style={styles.dateItemContainer}>
              <Text style={styles.dateItemTxt}>
                {moment(jobData?.job[0]?.schedule).format('MMM')}
              </Text>
            </View>
            <View style={styles.dateItemContainer}>
              <Text style={styles.dateItemTxt}>
                {moment(jobData?.job[0]?.schedule).format('DD')}
              </Text>
            </View>
            <View style={styles.dateItemContainer}>
              <Text style={styles.dateItemTxt}>
                {moment(jobData?.job[0]?.schedule).format('YYYY')}
              </Text>
            </View>
          </View>
          <Text style={[styles.dateTxt, {marginTop: WP('6')}]}>Time</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: WP('5'),
              marginStart: WP('3'),
            }}>
            <View
              style={[
                styles.dateItemContainer,
                {backgroundColor: colors.defaultYellow},
              ]}>
              <Text style={[styles.dateItemTxt, {color: colors.black}]}>
                {moment(jobData?.job[0]?.schedule).format('hh')}
              </Text>
            </View>
            <View
              style={[
                styles.dateItemContainer,
                {backgroundColor: colors.defaultYellow},
              ]}>
              <Text style={[styles.dateItemTxt, {color: colors.black}]}>
                {moment(jobData?.job[0]?.schedule).format('mm')}
              </Text>
            </View>
            <View
              style={[
                styles.dateItemContainer,
                {backgroundColor: colors.defaultYellow},
              ]}>
              <Text style={[styles.dateItemTxt, {color: colors.black}]}>
                {moment(jobData?.job[0]?.schedule).format('A')}
              </Text>
            </View>
          </View>
          {jobData?.job[0].job_status?.toLowerCase() === 'pending' ? (
            <TouchableOpacity
              onPress={() => setJobStatusModal(true)}
              style={styles.amountContainer}>
              <Text style={styles.amountTxt}>$ {jobData?.job[0]?.budget}</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={styles.jobHeader}>Answered Questions</Text>
          {jobData?.job_answers?.map((data) => (
            <View key={data?.questionid}>
              <View style={styles.questionWrapper}>
                <Text style={{color: colors.defaultYellow, fontSize: WP('3')}}>
                  ●
                </Text>
                <Text style={styles.question}>{data?.job_question}</Text>
              </View>
              <Text style={styles.answer}>{data?.job_answer}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {jobData?.job[0].job_status?.toLowerCase() === 'active' ? (
        <TouchableOpacity
          style={[styles.modalBtn]}
          onPress={() => {
            setshowModal(true);
          }}>
          <Text style={styles.modalbtnText}>Make Offer</Text>
        </TouchableOpacity>
      ) : null}

      {jobStatusModal && (
        <JobStatusModal
          onPressAccept={() => changeJobStatus('accept')}
          onPressReject={() => changeJobStatus('decline')}
          amount={jobData?.job[0]?.budget}
          onClose={() => setJobStatusModal(false)}
          show={jobStatusModal}
        />
      )}

      {showModal && (
        <SPMakeOffer
          onClose={() => setshowModal(false)}
          show={showModal}
          value={offer}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          onChangeText={(t) => {
            setOffer(t);
          }}
          onPress={() => {
            Alert.alert(
              'Make Offer',
              'Are you sure you want to make an offer ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    makeOffer(jobData?.job[0]?.id);
                  },
                },
              ],
            );
          }}
        />
      )}
    </SafeWrapper>
  );
};

export default SsProfile;

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  shadow: {
    backgroundColor: '#fff',
    width: '100%',
    height: WP('16'),
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    flexDirection: 'row',
  },
  activeTab: {
    marginStart: WP('10'),
    marginTop: WP('5'),
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultPurple,
  },
  bottom: {
    height: 3,
    backgroundColor: colors.defaultPurple,
    width: 50,
    marginStart: WP('10'),
  },
  inActive: {
    marginStart: WP('10'),
    marginTop: WP('5'),
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.black,
  },
  modalBtn: {
    marginVertical: WP('4'),
    width: WP('90'),
    backgroundColor: colors.defaultPurple,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalbtnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  jobHeader: {
    fontSize: WP('5'),
    fontFamily: 'Gilroy-SemiBold',
    padding: WP('5'),
    color: colors.defaultPurple,
    paddingStart: WP('6'),
  },
  desc: {
    fontSize: WP('4.4'),
    fontFamily: 'Gilroy-Regular',
    paddingHorizontal: WP('6'),
  },
  dateTxt: {
    fontSize: WP('4.4'),
    fontFamily: 'Gilroy-SemiBold',
    paddingStart: WP('6'),
  },
  dateItemContainer: {
    backgroundColor: colors.defaultPurple,
    width: WP('17'),
    height: WP('22'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginStart: WP('3'),
  },
  dateItemTxt: {
    fontSize: WP('5'),
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
  },
  question: {
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultBlack,
    marginStart: WP('2'),
  },
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('6'),
  },
  answer: {
    paddingStart: WP('10'),
    paddingHorizontal: WP('6'),
    fontFamily: 'Gilroy-Regular',
    opacity: 0.8,
    fontSize: WP('4'),
    marginVertical: WP('3'),
  },
  amountContainer: {
    backgroundColor: colors.defaultPurple,
    borderRadius: 18,
    position: 'absolute',
    bottom: '7%',
    right: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  amountTxt: {
    padding: WP('4'),
    paddingVertical: WP('6'),
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
  },
});
