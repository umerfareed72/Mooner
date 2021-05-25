import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import Indicator from '../../components/Indicator';
import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import loginStyle from '../../styles/loginStyle';
import appStyles from '../../styles/appStyles';
import {Item, Input, CheckBox} from 'native-base';
import colors from '../../assets/colors';
import {validateEmail, validatePassword} from '../../Validation/formValidation';
import {post} from '../../services';
import {connect} from 'react-redux';
import {userEmailLogin} from '../../redux/actions/index';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  PASSWORD_ERROR_MESSAGES,
  REG_PATTERN_PASSWORD,
} from '../../utilities/constant';
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass_eye: true,
      checkvalue: false,
      tick: images.rectangle,
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

  checkvalue = () => {
    if (this.state.checkvalue === false) {
      this.setState({checkvalue: true, tick: images.rectanglet});
    } else {
      this.setState({checkvalue: false, tick: images.rectangle});
    }
  };

  submitLoginRequest = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    this.props.userEmailLogin(data);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.auth.success &&
      !this.props.auth.reset &&
      this.props.auth.loginEmail
    ) {
      this.props.navigation.replace('signinSuccessMessage', {
        userInfo: this.props.auth.userInfo,
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
              showSkipButton={true}
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
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {
                  this.submitLoginRequest(values);
                }}
                validationSchema={yup.object().shape({
                  email: yup.string().email().required(),
                  password: yup
                    .string()
                    .min(8)
                    .required()
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
                            returnKeyType="next"
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
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
                      <View style={[appStyles.row, appStyles.mt10]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.lock}
                            style={[appStyles.Icon15Auth]}></Image>
                        </View>
                        <Text style={loginStyle.text14mediumAuth}>
                          Password
                        </Text>
                      </View>
                      <View style={appStyles.mt10}>
                        <Item style={{borderBottomWidth: 0}}>
                          <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={colors.defaultBlack}
                            secureTextEntry={this.state.pass_eye}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            returnKeyType="done"
                            ref={(input) => {
                              this.secondTextInput = input;
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={handleSubmit}
                            style={loginStyle.loginInputIcon}></TextInput>
                          <TouchableOpacity
                            onPress={this.pass_eye_fun}
                            style={appStyles.eyeIcon}>
                            <Image
                              source={images.eye}
                              style={[appStyles.Icon24Auth]}></Image>
                          </TouchableOpacity>
                        </Item>
                        {touched.password && errors.password && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.password}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View
                        style={[
                          appStyles.rowAlign,
                          appStyles.mt20,
                          appStyles.aiCenter,
                        ]}>
                        <TouchableOpacity
                          style={[appStyles.row]}
                          onPress={this.checkvalue}>
                          <Image
                            source={this.state.tick}
                            style={{
                              height: 12,
                              width: 12,
                              left: 3,
                              resizeMode: 'contain',
                            }}></Image>
                          <View style={{marginLeft: 15}}>
                            <Text style={loginStyle.text10smallAuth}>
                              Remember me
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('forgotPassword')
                          }>
                          <Text
                            style={[
                              loginStyle.text10smallAuth,
                              {textDecorationLine: 'underline'},
                            ]}>
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={appStyles.mv10}>
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
                          onPress={handleSubmit}
                          disabled={!isValid}
                          style={[loginStyle.loginrightContainer]}>
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
    userEmailLogin: (data) => dispatch(userEmailLogin(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(login);
