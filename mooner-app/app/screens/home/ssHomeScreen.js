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
  TextInput,
  Platform,
} from 'react-native';
const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import colors from '../../assets/colors';
import {Item, Input} from 'native-base';
import ActiveHeader from '../../components/activeHeader';
import {
  getServiceCategories,
  searchServiceCategories,
} from '../../redux/actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {imagesURL, baseURL, vh, wh} from '../../utilities/constant';
import Geolocation from 'react-native-geolocation-service';
import Carousel from 'react-native-snap-carousel';
import modalStyles from '../../styles/modalStyles';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import AddressPopUp from '../../components/spComponents/addressPopUp';
import SSCarousalModal from '../../components/ssComponent/ssCarousalModal';
import RateService from '../../components/rateService';
import RateService2 from '../../components/rateService2';
import Toast from 'react-native-tiny-toast';
import Indicator from '../../components/Indicator';
const numbers = ['1%', '2%', '3%', '4%', '5%'];
class ssHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSearch: true,
      searchText: '',
      searchResult: [],
      latitude: '',
      index: 0,
      longitude: '',
      showLess: true,
      loading: false,
      banners: [
        {
          id: 1,
          image: images.homeBanner,
        },
        {
          id: 2,
          image: images.homeBanner,
        },
        {
          id: 3,
          image: images.homeBanner,
        },
        {
          id: 4,
          image: images.homeBanner,
        },
      ],
      locationText: '',
      showAddress: false,
      showInitialPopUp: false,
      cats: [],
      rating: 5,
      tips: {},
      description: '',
    };
  }

  getLocation = () => {
    // Geolocation.requestAuthorization('always');
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setTimeout(() => this.updateLocation(), 1000);
      },
      (error) => {
        const {code, message} = error;
        if (code == 'UNAVAILABLE') {
          Toast.show('Please turn on your Location', {
            position: Toast.position.TOP,
          });
        }
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  async componentDidMount() {
    // this.setState({showInitialPopUp: true});
    this.props.getServiceCategories();
    this.getLocation();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this?.props?.auth?.categories !== this.state.cats) {
      if (this?.state?.cats?.length == 0) {
        if (this?.props?.auth?.categories?.length > 8) {
          let categories = [...this?.props?.auth?.categories];
          categories.splice(8, 0, {
            name: 'See All',
            img: require('../../assets/images/downArrow.png'),
          });

          this.setState({cats: [...categories].slice(1, 9)});
        } else return;
      }
    }
  }

  renderCategories = () => {
    return (
      <FlatList
        data={
          this.state.showLess ? this.state.cats : this?.props?.auth?.categories
        }
        numColumns={4}
        style={homeStyles.mt20}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={{flex: 1 / 4, flexDirection: 'column', marginBottom: 10}}>
            <TouchableOpacity
              style={{
                height: vw / 5.55,
                width: vw / 5.55,
                borderRadius: 28,
                margin: 5,
                backgroundColor: '#FFF4CE',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (item?.img) {
                  this.setState({showLess: false});
                } else this.getChild(item);
              }}>
              <Image
                source={
                  item?.img
                    ? item?.img
                    : {
                        uri: imagesURL + item?.cat_icon,
                      }
                }
                style={{
                  height: item?.img ? 20 : 35,
                  width: item?.img ? 20 : 35,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 12,
                color: colors.defaultBlack,
                textAlign: 'center',
              }}>
              {item?.name}
            </Text>
          </View>
        )}
      />
    );
  };

  searchCategory = () => {
    var body = new FormData();
    body.append('name', this.state.searchText);

    axios
      .post(baseURL + 'category_management/searchcategory/', body)
      .then(async (res) => {
        if (res.data.status) {
          this.setState({
            searchResult: res.data.data,
          });
          this.props.navigation.navigate('FindCategory', {
            result: res.data.data,
          });
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch((error) => {
        console.error('Search Result Error: ', error);
      });
  };

  getChild = (item) => {
    this.setState({loading: true});
    var body = new FormData();
    body.append('tn_parent', item.id);
    axios
      .post(baseURL + 'category_management/get_childs/', body)
      .then(async (res) => {
        if (res.data.status) {
          if (res.data.data.length > 0) {
            console.log(item);
            this.setState({loading: false});
            this.props.navigation.navigate('ChildCategory', {
              parentCategory: item,
              childCategories: res.data.data,
            });
          } else {
            this.getQuestions(item);
          }
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch((error) => {
        console.error('Get Child Result Error: ', error);
      });
  };

  getQuestions = (item) => {
    var body = new FormData();
    body.append('sub_category', item.id);
    console.log(item.id);
    axios
      .post(baseURL + 'category_management/get_questions/', body)
      .then(async (res) => {
        console.log(item?.id);
        if (res.data.status) {
          if (res.data.data.length > 0) {
            this.props.navigation.navigate('ServiceQuestion', {
              questions: res.data.data,
              parentCategory: item,
              category: item,
              parentCategoryId: item.id,
            });
            this.setState({loading: false});
          } else {
            // this.props.navigation.navigate('MoonerList', {
            //   parentCategory: item,
            //   category: item,
            //   parentCategoryId: item.id,
            // });
            this.setState({loading: false});
            Toast.show('Coming Soon', {
              position: Toast.position.TOP,
            });
          }
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch((error) => {
        console.error('Get Questions Result Error: ', error);
      });
  };

  updateLocation = (data) => {
    if (this?.props?.auth?.userInfo.access == null) {
      Toast.show('Failed to get location', {
        position: Toast.position.TOP,
      });
    } else {
      var body = new FormData();
      body.append('user_id', this?.props?.auth?.userInfo?.user?.id);
      if (this?.state?.locationText == '') {
        body.append('latitude', this?.state?.latitude);
        body.append('longitude', this?.state?.longitude);
      } else {
        body.append('address_string', this?.state?.locationText);
      }
      this.locationRequest(body);
    }
  };

  locationRequest = (body) => {
    try {
      axios
        .post(baseURL + 'user_management/address/', body, {
          headers: {
            Authorization: `Bearer ${this?.props?.auth?.userInfo?.access}`,
          },
        })
        .then(async (res) => {
          if (res.data.status) {
            this.setState({
              latitude: res.data.data.latitude,
              longitude: res.data.data.longitude,
              locationText: res.data.data.address,
            });
          } else {
            this.setState({
              error: true,
            });
          }
        })
        .catch((error) => {
          console.error('Update Location Error: ', error);
          Alert.alert(
            'Location Update Failure!',
            'Location Not Found, Please enter a valid address.',
            [{text: 'Ok', onPress: () => console.log('Cancel')}],
            {cancelable: false},
          );
          this.setState({
            error: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  selectSlot = (item) => {
    this.setState({tips: item});
  };
  render = () => {
    // const horizontalMargin = 5;

    const sliderWidth = Dimensions.get('screen').width;
    const itemWidth = Dimensions.get('screen').width;
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search & Location */}
          <View style={homeStyles.searchBarContainer}>
            {this.state.openSearch ? (
              <Item
                style={[
                  homeStyles.searchItem,
                  {
                    width: this.state.openSearch ? '80%' : 56,
                  },
                ]}>
                <TouchableOpacity onPress={() => this.searchCategory()}>
                  <Image
                    source={images.searchIcon}
                    style={{height: 20, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <Input
                  placeholder={'Search'}
                  keyboardType={'default'}
                  onSubmitEditing={() => this.searchCategory()}
                  onChangeText={(text) => this.setState({searchText: text})}
                  returnKeyType={'done'}
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                    color: colors.defaultBlack,
                  }}
                />
              </Item>
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({openSearch: true})}
                style={[
                  homeStyles.searchButton,
                  {width: this.state.openSearch ? 56 : 56},
                ]}>
                <Image
                  source={images.searchIcon}
                  style={{height: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}

            {this.state.openSearch ? (
              <TouchableOpacity
                onPress={() => this.setState({openSearch: false})}
                style={homeStyles.searchButton}>
                <Image
                  source={images.locationIcon}
                  style={{height: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ) : (
              <Item
                style={[
                  homeStyles.searchItem,
                  {width: this.state.openSearch ? 56 : '80%'},
                ]}>
                <TouchableOpacity onPress={() => this.updateLocation()}>
                  <Image
                    source={images.locationIcon}
                    style={{height: 20, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                <Input
                  placeholder={'Location'}
                  value={this.state.locationText}
                  onSubmitEditing={() => this.updateLocation()}
                  onChangeText={(text) => this.setState({locationText: text})}
                  returnKeyType={'done'}
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                    color: colors.defaultBlack,
                  }}
                />
              </Item>
            )}
          </View>

          <Carousel
            data={this.state.banners}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            style={{paddingRight: 20}}
            layout={'default'}
            renderItem={({item, index}) => {
              return (
                <ImageBackground
                  source={images.homeBanner}
                  style={[
                    {
                      width: '100%',
                      // paddingHorizontal: 30,
                      height: WP('45%'),
                      // alignItems: 'center',
                      elevation: 5,
                      // borderWidth: 1,
                      // borderColor: 'transparent',
                      // marginHorizontal: 30,
                      // borderRadius: 24,
                    },
                  ]}
                  imageStyle={{
                    resizeMode: 'contain',
                  }}
                />
              );
            }}
          />
          {/* Categories Section */}
          <View
            style={[homeStyles.mt20, {width: '100%', paddingHorizontal: 30}]}>
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 20,
                color: colors.black,
              }}>
              Categories
            </Text>
            <View>
              {!this.state.loading ? (
                this.renderCategories()
              ) : (
                <View style={appStyles.mt30}>
                  <Indicator></Indicator>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {this.state.showInitialPopUp && (
          <SSCarousalModal
            show={this.state.showInitialPopUp}
            onPress={() => {
              this.setState({showInitialPopUp: false});
            }}></SSCarousalModal>
        )}
        {this.state.showAddress && (
          <AddressPopUp
            show={this.state.showAddress}
            onPress={() => {
              this.setState({showInitialPopUp: false, showAddress: false});
            }}
          />
        )}
        {/* <RateService
          setRating={(rat) => {
            this.setState({rating: rat});
          }}
          onPressSlot={(item) => this.selectSlot(item)}
          tips={this.state.tips}
          numbers={numbers}
          // onPress={() => {}}
          showModal={true}
          serviceSeeker={true}
          rating={this.state.rating}
          bgColor={colors.defaultRed}></RateService> */}
        {/* <RateService2
          setRating={(rat) => {
            this.setState({rating: rat});
          }}
          onChangeText={(text) => {
            this.setState({description: text});
          }}
          showModal={true}
          rating={this.state.rating}
          bgColor={colors.defaultRed}></RateService2> */}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ssHomeScreen);
