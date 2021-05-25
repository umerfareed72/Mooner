import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Easing,
  TouchableOpacity,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {validatePhone} from '../../Validation/formValidation';
import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import loginStyle from '../../styles/loginStyle';
import appStyles from '../../styles/appStyles';
import {Item, Input, CheckBox, Icon, Picker} from 'native-base';
import colors from '../../assets/colors';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {userPhoneLogin, resetSuccess} from '../../redux/actions/index';
import {reset_success} from '../../redux/actions/type';
import {
  PHONE_NO_LENGTH_PAKISTAN,
  PHONE_NO_LENGTH_SINGAPORE,
  DIGIT_MESSAGE,
  DIGITS,
} from '../../utilities/constant';
import CountryPicker from 'react-native-country-picker-modal';
import * as yup from 'yup';
import {Formik} from 'formik';
import Indicator from '../../components/Indicator';
class verifyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      error: '',
      code: '',
      selected: 'hello',
      phoneCode: '65',
      cca2: 'SG',
      country: null,
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  submitLoginRequest = (values) => {
    const {email, phoneCode} = this.state;
    const phones = '+' + phoneCode + values.phone;
    const data = {
      cell_phone: phones,
    };

    this.props.userPhoneLogin(data);
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.phoneVerified && this.props.auth.success) {
      this.props.resetSuccess();
      this.props.navigation.navigate('otp', {
        userInfo: this.props.auth.userInfo,
        source: 'login',
      });
    }
  }

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={true}
              showSkipButton={false}
              backButtonColor={'default'}
            />
            <View style={[loginStyle.loginbodyContainer]}>
              <View>
                <Image
                  style={[loginStyle.loginImageAuth]}
                  source={images.ylMan}></Image>
              </View>
              <View style={[appStyles.mt30]}>
                <Text style={[appStyles.h1Auth]}>Welcome Back! </Text>
              </View>
              <View style={[appStyles.mt10]}>
                <Text style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                  Sign In{' '}
                </Text>
              </View>

              <Formik
                initialValues={{phone: ''}}
                onSubmit={(values) => {
                  this.submitLoginRequest(values);
                }}
                validationSchema={yup.object().shape({
                  phone: yup.string().required().matches(DIGITS, DIGIT_MESSAGE),
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
                    <View style={[appStyles.mt30]}>
                      <View style={[appStyles.row, appStyles.mt10]}>
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
                        {/* <Image
                    style={[loginStyle.pickerStyleImage]}
                    source={images.singapore}></Image> */}
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

                        <Input
                          keyboardType={'phone-pad'}
                          maxLength={
                            this.state.phoneCode == 65
                              ? PHONE_NO_LENGTH_SINGAPORE
                              : PHONE_NO_LENGTH_PAKISTAN
                          }
                          placeholder="Enter your phone number"
                          returnKeyType="done"
                          placeholderTextColor={colors.defaultBlack}
                          value={values.phone}
                          onChangeText={handleChange('phone')}
                          onBlur={() => setFieldTouched('phone')}
                          onSubmitEditing={handleSubmit}
                          style={[
                            appStyles.pickerinput,
                            appStyles.widthinputAuth,
                          ]}></Input>
                      </View>

                      {touched.phone && errors.phone && (
                        <View style={appStyles.mt10}>
                          <Text style={[loginStyle.text12smallAuth]}>
                            {errors.phone}
                          </Text>
                        </View>
                      )}

                      <TouchableOpacity style={appStyles.mt30}>
                        <Text style={[loginStyle.text12smallAuth]}>
                          <Text
                            style={[
                              loginStyle.text12smallAuth,
                              {fontWeight: 'bold'},
                            ]}></Text>
                        </Text>
                      </TouchableOpacity>
                      {!this.props.auth.loading ? (
                        <TouchableOpacity
                          disabled={!isValid}
                          onPress={handleSubmit}
                          style={[
                            loginStyle.loginrightContainer,
                            loginStyle.loginrightAbsoluteContainer,
                            appStyles.mt30,
                          ]}>
                          <Image
                            style={[loginStyle.icon30]}
                            source={images.rightArrow}></Image>
                        </TouchableOpacity>
                      ) : (
                        <Indicator></Indicator>
                      )}
                    </View>
                  </Fragment>
                )}
              </Formik>
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
    userPhoneLogin: (data) => dispatch(userPhoneLogin(data)),
    resetSuccess: (data) => dispatch(resetSuccess(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(verifyLogin);
