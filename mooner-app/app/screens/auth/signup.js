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
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import {
  ACCOUNT_CONST,
  DIGITS,
  DIGIT_MESSAGE,
  PHONE_NO_LENGTH_PAKISTAN,
  PHONE_NO_LENGTH_SINGAPORE,
} from '../../utilities/constant';
import CountryPicker from 'react-native-country-picker-modal';
import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import signupStyles from '../../styles/signupStyles';
import appStyles from '../../styles/appStyles';
import {Item, Input, CheckBox, Icon} from 'native-base';
import colors from '../../assets/colors';
import {validatePhone} from '../../Validation/formValidation';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {userSignup} from '../../redux/actions/index';
import * as yup from 'yup';
import {Formik} from 'formik';
import Indicator from '../../components/Indicator';
import {post} from '../../services';

class verifySignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      error: '',
      phoneCode: '65',
      cca2: 'SG',
      country: null,
      loading: false,
    };
  }

  componentDidMount = () => {
    // let code = this.props.auth.userInfo.cell_phone.substring(0, 3);
    // this.setState({
    //   phoneCode: code,
    //   phone: this.props.auth.userInfo.cell_phone,
    // });
  };

  updatePhone = async (values) => {
    const {phoneCode} = this.state;
    const phones = '+' + phoneCode + values.phone;
    const data = {
      username: this?.props?.route?.params?.userInfo?.username,
      cell_phone: phones,
      r_code: '',
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
    console.log(this?.props?.route?.params?.userInfo);
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          style={{flex: 1}}
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
                <Text style={[appStyles.h1Auth]}>Welcome </Text>
              </View>
              <View style={[appStyles.mt10]}>
                <Text style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                  Sign Up{' '}
                </Text>
              </View>

              <Formik
                initialValues={{phone: ''}}
                onSubmit={(values) => {
                  this.updatePhone(values);
                }}
                validationSchema={yup.object().shape({
                  phone: yup
                    .string()

                    .required()
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
                      <View style={[appStyles.row, appStyles.mt10]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.phone}
                            style={[
                              appStyles.Icon15Auth,
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
                          returnKeyType="done"
                          onSubmitEditing={handleSubmit}
                          keyboardType={'phone-pad'}
                          maxLength={
                            this.state.phoneCode == 65
                              ? PHONE_NO_LENGTH_SINGAPORE
                              : PHONE_NO_LENGTH_PAKISTAN
                          }
                          value={values.phone}
                          onChangeText={handleChange('phone')}
                          onBlur={() => setFieldTouched('phone')}
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
                      <TouchableOpacity style={appStyles.mt30}>
                        <Text style={[signupStyles.text12smallAuth]}>
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {fontWeight: 'bold'},
                            ]}></Text>
                        </Text>
                      </TouchableOpacity>
                      {!this.state.loading ? (
                        <TouchableOpacity
                          disabled={!isValid}
                          onPress={handleSubmit}
                          style={[appStyles.aiflexEnd, appStyles.mt40]}>
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
export default connect(mapStateToProps, mapDispatchToProps)(verifySignup);
