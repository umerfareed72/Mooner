import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import otpStyles from '../../styles/otpStyles';
import appStyles from '../../styles/appStyles';
import Colors from '../../assets/colors';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SuccessMessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    try {
      await AsyncStorage.setItem(
        'Access_Token',
        this.props.auth.userInfo.access,
      );
      await AsyncStorage.setItem(
        'User_Info',
        JSON.stringify(this.props.auth.userInfo.user),
      );
    } catch (e) {}
    setTimeout(
      () =>
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'active'}],
          }),
        ),
      2000,
    );
  };

  render = () => {
    return (
      <SafeAreaView style={[appStyles.body]}>
        <AuthHeader
          navigation={this.props.navigation}
          showBackButton={true}
          showSkipButton={false}
          backButtonColor={'custom'}
        />
        <ImageBackground
          source={images.successBackground}
          imageStyle={{resizeMode: 'cover'}}
          style={[appStyles.bodyContainer, {marginTop: '-50%'}]}>
          <Image
            style={[otpStyles.welcomeImageAuth, {marginTop: 140}]}
            source={images.successAvatar}
          />
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={[appStyles.mt10]}>
              <Text style={[appStyles.h1Auth, {color: Colors.defaultRed}]}>
                Sign Up Successful
              </Text>
              <Text
                style={[
                  appStyles.h2Auth,

                  {
                    color: Colors.defaultPurple,
                    fontFamily: 'Gilroy-Medium',
                    marginTop: 30,
                  },
                ]}>
                Congratulations!
              </Text>

              <Text
                style={[
                  appStyles.h0Auth,
                  {color: Colors.black, marginTop: 40},
                ]}>
                Happy Mooning!
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[appStyles.rightContainer, {marginBottom: 30}]}
            onPress={() => this.props.navigation.replace('active')}>
            <Image style={[appStyles.icon30]} source={images.rightArrow} />
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(SuccessMessageScreen);
