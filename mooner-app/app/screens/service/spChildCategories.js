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

const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import appStyles from '../../styles/appStyles';

import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import {connect} from 'react-redux';
import axios from 'axios';
import {imagesURL, baseURL, SP, spImagesURL} from '../../utilities/constant';
import Toast from 'react-native-tiny-toast';
import {
  updateQuestions,
  getAlphaChildServices,
  getCurrentQuestions,
  updateCurrentChild,
} from '../../redux/actions';
import Indicator from '../../components/Indicator';
class spChildCategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

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
      this.props.getCurrentQuestions(item.id);
      this.props.navigation.navigate('spServiceQuestions', {
        parent_id: this.props.route.params.parent_id,
      });
    }
  };
  renderCategories = () =>
    this.props?.auth?.getChildServices?.map((item) => (
      <>
        <TouchableOpacity
          key={item.id.toString()}
          style={[
            serviceStyles.childContainer,
            {
              backgroundColor: item.registered
                ? colors.lightPink
                : colors.halfWhite,
            },
          ]}
          onPress={() => {
            {
              item.registered
                ? Toast.show('You are already registered for this service', {
                    position: Toast.position.TOP,
                  })
                : this.getChild(item);
            }
          }}>
          {item.registered ? (
            <View style={serviceStyles.activeCircle}></View>
          ) : (
            false
          )}
          <Image
            source={{uri: spImagesURL + '/' + item.category_image}}
            style={appStyles.weirdImageFrame}
          />
          <Text style={[appStyles.semiBoldBodyText, appStyles.mt20]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </>
    ));

  render = () => {
    console.log(this.props?.auth?.getChildServices);
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.mt20,
              appStyles.pb30,
              {
                paddingHorizontal: 30,
                height: '100%',
              },
            ]}>
            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontBold, appStyles.font24]}>
                Add New Service
              </Text>
              <Text style={[appStyles.fontBold, appStyles.font24]}>
                <Text style={{color: colors.defaultPurple}}>2</Text>/4
              </Text>
            </View>

            <Image
              style={[serviceStyles.signupImageAuth, appStyles.mt20]}
              source={images.spCategoriesBanner}
            />

            <Text
              style={[
                appStyles.font16,
                appStyles.mt20,
                {color: colors.defaultRed},
              ]}>
              Select Service Type
            </Text>
            <Text style={[appStyles.font13, {color: colors.defaultPurple}]}>
              This will help service seeker when they book your services.
            </Text>

            {/* Categories Section */}
            <View
              style={[
                homeStyles.mt30,
                {
                  width: '100%',
                },
              ]}>
              {!this.props.auth.loading ? (
                this.props.auth.getChildServices.length != 0 ? (
                  <View
                    style={[
                      serviceStyles.childContainerRow,
                      {flexWrap: 'wrap'},
                    ]}>
                    {this.renderCategories()}
                  </View>
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: colors.defaultRed,
                        textAlign: 'center',
                        fontSize: 16,
                        marginTop: 10,
                        fontWeight: 'bold',
                      }}>
                      'Sorry for the inconvenience! Seems like you are not
                      allowed to select this service'
                    </Text>
                  </View>
                )
              ) : (
                <Indicator></Indicator>
              )}
            </View>

            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('spServiceQuestions')
              }
              style={serviceStyles.purpleForwardButton}>
              <Image
                source={images.rightBlackArrow}
                style={serviceStyles.forwardButtonArrow}
              />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
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
    getAlphaChildServices: (data) => dispatch(getAlphaChildServices(data)),
    getCurrentQuestions: (data) => dispatch(getCurrentQuestions(data)),
    updateCurrentChild: (data) => dispatch(updateCurrentChild(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(spChildCategoriesScreen);
