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
  Easing,
  TouchableOpacity,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  TextInput,
} from 'react-native';
import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import RNPickerSelect from 'react-native-picker-select';
import {Item, Input, Icon, Radio} from 'native-base';
import appStyles from '../../styles/appStyles';
import signupStyles from '../../styles/signupStyles';
import colors from '../../assets/colors';
import {validateFullName, validatePhone} from '../../Validation/formValidation';
import {connect} from 'react-redux';
import {userSignup} from '../../redux/actions/index';
import {RadioButton} from 'react-native-paper';
import {
  PHONE_NO_LENGTH_PAKISTAN,
  PHONE_NO_LENGTH_SINGAPORE,
  DIGITS,
  DIGIT_MESSAGE,
  ACCOUNT_CONST,
} from '../../utilities/constant';
import CountryPicker from 'react-native-country-picker-modal';
import * as yup from 'yup';
import {Formik} from 'formik';
import Indicator from '../../components/Indicator';
import {post} from '../../services';

class signupPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      code: '',
      phoneCode: '65',
      error: '',
      check: false,
      showinput: 'none',
      image: images.radioinactive,
      image1: images.radioinactive,
      status: false,
      cca2: 'SG',
      country: null,
      loading: false,
    };
  }

  registerUser = async (values) => {
    const {phoneCode, status} = this.state;
    const phones = '+' + phoneCode + values.phone;

    const data = {
      username: values.fullname,
      cell_phone: phones,
      r_code: values.referralcode,
      login_type: 'local',
    };
    try {
      this.setState({loading: true});
      const response = await post(ACCOUNT_CONST + 'signup/', data);
      if (response.data.status === true) {
        this.props.navigation.navigate('verifyPhone', {
          userInfo: data,
        });
        this.setState({loading: false});
      } else {
        this.setState({loading: false});
        Alert.alert(
          'Error',
          response.data.message,
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  render = () => {
    const {auth} = this.props;
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={true}
              showSkipButton={true}
              backButtonColor={'default'}
            />
            <View style={[signupStyles.signupbodyContainer]}>
              <View>
                <Image
                  style={[signupStyles.signupImageAuth]}
                  source={images.signupAvatar}></Image>
              </View>
              <View style={[appStyles.mt30]}>
                <Text style={[appStyles.h1Auth]}>Welcome!</Text>
              </View>
              <View style={[appStyles.mt10]}>
                <Text style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                  Sign Up
                </Text>
              </View>

              <Formik
                initialValues={{fullname: '', phone: '', referralcode: ''}}
                onSubmit={(values) => {
                  this.registerUser(values);
                }}
                validationSchema={yup.object().shape({
                  fullname: yup.string().required(),
                  phone: yup.string().required().matches(DIGITS, DIGIT_MESSAGE),
                  referralcode: yup
                    .string()
                    .optional()
                    .matches(DIGITS, DIGIT_MESSAGE),
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
                      <View style={[appStyles.row, appStyles.aiCenter]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.person}
                            style={[
                              signupStyles.Icon10Auth,
                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={signupStyles.text14mediumAuth}>
                          Full Name
                        </Text>
                      </View>

                      <View style={appStyles.mt10}>
                        <Item style={{borderBottomWidth: 0}}>
                          <TextInput
                            returnKeyType="next"
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
                            blurOnSubmit={false}
                            value={values.fullname}
                            onChangeText={handleChange('fullname')}
                            onBlur={() => setFieldTouched('fullname')}
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
                            placeholder="Enter your full name"
                            placeholderTextColor={colors.defaultBlack}
                            style={signupStyles.loginInputIcon}></TextInput>
                        </Item>
                      </View>

                      {touched.fullname && errors.fullname && (
                        <View style={appStyles.mt10}>
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {color: colors.red},
                            ]}>
                            {errors.fullname}
                          </Text>
                        </View>
                      )}

                      <View
                        style={[
                          appStyles.row,
                          appStyles.mt20,
                          appStyles.aiCenter,
                        ]}>
                        <View style={[appStyles.pr10]}>
                          <Image
                            source={images.phone}
                            style={[
                              signupStyles.Icon10Auth,

                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={signupStyles.text14mediumAuth}>Phone</Text>
                      </View>

                      <View
                        style={[
                          signupStyles.loginInputIcon,
                          appStyles.mv10,
                          appStyles.row,
                          appStyles.aiCenter,
                        ]}>
                        {/* <Image
                    style={[signupStyles.pickerStyleImage]}
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

                        <TextInput
                          keyboardType={'phone-pad'}
                          returnKeyType="done"
                          ref={(input) => {
                            this.secondTextInput = input;
                          }}
                          value={values.phone}
                          onChangeText={handleChange('phone')}
                          onBlur={() => setFieldTouched('phone')}
                          blurOnSubmit={false}
                          onSubmitEditing={handleSubmit}
                          maxLength={
                            this.state.phoneCode == 65
                              ? PHONE_NO_LENGTH_SINGAPORE
                              : PHONE_NO_LENGTH_PAKISTAN
                          }
                          placeholder="Enter your phone number"
                          placeholderTextColor={colors.defaultBlack}
                          style={[
                            appStyles.pickerinput,
                            appStyles.widthinputAuth,
                          ]}></TextInput>
                      </View>

                      {touched.phone && errors.phone && (
                        <View style={appStyles.mt10}>
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {color: colors.red},
                            ]}>
                            {errors.phone}
                          </Text>
                        </View>
                      )}

                      <View
                        style={[
                          appStyles.row,
                          appStyles.mt20,
                          appStyles.aiCenter,
                        ]}>
                        <View style={[appStyles.pr10]}>
                          <Image
                            source={images.user}
                            style={[
                              signupStyles.Icon10Auth,

                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={signupStyles.text14mediumAuth}>
                          Have a referral code?
                        </Text>
                      </View>

                      <View style={[appStyles.row, appStyles.mt20]}>
                        <View
                          style={[
                            appStyles.row,
                            appStyles.aiCenter,
                            appStyles.pr10,
                          ]}>
                          {/* <View style={appStyles.row}> */}
                          <RadioButton
                            value={this.state.check}
                            status={this.state.check ? 'checked' : 'unchecked'}
                            color={colors.defaultYellow}
                            uncheckedColor={colors.defaultYellow}
                            onPress={() =>
                              this.setState({check: !this.state.check})
                            }
                          />
                          <Text style={[signupStyles.text12smallAuth]}>
                            Yes
                          </Text>
                          {/* </View> */}
                        </View>
                        <View
                          style={[
                            appStyles.row,
                            appStyles.aiCenter,
                            {paddingLeft: 10},
                          ]}>
                          {/* <View style={[appStyles.row]}> */}
                          <RadioButton
                            value={this.state.check}
                            status={!this.state.check ? 'checked' : 'unchecked'}
                            color={colors.defaultYellow}
                            uncheckedColor={colors.defaultYellow}
                            onPress={() =>
                              this.setState({check: !this.state.check})
                            }
                            style={{
                              height: 12,
                            }}
                          />
                          <Text style={[signupStyles.text12smallAuth]}>No</Text>
                          {/* </View> */}
                        </View>
                      </View>
                      {this.state.check ? (
                        <View style={[appStyles.mt20]}>
                          <Item style={{borderBottomWidth: 0}}>
                            <TextInput
                              onSubmitEditing={handleSubmit}
                              value={values.referralcode}
                              onChangeText={handleChange('referralcode')}
                              onBlur={() => setFieldTouched('referralcode')}
                              placeholder="Enter referral code"
                              placeholderTextColor={colors.defaultBlack}
                              style={[signupStyles.loginInputIcon]}></TextInput>
                          </Item>
                        </View>
                      ) : (
                        <View></View>
                      )}

                      {touched.referralcode && errors.referralcode && (
                        <View style={appStyles.mt10}>
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {color: colors.red},
                            ]}>
                            {errors.referralcode}
                          </Text>
                        </View>
                      )}
                      {!this.state.loading ? (
                        <TouchableOpacity
                          onPress={handleSubmit}
                          disabled={!isValid}
                          style={[
                            appStyles.aiflexEnd,
                            appStyles.mt40,
                            appStyles.mv20,
                          ]}>
                          <Image
                            style={[appStyles.icon30]}
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
    userSignup: (signupData) => dispatch(userSignup(signupData)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(signupPrimary);
