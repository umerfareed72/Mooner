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
import {imagesURL, baseURL, SP} from '../../utilities/constant';

import {
  getChildServices,
  updateCurrentChild,
  getCurrentQuestions,
} from '../../redux/actions/index';
import Indicator from '../../components/Indicator';
import Toast from 'react-native-tiny-toast';
class spAllCategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCategories = () => {
    return (
      <FlatList
        data={this.props.auth.categories}
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
              onPress={() => this.getChild(item)}>
              <Image
                source={{
                  uri: imagesURL + item.cat_icon,
                }}
                style={{height: 35, width: 35, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 12,
                color: colors.defaultBlack,
                textAlign: 'center',
              }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    );
  };
  getQuestions = (item) => {
    var body = new FormData();
    body.append('sub_category', item.id);
    axios
      .post(baseURL + 'category_management/get_questions/', body)
      .then(async (res) => {
        if (res.data.status) {
          if (res.data.data.length > 0) {
            dispatch(updateQuestions(res.data.data));
            this.props.navigation.navigate('spServiceQuestions', {
              parent_id: item?.id,
            });
          } else {
            Toast.show('Coming Soon', {
              position: Toast.position.TOP,
            });
          }
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Get Questions Result Error: ', error);
      });
  };

  getChild = (item) => {
    const data = {
      token: this.props.auth.userInfo.access,
      id: item.id,
      category: item,
    };
    this.props.getChildServices(data);
    if (this.props.auth.success) {
      this.props.navigation.navigate('spChildCategories', {parent_id: item.id});
    } else {
      this.getQuestions(item);
    }
  };

  render = () => {
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
                <Text style={{color: colors.defaultPurple}}>1</Text>/4
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
              Add Service Category
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
                  // paddingHorizontal: 30
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 20,
                  color: colors.black,
                }}>
                Categories
              </Text>
              {!this.props.auth.loading ? (
                <View>{this.renderCategories()}</View>
              ) : (
                <Indicator></Indicator>
              )}
            </View>
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
    getChildServices: (data) => dispatch(getChildServices(data)),
    getCurrentQuestions: (data) => dispatch(getCurrentQuestions(data)),
    // updateCurrentChild: (data) => dispatch(updateCurrentChild(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(spAllCategoriesScreen);
