import React, {Component} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {WP} from '../../utilities/responsive';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import {CommonActions} from '@react-navigation/native';
import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';
import {images} from '../../assets/images';
import colors from '../../assets/colors';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {connect} from 'react-redux';
import {baseURL, imagesURL} from '../../utilities/constant';
import GetLocation from 'react-native-get-location';
import SSSuccessModal from '../../components/ssComponent/ssSuccessModal';
import HireMooner from '../../components/ssComponent/hireMooner';
import * as POSTJOBS from '../../redux/actions/postjob.action';
import axios from 'axios';
import SSMoonerFilter from '../../components/ssComponent/ssMoonerFliter';
import Toast from 'react-native-tiny-toast';
import {
  createChatChannel,
  getChatToken,
} from '../../redux/actions/chating.action';

class moonerListsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      photoData: '',
      photoUri: '',
      starCount: 5,
      show: false,
      value: 0,
      loading: false,
      ageValues: [1, 1000],
      slots: [
        {id: 0, title: 'Slowest to Fastest'},
        {id: 1, title: 'Fastest to Lowest'},
      ],

      title: {},
      t1: false,
      t2: false,
      t3: false,
      t4: false,
      ratinglSlot: '',
      priceSlots: [
        {id: 0, title: 'High to Low'},
        {id: 1, title: 'Low to High'},
      ],
      priceslot: '',
      defaultcolor: colors.white,
      moonersList: [
        {
          id: '001',
          username: 'Test User',
        },
      ],
      minBudget: 0,
      maxBudget: 1000,
      showSuccessModal: false,
      selectedSlot: {rating: 'high to low'},
      hideBtn: true,
      loader: false,
      filterType: 'rating',
      chatToken: '',
      channelId: '',
    };
  }

  // On Job Post
  onJobPost = async (sp_id) => {
    this.setState({
      loader: true,
    });

    try {
      const response = await axios.post(
        `${baseURL}booking/jobs_posted_by_seeker/`,
        {
          job_status: /^\d+$/.test(sp_id) ? 'Pending' : 'Active',
          budget: this?.props?.postJobData?.budget,
          job_description: this?.props?.postJobData?.job_description,
          ssid: this?.props?.postJobData?.ssid,
          job_category: this?.props?.postJobData?.job_category,
          job_cat_child: this?.props?.postJobData?.job_cat_child,
          job_answers: this?.props?.postJobData?.job_answers,
          schedule: this?.props?.postJobData?.dateTime,
          sp_id: /^\d+$/.test(sp_id) ? sp_id : '',
        },
      );
      if (response?.data) {
        if (/^\d+$/.test(sp_id)) {
          Toast.showSuccess('Request Send To Mooner Successfully', {
            position: Toast.position.TOP,
          });
        } else {
          console.log('New', response.data);
          Toast.showSuccess('Job Posted Successfully', {
            position: Toast.position.TOP,
          });
        }
        this.props.resetJobPost();
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'ssHomeScreen'}],
          }),
        );
      }
    } catch (error) {
      // console.log(error);

      alert(error?.response?.message || error?.message);
    } finally {
      this.setState({loader: false});
    }
  };

  getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        this.updateLocation(location);
      })
      .catch((error) => {
        const {code, message} = error;
        if (code == 'UNAVAILABLE') {
          Alert.alert(
            'Location Check Failed',
            'Please turn on the location.',
            [{text: 'OK', onPress: () => console.log('Cancelled')}],
            {cancelable: false},
          );
        }
      });
  };
  componentDidMount = () => {
    this.setState({
      moonersList: this?.props?.route?.params?.moonersList,
    });
    this.getLocation();
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  selectSlot = (id, title) => {
    this.setState({
      slot: id,
      title: title,
    });
  };
  selectRatingSlot = (id, title) => {
    this.setState({
      ratinglSlot: id,
      title: title,
    });
  };
  selectPriceSlot = (id, title) => {
    this.setState({
      priceslot: id,
      title: title,
    });
  };
  ageValuesChange = (ageValues) => {
    this.setState({
      ageValues,
    });
  };
  createUserChannel = (item) => {
    this.setState({loading: true});
    const number = Math.trunc(Math.random() * 100000).toString();
    const data = {
      userid: this?.props?.postJobData?.ssid,
      number: number,
      provider_id: item.sp_id,
      usertoken: this.props.auth?.userInfo.access,
    };
    // this.props.getChatToken(data);
    // this.props.createChatChannel(data);
    try {
      var form1 = new FormData();
      form1.append('identity', data.userid);
      axios.post(baseURL + 'twilio_token/', form1).then((res) => {
        var form = new FormData();
        form.append('seeker_id', data.userid);
        form.append('provider_id', data.provider_id);
        form.append('channel_id', data.number);
        axios
          .post(baseURL + 'twilio_chat/chat/', form, {
            headers: {
              Authorization: `Bearer ${data.usertoken}`,
            },
          })
          .then((channel) => {
            console.log('---------Redux Channel-------->', channel?.data);
            this.setState({
              loading: false,
              chatToken: res.data.token,
              channelId: channel.data.data[0].channel_id,
            });
            this.props.navigation.navigate('ssChatBox', {
              chatToken: res.data.token,
              channelId: channel.data.data[0].channel_id,
              user_name: item.sp_name,
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderMooners = () =>
    this?.props?.postJobData?.mooner_list?.map((item) => (
      <HireMooner
        onPressNavigate={() =>
          this.props.navigation.navigate('SSMoonerProfile')
        }
        onPressChat={() => {
          this.createUserChannel(item);
        }}
        onPress={() => {
          Alert.alert(
            'Hire Mooner',
            'Are you sure you want to send request to this mooner?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.onJobPost(item?.sp_id)},
            ],
          );
        }}
        username={item?.sp_name}
        categoryImage={
          this?.props?.route?.params?.parentCategory?.category_image
        }
        profilePic={
          'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
        }
        catName={item?.category_name}
        id={item?.id}
        budget={item?.sp_service_price}
        rating={item?.sp_rating}
        completedJobs={item?.completed_jobs}
      />
    ));

  showFilterModal = () => {
    return (
      <SSMoonerFilter
        showBudget={true}
        budgetValue={[1, 1000]}
        onBudgetChange={(val) => {
          this.setState({ageValues: val});
        }}
        onChanget1={() =>
          this.setState({
            t1: true,
            t2: false,
            t3: false,
            t4: false,
            title: {price: 'High to Low'},
          })
        }
        onChanget2={() => {
          this.setState({
            t1: false,
            t2: true,
            t3: false,
            t4: false,
            title: {price: 'Low to High'},
          });
        }}
        onChanget3={() =>
          this.setState({
            t1: false,
            t2: false,
            t3: true,
            t4: false,
            title: {rating: 'High to Low'},
          })
        }
        onChanget4={() =>
          this.setState({
            t1: false,
            t2: false,
            t3: false,
            t4: true,
            title: {rating: 'Low to High'},
          })
        }
        btn1={this.state.t1}
        btn2={this.state.t2}
        btn3={this.state.t3}
        btn4={this.state.t4}
        onPressReset={() => {
          this.setState({
            ageValues: [0, 1000],
            filterType: 'rating',
            show: false,
            t1: false,
            t2: false,
            t3: false,
            t4: false,
            hideBtn: true,
          });
        }}
        onPressApply={() => {
          this.props.getMoonerList(
            this.props?.postJobData?.job_cat_child,
            this.state.ageValues[0],
            this.state.ageValues[1],
            this.state.filterType,
          );
          this.setState({show: false, hideBtn: true});
        }}></SSMoonerFilter>
    );
  };
  render() {
    // console.log(this?.props?.postJobData?.mooner_list);
    return (
      <>
        <StatusBar sbarStyle="dark-content" />

        <SafeAreaView style={appStyles.body}>
          {/* header */}
          <ActiveHeader navigation={this.props.navigation} />
          <BackButton navigation={this.props.navigation} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({show: false, hideBtn: true})}>
              <View style={[serviceStyles.signupbodyContainer]}>
                <View>
                  <Image
                    style={[serviceStyles.signupImageAuth]}
                    source={{
                      uri:
                        imagesURL +
                        this?.props?.route?.params?.parentCategory
                          ?.category_image,
                    }}></Image>
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
                  <TouchableOpacity
                    style={[serviceStyles.littleChildContainer]}
                    onPress={() => {
                      this.setState({show: 'flex', hideBtn: false});
                    }}>
                    <Image
                      source={images.filter}
                      style={{
                        height: '40%',
                        width: '30%',
                        resizeMode: 'contain',
                      }}></Image>
                    <Text style={[serviceStyles.littleContainerText]}>
                      Filter
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* questions */}
                {this.state.loader ||
                this?.props?.postJobData?.mooner_list_loader ? (
                  <ActivityIndicator
                    size="large"
                    style={{marginTop: WP('20')}}
                    color={colors.defaultYellow}
                  />
                ) : (
                  <>
                    {this?.props?.postJobData?.mooner_list?.length > 0 ? (
                      this.renderMooners()
                    ) : (
                      <Text style={serviceStyles.notFoundText}>
                        No Mooners Available :(
                      </Text>
                    )}
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {this.state.show && this.showFilterModal()}
          {this.state.showSuccessModal && (
            <SSSuccessModal
              show={this.state.showSuccessModal}
              onPress={() => {
                this.setState({
                  showSuccessModal: false,
                });
                this.props.navigation.navigate('ss');
              }}
            />
          )}
          {this.state.hideBtn && (
            <TouchableOpacity
              style={moonerListStyle.postJobBtn}
              onPress={this.onJobPost}>
              <Text style={moonerListStyle.postjobTxt}>Post Job</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postJobData: state?.jobpost,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetJobPost: () => dispatch(POSTJOBS.reset()),
    getChatToken: (data) => dispatch(getChatToken(data)),
    createChatChannel: (data) => dispatch(createChatChannel(data)),
    getMoonerList: (child_id, min, max, type) =>
      dispatch(POSTJOBS.moonerFilter(child_id, min, max, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(moonerListsScreen);
const moonerListStyle = StyleSheet.create({
  postJobBtn: {
    backgroundColor: '#333333',
    width: WP('30'),
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    position: 'absolute',
    bottom: '2%',
    right: '10%',
  },
  postjobTxt: {
    color: colors.white,

    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
  },
});
