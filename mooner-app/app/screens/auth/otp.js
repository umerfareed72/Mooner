import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import otpStyles from '../../styles/otpStyles';
import appStyles from '../../styles/appStyles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {
  userPhoneOTP,
  userPhoneLogin,
  resetSuccess,
} from '../../redux/actions/index';
import Colors from '../../assets/colors';
import Indicator from '../../components/Indicator';

class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: 'none',
      dig1: '',
      dig2: '',
      dig3: '',
      dig4: '',
    };
  }

  // autoSubmit = (fourthDig) => {

  //   if (this.state.dig4 != '') {
  //     this.verifyOtpRequest();
  //   }
  // };

  resendOtpRequest = () => {
    const data = {
      cell_phone: this.props.auth.userInfo.cell_phone,
    };
    this.props.userPhoneLogin(data);
  };

  verifyOtpRequest = () => {
    const {dig1, dig2, dig3, dig4} = this.state;
    const otp = dig1 + dig2 + dig3 + dig4;

    const data = {
      otp: otp,
      user_id: this.props.auth.userInfo.user_id,
    };
    this.props.userPhoneOTP(data);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.auth.otpVerified &&
      !this.props.auth.reset &&
      this.props.auth.success
    ) {
      if (prevProps.route.params.source == 'forgot_pass') {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'resetPassword'}],
          }),
        );
      } else {
        this.props.navigation.replace('signinSuccessMessage', {
          userInfo: this.props.auth.userInfo,
        });
      }
    }
  }

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={true}
              showSkipButton={true}
              backButtonColor={'default'}
            />
            <View style={appStyles.bodyContainer}>
              <Image style={otpStyles.welcomeImageAuth} source={images.otp} />
              <View>
                <View style={[appStyles.mt20]}>
                  <Text
                    style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                    Enter Your OTP
                  </Text>
                  <Text style={appStyles.h2Auth}>
                    Please enter 4 digit code send to{'\n'}
                    {this.props.auth.userInfo.cell_phone}
                  </Text>
                </View>
              </View>

              <View style={[otpStyles.otpContainer]}>
                <TextInput
                  style={otpStyles.otpBox}
                  maxLength={1}
                  autoFocus={this.state.dig1 == '' ? true : false}
                  value={this.state.dig1}
                  keyboardType={'number-pad'}
                  textAlign={'center'}
                  placeholderTextColor={Colors.black}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  blurOnSubmit={false}
                  onChangeText={(text) => {
                    this.setState({dig1: text});
                    if (text.length == 1) {
                      this.secondTextInput.focus();
                    }
                  }}
                />
                <TextInput
                  style={otpStyles.otpBox}
                  maxLength={1}
                  value={this.state.dig2}
                  keyboardType={'number-pad'}
                  textAlign={'center'}
                  placeholderTextColor={Colors.black}
                  ref={(input) => {
                    this.secondTextInput = input;
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.thirdTextInput.focus();
                  }}
                  blurOnSubmit={false}
                  onChangeText={(text) => {
                    this.setState({dig2: text});
                    if (text.length == 1) {
                      this.thirdTextInput.focus();
                    }
                  }}
                />
                <TextInput
                  style={otpStyles.otpBox}
                  maxLength={1}
                  value={this.state.dig3}
                  keyboardType={'number-pad'}
                  textAlign={'center'}
                  placeholderTextColor={Colors.black}
                  ref={(input) => {
                    this.thirdTextInput = input;
                  }}
                  onChangeText={(text) => {
                    this.setState({dig3: text});
                    if (text.length == 1) {
                      this.fourthTextInput.focus();
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.fourthTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <TextInput
                  style={otpStyles.otpBox}
                  maxLength={1}
                  value={this.state.dig4}
                  keyboardType={'number-pad'}
                  textAlign={'center'}
                  returnKeyType="done"
                  ref={(input) => {
                    this.fourthTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.verifyOtpRequest();
                  }}
                  onChangeText={(text) => this.setState({dig4: text})}
                  placeholderTextColor={Colors.black}
                />
              </View>

              <View style={appStyles.mt30}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack(null)}>
                  <Text style={appStyles.linkText}>Re-Enter phone number</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.resendOtpRequest()}>
                  <Text style={appStyles.linkText}>Resend code</Text>
                </TouchableOpacity>
              </View>
              {!this.props.auth.loading ? (
                <TouchableOpacity
                  style={[appStyles.rightContainer, appStyles.mt20]}
                  onPress={() => this.verifyOtpRequest()}>
                  <Image
                    style={[appStyles.icon30]}
                    source={images.rightArrow}
                  />
                </TouchableOpacity>
              ) : (
                <Indicator></Indicator>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    userPhoneOTP: (data) => dispatch(userPhoneOTP(data)),
    userPhoneLogin: (data) => dispatch(userPhoneLogin(data)),
    resetSuccess: (data) => dispatch(resetSuccess(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
