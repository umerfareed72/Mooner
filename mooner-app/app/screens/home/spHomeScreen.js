import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import {
  getServiceCategories,
  searchServiceCategories,
} from '../../redux/actions/index';
import {connect} from 'react-redux';
import appStyles from '../../styles/appStyles';
import moment from 'moment';

import {
  getActiveServices,
  updateCurrentChild,
  getAlphaChildServices,
  getCurrentAnswers,
  getCurrentQuestions,
} from '../../redux/actions/index';
import SPServices from '../../components/spComponents/spServices';
import SPChangeStaus from '../../components/spComponents/spChangeStaus';
import {imagesURL} from '../../utilities/constant';
import {WP} from '../../utilities/responsive';
class spHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeJobsCount: 0,
      totalEarningCount: 0,
      activeBids: [],
      activeServices: [],
      showModal: false,
    };
  }

  componentDidMount = async () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getDashboardData();
      this.setState({showModal: true});
    });
  };

  getDashboardData = () => {
    const value = {
      Authorization: `Bearer ${this.props.auth.userInfo.access}`,
    };
    this.props.getActiveServices(value);
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  getChild = (item) => {
    const data = {
      token: this.props.auth.userInfo.access,
      id: item.id,
      category: item,
    };
    this.props.getAlphaChildServices(data);
    this.props.updateCurrentChild(item);
    if (this.props.auth.getAlphaChild.length > 0 && this.props.auth.success) {
      Toast.show('Coming soon', {
        position: Toast.position.TOP,
      });
    } else if (item.behaviour == 'Menu') {
      this.props.navigation.navigate('spMenu');
    } else {
      this.props.getCurrentAnswers(data);
      this.props.navigation.navigate('spshowAnswers', {
        service_id: item.service_id,
      });
    }
  };

  render = () => {
    // console.log('New', this.props.auth.getactiveServices.posted_jobs);
    // console.log(this.props.auth.userInfo);
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.mt20,
              appStyles.pb30,
              appStyles.ph30,
              {width: '100%'},
            ]}>
            <View style={appStyles.spStatsContainer}>
              <View
                style={[
                  appStyles.spStatsHalfContainer,
                  {
                    borderRightColor: 'black',
                    borderRightWidth: 0.5,
                  },
                ]}>
                <Text
                  style={[
                    appStyles.font24,
                    appStyles.fontSemiBold,
                    appStyles.fontCenter,
                  ]}>
                  {this?.props?.auth?.getactiveServices?.active_jobs}
                </Text>
                <Text
                  style={[
                    appStyles.font16,
                    appStyles.fontSemiBold,
                    appStyles.mt10,
                  ]}>
                  Active Jobs
                </Text>
              </View>
              <View style={appStyles.spStatsHalfContainer}>
                <Text
                  style={[
                    appStyles.font24,
                    appStyles.fontSemiBold,
                    appStyles.fontCenter,
                  ]}>
                  ${this?.props?.auth?.getactiveServices?.total_earnings}
                </Text>
                <Text
                  style={[
                    appStyles.font16,
                    appStyles.fontSemiBold,
                    appStyles.mt10,
                  ]}>
                  Total Earning
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('spAllCategories')}
              style={[appStyles.spAddItemContainer, appStyles.mt30]}>
              <Image
                source={images.addServiceImage}
                style={{width: '60%', resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontSemiBold, appStyles.font24]}>
                Posted Jobs
              </Text>
              <TouchableOpacity
                style={appStyles.buttonPill}
                onPress={() => this.props.navigation.navigate('allPostedJobs')}>
                <Text style={[appStyles.font13, appStyles.fontMedium]}>
                  view all jobs
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[appStyles.mt30, serviceStyles.childContainerRow]}>
              {this.props?.auth?.getactiveServices?.posted_jobs?.length > 0 ? (
                <FlatList
                  horizontal
                  data={this.props?.auth?.getactiveServices?.posted_jobs}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) =>
                    index <= 3 && (
                      <TouchableOpacity
                        style={[
                          serviceStyles.childContainer,
                          {
                            width: WP('45'),
                            height: WP('60'),
                            marginStart: WP('2'),
                            paddingVertical: WP('5'),
                          },
                        ]}
                        onPress={() => {
                          // console.log(item);
                          this.props.navigation.navigate('ssProfile', {
                            item,
                            jobpost: false,
                          });
                        }}>
                        <Image
                          source={{
                            uri: `${imagesURL}/media/${item?.category_image}`,
                          }}
                          style={[
                            {
                              height: '55%',
                              width: '80%',
                              borderTopLeftRadius: 80,
                              borderTopRightRadius: 80,
                              borderBottomLeftRadius: 120,
                              borderBottomRightRadius: 100,
                              // resizeMode: 'contain',
                            },
                          ]}
                        />
                        <Text
                          style={[appStyles.semiBoldBodyText, appStyles.mt20]}>
                          {item?.category_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: WP('3.5'),
                            marginVertical: WP('3'),
                          }}>
                          ${item?.budget}
                        </Text>
                        <Text style={{color: colors.activeGreen}}>
                          {moment(item?.schedule).format('MMM DD, YYYY')}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 16,
                    }}>
                    Not Found :(
                  </Text>
                </View>
              )}
            </View>
            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontSemiBold, appStyles.font24]}>
                Active Services
              </Text>
            </View>
            <View style={[appStyles.mt30]}>
              {this?.props?.auth?.getactiveServices?.active_services?.length >
              0 ? (
                <>
                  <FlatList
                    numColumns={2}
                    data={this?.props?.auth?.getactiveServices?.active_services}
                    renderItem={({item}) => (
                      <SPServices
                        onPress={() => {
                          this.getChild(item);
                        }}
                        catIcon={item.cat_icon}
                        categoryImage={item.category_image}
                        name={item.name}></SPServices>
                    )}
                    keyExtractor={(item) => item?.id?.toString()}
                  />

                  <TouchableOpacity
                    style={[
                      serviceStyles.childContainer,
                      {backgroundColor: colors.lightPink},
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate('spAllCategories')
                    }>
                    <Image
                      source={images.addCross}
                      style={[{width: 25, resizeMode: 'contain'}]}
                    />
                    <Text style={[appStyles.semiBoldBodyText]}>
                      Add New{'\n'}Service
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[
                    serviceStyles.childContainer,
                    {backgroundColor: colors.lightPink},
                  ]}
                  onPress={() =>
                    this.props.navigation.navigate('spAllCategories')
                  }>
                  <Image source={images.addCross} style={[appStyles.icon26]} />
                  <Text style={[appStyles.semiBoldBodyText]}>
                    Add New{'\n'}Service
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
        {!this.state.showModal && (
          <SPChangeStaus
            show={this.state.showModal}
            onPress={() => {
              this.setState({showModal: false});
            }}></SPChangeStaus>
        )}
        {/* <SPBidModal show={true}></SPBidModal> */}
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceCategories: (data) => dispatch(getServiceCategories(data)),
    searchServiceCategories: (data) => dispatch(searchServiceCategories(data)),
    getActiveServices: (data) => dispatch(getActiveServices(data)),
    getAlphaChildServices: (data) => dispatch(getAlphaChildServices(data)),
    getCurrentQuestions: (data) => dispatch(getCurrentQuestions(data)),
    updateCurrentChild: (data) => dispatch(updateCurrentChild(data)),
    getCurrentAnswers: (data) => dispatch(getCurrentAnswers(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(spHomeScreen);
