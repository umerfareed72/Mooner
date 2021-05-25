import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  TextInput,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import {Item, Input, Icon, Radio, Form} from 'native-base';
import appStyles from '../../styles/appStyles';
import signupStyles from '../../styles/signupStyles';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {validateEmail, validatePassword} from '../../Validation/formValidation';
import {
  signupSecondaryRequest,
  updateUserInfo,
} from '../../redux/actions/index';
import axios from 'axios';
import {baseURLAuth} from '../../utilities/constant';
import {
  PASSWORD_ERROR_MESSAGES,
  REG_PATTERN_PASSWORD,
} from '../../utilities/constant';
import Indicator from '../../components/Indicator';
class signupSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkYes: false,
      checkNo: false,
      email: '',
      password: '',
      error: '',
      pass_eye: true,
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

  sendRequest = (value) => {
    const {email, password} = value;
    const data = {
      user_id: this?.props?.auth?.userInfo?.user_id,
      email: email,
      password: password,
      login_type: 'local',
    };

    axios
      .put(baseURLAuth + 'update_user_phone/', data, {
        headers: {
          Authorization: `Bearer ${this?.props?.auth?.userInfo?.access}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          this.props.updateUserInfo(res.data);
          this.props.navigation.replace('signupSuccessMessage');
        } else {
          Alert.alert(
            'Error',
            res.data.message,
            [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
            {cancelable: false},
          );
        }
      })
      .catch((error) => {
        console.error('+++++', error);
      });
  };

  render = () => {
    console.log(this?.props?.auth?.userInfo?.access);
    return (
      <SafeAreaView style={appStyles.body}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              navigation={this.props.navigation}
              showBackButton={false}
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
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {
                  this.sendRequest(values);
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
                      <View style={[appStyles.row, appStyles.aiCenter]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.email}
                            style={[
                              signupStyles.Icon10Auth,
                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={signupStyles.text14mediumAuth}>Email</Text>
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
                            style={signupStyles.loginInputIcon}></TextInput>
                        </Item>
                      </View>
                      {touched.email && errors.email && (
                        <View style={appStyles.mt10}>
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {color: colors.red},
                            ]}>
                            {errors.email}
                          </Text>
                        </View>
                      )}

                      <View
                        style={[
                          appStyles.row,
                          appStyles.aiCenter,
                          appStyles.mt20,
                        ]}>
                        <View style={appStyles.pr10}>
                          <Image
                            source={images.email}
                            style={[
                              signupStyles.Icon10Auth,
                              {tintColor: colors.defaultRed},
                            ]}></Image>
                        </View>
                        <Text style={signupStyles.text14mediumAuth}>
                          Password
                        </Text>
                      </View>

                      <View style={appStyles.mv10}>
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
                            style={signupStyles.loginInputIcon}></TextInput>

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
                          <Text
                            style={[
                              signupStyles.text12smallAuth,
                              {color: colors.red},
                            ]}>
                            {errors.password}
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity style={appStyles.mt10}>
                        <Text
                          style={[
                            signupStyles.textmediumAuth,
                            {textAlign: 'left'},
                          ]}>
                          <Text
                            onPress={() =>
                              this.props.navigation.navigate('login')
                            }
                            style={{fontFamily: 'Gilroy-Bold'}}>
                            {' '}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      {!this.props.auth.loading ? (
                        <TouchableOpacity
                          onPress={handleSubmit}
                          style={[
                            appStyles.aiflexEnd,
                            appStyles.mt40,
                            appStyles.mv10,
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
    signupSecondaryRequest: (data) => dispatch(signupSecondaryRequest(data)),
    updateUserInfo: (data) => dispatch(updateUserInfo(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(signupSecondary);
