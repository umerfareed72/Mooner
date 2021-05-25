import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import otpStyles from '../../styles/otpStyles';
import appStyles from '../../styles/appStyles';
import Colors from '../../assets/colors';
import {ScrollView} from 'react-native-gesture-handler';
import modalStyles from '../../styles/modalStyles';
import {post} from '../../services';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {signupOtpVerification, userSignup} from '../../redux/actions/index';
import {handleRequest} from '../../Validation/formValidation';
import Indicator from '../../components/Indicator';
import {ACCOUNT_CONST} from '../../utilities/constant';
import {Alert} from 'react-native';
class verifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: 'none',
      dig1: '',
      dig2: '',
      dig3: '',
      dig4: '',
      error: '',
    };
  }

  otpVerified = () => {
    const {dig1, dig2, dig3, dig4} = this.state;
    const otp = dig1 + dig2 + dig3 + dig4;
    if (dig1 != '' && dig2 != '' && dig3 != '' && dig4 != '') {
      const data = {
        otp: otp,
        username: this?.props?.route?.params.userInfo.username,
        cell_phone: this?.props?.route?.params.userInfo.cell_phone,
        r_code: '',
        login_type: 'local',
      };
      this.props.userSignup(data);
    } else {
      Alert.alert(
        'Failed',
        'Kindly fill OTP',
        [{text: 'OK', onPress: () => console.log('OK')}],
        {cancelable: false},
      );
    }
  };
  resendOtp = async () => {
    const {dig1, dig2, dig3, dig4} = this.state;
    const otp = dig1 + dig2 + dig3 + dig4;
    const data = {
      username: this?.props?.route?.params?.userInfo.username,
      cell_phone: this?.props?.route?.params.userInfo.cell_phone,
      r_code: '',
      login_type: 'local',
    };
    try {
      const response = await post(ACCOUNT_CONST + 'signup/', data);
      if (response.data.status === true) {
        Alert.alert(
          'Success',
          response.data.message,
          [{text: 'OK', onPress: () => console.log('OK')}],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Error',
          response.data.message,
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  componentDidUpdate(prevProps) {
    if (!this.props.auth.loading && this.props.auth.success) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'signupSecondary'}],
        }),
      );
    }
  }

  // autoSubmit = (fourthDig) => {
  //   this.setState({dig4: fourthDig});
  //   if (this.state.dig4 != '') {
  //     this.otpVerified();
  //   }
  // };

  render = () => {
    // console.log(this?.props?.route?.params.userInfo);
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={true}
              showSkipButton={false}
              backButtonColor={'default'}
            />
            <View style={appStyles.bodyContainer}>
              <Image
                style={otpStyles.welcomeImageAuth}
                source={images.verifyPhone}
              />
              <View>
                <View style={[appStyles.mt20]}>
                  <Text
                    style={[appStyles.h1Auth, {color: Colors.defaultPurple}]}>
                    Enter Your OTP
                  </Text>
                  <Text style={appStyles.h2Auth}>
                    Please enter 4 digit code send to{'\n'}
                    {this?.props?.route?.params?.userInfo?.cell_phone}
                  </Text>
                </View>
              </View>

              <View style={[otpStyles.otpContainer]}>
                <TextInput
                  style={otpStyles.otpBox}
                  maxLength={1}
                  autoFocus={this.state.dig1 == '' ? true : false}
                  keyboardType={'number-pad'}
                  textAlign={'center'}
                  value={this.state.dig1}
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
                    this.otpVerified();
                  }}
                  onChangeText={(text) => this.setState({dig4: text})}
                  placeholderTextColor={Colors.black}
                />
              </View>

              <View style={appStyles.mt30}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('signup', {
                      userInfo: this?.props?.route?.params.userInfo,
                    })
                  }>
                  <Text style={appStyles.linkText}>Re-Enter phone number</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.resendOtp()}>
                  <Text style={appStyles.linkText}>Resend code</Text>
                </TouchableOpacity>
              </View>
              {!this.props.auth.loading ? (
                <TouchableOpacity
                  style={[
                    appStyles.rightContainer,
                    appStyles.mt20,
                    appStyles.mv10,
                  ]}
                  onPress={this.otpVerified}>
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
          {/* <View
            style={[
              modalStyles.modalContainer,
              {display: this.state.modalVisible},
            ]}>
            <View style={[appStyles.mv10]}>
              <Image
                style={modalStyles.modalImagesm}
                source={images.letter}></Image>
            </View>
            <View>
              <Text style={modalStyles.modalTextSemi}>Email Sent!</Text>
            </View>
            <View style={appStyles.mh40}>
              <Text style={[modalStyles.modalTextRegular]}>
                You’ll recieve an email from Mooner shortly with a link to reset
                your password
              </Text>
            </View>

            <TouchableOpacity
              style={modalStyles.modalbutton}
              onPress={() => this.props.navigation.navigate('signupSecondary')}>
              <Text style={modalStyles.modalText}>Continue login</Text>
            </TouchableOpacity>
          </View> */}
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
    signupOtpVerification: (data) => dispatch(signupOtpVerification(data)),
    userSignup: (signupData) => dispatch(userSignup(signupData)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(verifyPhone);
