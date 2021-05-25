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
import {
  updateQuestions,
  getAlphaChildServices,
  getCurrentQuestions,
  updateCurrentChild,
} from '../../redux/actions';
import Toast from 'react-native-tiny-toast';
class spAlphaChildCategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  getChild = (item) => {
    var body = new FormData();
    body.append('tn_parent', item.id);

    axios
      .get(baseURL + SP + 'get_sp_categories/', {
        headers: {
          Authorization: `Bearer ${this.props.auth.userInfo.access}`,
        },
        params: {
          sub_category_id: item.id,
        },
      })
      .then(async (res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            Toast.show('Coming soon', {
              position: Toast.position.TOP,
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
        console.error('Get SP Child Result Error: ', error);
      });
  };

  getQuestions = (item) => {
    this.props.getCurrentQuestions(item.id);
    this.props.navigation.navigate('spServiceQuestions', {
      parent_id: this.props.route.params.alpha_parent_id,
    });
  };

  renderCategories = () => {
    return (
      <FlatList
        data={this?.props?.auth?.getAlphaChild?.data}
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

  render = () => {
    console.log(this?.props?.auth?.getAlphaChild?.data);
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
              <View
                style={[serviceStyles.childContainerRow, {flexWrap: 'wrap'}]}>
                {this.renderCategories()}
              </View>
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
  mapStateToProps,
)(spAlphaChildCategoriesScreen);
