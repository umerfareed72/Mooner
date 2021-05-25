import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import loginStyle from '../../styles/loginStyle';
import appStyles from '../../styles/appStyles';
import {Item, Input, CheckBox, Icon} from 'native-base';
import colors from '../../assets/colors';
import {validateEmail, validatePhone} from '../../Validation/formValidation';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {forgotPassRequest, resetSuccess} from '../../redux/actions/index';
import modalStyles from '../../styles/modalStyles';
import {
  PHONE_NO_LENGTH_PAKISTAN,
  PHONE_NO_LENGTH_SINGAPORE,
  PHONE_NUMBER_ERROR_MESSAGES,
  DIGITS,
  DIGIT_MESSAGE,
} from '../../utilities/constant';
import * as yup from 'yup';
import {Formik} from 'formik';
import Indicator from '../../components/Indicator';
import {color} from 'react-native-reanimated';
import {CommonActions} from '@react-navigation/native';
class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      number: '',
      error: '',
      error1: '',
      phone: '',
      code: '',
      phoneCode: '65',
      showPopUp: false,
      cca2: 'SG',
      country: null,
    };
  }

  sendRequest = (values) => {
    const {phoneCode, phone} = this.state;
    this.setState({phone: values.phone});

    const phones = '+' + phoneCode + values.phone;
    const data = {
      email: values.email,
      cell_phone: phones,
    };
    if (values.phone != '' && values.email != '') {
      Alert.alert(
        'Error',
        'Only one field is required',
        [{text: 'Ok', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
    } else {
      this.props.forgotPassRequest(data);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.forgotPassVerified !== this.props.auth.forgotPassVerified
    ) {
      this.props.resetSuccess();
      //inner logic for phone and email
      if (this.state.phone != '') {
        this.props.navigation.navigate('otp', {
          userInfo: this.props.auth.userInfo,
          source: 'forgot_pass',
        });
      } else {
        this.setState({
          showPopUp: true,
        });
      }
    }
  }
  continueLogin = () => {};
  showEmailPopup = (handleSubmit) => {
    return (
      <View
        style={[modalStyles.modalContainer, {position: 'absolute', bottom: 0}]}>
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
            You’ll recieve an email from Mooner{'\n'}shortly with a link to
            reset your password
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              modalStyles.modalbutton,

              {
                marginRight: 10,
                borderWidth: 1,
                borderColor: colors.halfWhite,
                backgroundColor: colors.defaultRed,
              },
            ]}
            onPress={handleSubmit}>
            <Text style={(modalStyles.modalText, {color: colors.halfWhite})}>
              Resend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[modalStyles.modalbutton]}
            onPress={() =>
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'login'}],
                }),
              )
            }>
            <Text style={modalStyles.modalText}>Continue Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Formik
            initialValues={{email: '', phone: ''}}
            onSubmit={(values) => {
              this.sendRequest(values);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .when(['phone'], {
                  is: (phone) => !phone,
                  then: yup.string().required('At least one field required'),
                }),
              phone: yup.string().matches(DIGITS, DIGIT_MESSAGE),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <Fragment>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <AuthHeader
                    navigation={this.props.navigation}
                    showBackButton={true}
                    showSkipButton={true}
                    backButtonColor={'default'}
                  />
                  <View style={[loginStyle.resetbodyContainer]}>
                    <View>
                      <Image
                        style={[loginStyle.resetImageAuth]}
                        source={images.Tree}></Image>
                    </View>
                    <View style={[appStyles.mt30]}>
                      <Text style={[appStyles.h1Auth]}>Forgot Password? </Text>
                    </View>
                    <View style={[appStyles.mt10]}>
                      <Text
                        style={[
                          appStyles.h1Auth,
                          {color: colors.defaultPurple},
                        ]}>
                        Enter your credentials
                      </Text>
                    </View>

                    <View style={[appStyles.mt30]}>
                      <View style={appStyles.row}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.email}
                            style={[
                              appStyles.Icon15Auth,
                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={loginStyle.text14mediumAuth}>Email</Text>
                      </View>

                      <View style={appStyles.mt10}>
                        <Item style={{borderBottomWidth: 0}}>
                          <TextInput
                            placeholder="Enter your email"
                            placeholderTextColor={colors.defaultBlack}
                            keyboardType={'email-address'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                            blurOnSubmit={false}
                            style={loginStyle.loginInputIcon}></TextInput>
                        </Item>
                        {touched.email && errors.email && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.email}
                            </Text>
                          </View>
                        )}
                      </View>

                      <View style={[{marginVertical: 20}]}>
                        <Text
                          style={[
                            appStyles.h1Auth,
                            {
                              color: colors.defaultRed,
                              fontFamily: 'Gilroy-Medium',
                            },
                          ]}>
                          Or
                        </Text>
                      </View>

                      <View style={[appStyles.row]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.phone}
                            style={[
                              appStyles.Icon15Auth,
                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={loginStyle.text14mediumAuth}>Phone</Text>
                      </View>

                      <View
                        style={[
                          loginStyle.loginInputIcon,
                          appStyles.mv10,
                          appStyles.row,
                          appStyles.aiCenter,
                        ]}>
                        <CountryPicker
                          onSelect={(value) =>
                            this.setState({
                              country: value,
                              cca2: value.cca2,
                              phoneCode: value.callingCode,
                            })
                          }
                          cca2={this.state.cca2}
                          translation="eng"
                          withFlag={true}
                          withEmoji={true}
                          countryCode={this.state.cca2}
                        />
                        <TextInput
                          keyboardType={'phone-pad'}
                          returnKeyType="done"
                          placeholder="Enter your phone number"
                          onChangeText={handleChange('phone')}
                          maxLength={
                            this.state.phoneCode == 65
                              ? PHONE_NO_LENGTH_SINGAPORE
                              : PHONE_NO_LENGTH_PAKISTAN
                          }
                          placeholderTextColor={colors.defaultBlack}
                          value={values.phone}
                          onBlur={() => setFieldTouched('phone')}
                          returnKeyType="done"
                          onSubmitEditing={handleSubmit}
                          style={[
                            appStyles.pickerinput,
                            appStyles.widthinputAuth,
                          ]}></TextInput>
                      </View>

                      {touched.phone && errors.phone && (
                        <View style={appStyles.mt10}>
                          <Text style={[loginStyle.text12smallAuth]}>
                            {errors.phone}
                          </Text>
                        </View>
                      )}
                      {!this.props.auth.loading ? (
                        <TouchableOpacity
                          style={[
                            loginStyle.loginrightContainer,
                            {marginTop: 20},
                          ]}
                          disabled={!isValid}
                          onPress={handleSubmit}>
                          <Image
                            style={[loginStyle.icon30]}
                            source={images.rightArrow}></Image>
                        </TouchableOpacity>
                      ) : (
                        <Indicator></Indicator>
                      )}
                    </View>
                  </View>
                </ScrollView>
                {this.state.showPopUp == true &&
                  this.showEmailPopup(handleSubmit)}
              </Fragment>
            )}
          </Formik>
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
    forgotPassRequest: (data) => dispatch(forgotPassRequest(data)),
    resetSuccess: (data) => dispatch(resetSuccess(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(forgotPassword);
