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

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import loginStyle from '../../styles/loginStyle';
import appStyles from '../../styles/appStyles';
import {Item, Input, CheckBox} from 'native-base';
import colors from '../../assets/colors';
import modalStyles from '../../styles/modalStyles';
import {validatePassword} from '../../Validation/formValidation';
import {updatePasswordRequest, resetSuccess} from '../../redux/actions/index';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  PASSWORD_ERROR_MESSAGES,
  REG_PATTERN_PASSWORD,
} from '../../utilities/constant';
import Indicator from '../../components/Indicator';
class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      error: '',
      pass_eye: true,
      pass_eye1: true,
      modalvisible: 'none',
      passwordChecked: false,
    };
  }
  pass_eye_fun = () => {
    if (this.state.pass_eye == true) {
      this.setState({
        pass_eye: false,
      });
    } else {
      this.setState({
        pass_eye: true,
      });
    }
  };

  pass_eye_fun1 = () => {
    if (this.state.pass_eye1 == true) {
      this.setState({
        pass_eye1: false,
      });
    } else {
      this.setState({
        pass_eye1: true,
      });
    }
  };

  updatePassword = (values) => {
    const {password, confirmpassword} = values;

    const data = {
      user_id: this.props.auth.userInfo.user.id,
      new_password: password,
    };

    this.props.updatePasswordRequest(data);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.resetPassSuccess !== this.props.auth.resetPassSuccess &&
      this.props.auth.success &&
      this.props.auth.reset
    ) {
      this.props.resetSuccess();
      //inner logic for phone and email

      this.setState({modalvisible: 'flex'});
    }
  }

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={false}
              showSkipButton={false}
              backButtonColor={'default'}
            />
            <View style={[loginStyle.resetbodyContainer]}>
              <View>
                <Image
                  style={[loginStyle.resetImageAuth]}
                  source={images.Tree}></Image>
              </View>
              <View style={[appStyles.mt30]}>
                <Text style={[appStyles.h1Auth]}>Reset Password? </Text>
              </View>
              <Formik
                initialValues={{password: '', confirmpassword: ''}}
                onSubmit={(values) => {
                  this.updatePassword(values);
                }}
                validationSchema={yup.object().shape({
                  password: yup
                    .string()
                    .min(8)
                    .required()
                    .matches(REG_PATTERN_PASSWORD, PASSWORD_ERROR_MESSAGES),

                  confirmpassword: yup
                    .string()
                    .min(8, 'password must be at least 8 characters')
                    .required('password is a required field')
                    .matches(REG_PATTERN_PASSWORD, PASSWORD_ERROR_MESSAGES),
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
                      <View style={appStyles.row}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.lock}
                            style={[appStyles.Icon15Auth]}></Image>
                        </View>
                        <Text style={loginStyle.text14mediumAuth}>
                          New Password
                        </Text>
                      </View>

                      <View style={appStyles.mt10}>
                        <Item style={{borderBottomWidth: 0}}>
                          <TextInput
                            secureTextEntry={this.state.pass_eye}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.defaultBlack}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            blurOnSubmit={false}
                            style={loginStyle.loginInputIcon}></TextInput>
                          <TouchableOpacity
                            onPress={this.pass_eye_fun}
                            style={appStyles.eyeIcon}>
                            <Image
                              source={images.eye}
                              style={[appStyles.Icon24Auth]}></Image>
                          </TouchableOpacity>
                        </Item>
                      </View>
                      {touched.password && errors.password && (
                        <View style={appStyles.mt10}>
                          <Text style={[loginStyle.text12smallAuth]}>
                            {errors.password}
                          </Text>
                        </View>
                      )}
                      <View style={[appStyles.row, appStyles.mt20]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.lock}
                            style={[appStyles.Icon15Auth]}></Image>
                        </View>
                        <Text style={loginStyle.text14mediumAuth}>
                          Confirm Password
                        </Text>
                      </View>
                      <View style={appStyles.mv10}>
                        <Item style={{borderBottomWidth: 0}}>
                          <TextInput
                            returnKeyType="done"
                            ref={(input) => {
                              this.secondTextInput = input;
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={handleSubmit}
                            value={values.confirmpassword}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={() => setFieldTouched('confirmpassword')}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.defaultBlack}
                            secureTextEntry={this.state.pass_eye1}
                            style={loginStyle.loginInputIcon}></TextInput>
                          <TouchableOpacity
                            onPress={this.pass_eye_fun1}
                            style={appStyles.eyeIcon}>
                            <Image
                              source={images.eye}
                              style={[appStyles.Icon24Auth]}></Image>
                          </TouchableOpacity>
                        </Item>
                      </View>
                      {touched.confirmpassword && errors.confirmpassword && (
                        <View style={appStyles.mt10}>
                          <Text style={[loginStyle.text12smallAuth]}>
                            {errors.confirmpassword}
                          </Text>
                        </View>
                      )}
                      {!this.props.auth.loading ? (
                        <TouchableOpacity
                          style={[
                            loginStyle.loginrightContainer,
                            {marginTop: 20},
                          ]}
                          onPress={handleSubmit}>
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

          <View
            style={[
              modalStyles.modalContainer,
              {display: this.state.modalvisible},
            ]}>
            <View style={[appStyles.mv10]}>
              <Image
                style={modalStyles.modalImage}
                source={images.ballon}></Image>
            </View>
            <View>
              <Text style={modalStyles.modalTextSemi}>Congratulations!</Text>
            </View>
            <View>
              <Text style={modalStyles.modalTextRegular}>
                Password successfully reset!
              </Text>
            </View>

            <TouchableOpacity
              style={modalStyles.modalbutton}
              onPress={() =>
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'verifyLogin'}],
                  }),
                )
              }>
              <Text style={modalStyles.modalText}>Continue login</Text>
            </TouchableOpacity>
          </View>
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
    updatePasswordRequest: (data) => dispatch(updatePasswordRequest(data)),
    resetSuccess: (data) => dispatch(resetSuccess(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
