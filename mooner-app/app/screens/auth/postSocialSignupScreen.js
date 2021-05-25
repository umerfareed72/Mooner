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
import * as yup from 'yup';
import {Formik} from 'formik';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import {Item, Input, Icon, Radio} from 'native-base';
import appStyles from '../../styles/appStyles';
import loginStyle from '../../styles/loginStyle';
import signupStyles from '../../styles/signupStyles';
import colors from '../../assets/colors';
import {validateFullName, validateEmail} from '../../Validation/formValidation';
import {connect} from 'react-redux';
import {userSignup, updateUserInfo} from '../../redux/actions/index';
import axios from 'axios';
import {baseURLAuth} from '../../utilities/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Indicator from '../../components/Indicator';

class postSocialSignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      code: '',
      phoneCode: '65',
      error: '',
      checkYes: false,
      checkNo: false,
      showinput: 'none',
      image: images.radioinactive,
      image1: images.radioinactive,
      status: true,
      loading: false,
    };
  }

  updateUser = (values) => {
    this.setState({loading: true});
    const {fullname, email} = values;
    const data = {
      full_name: fullname,
      email: email,
      user_id: this.props.auth.userInfo.user.id,
    };

    axios
      .put(baseURLAuth + 'update/', data, {
        headers: {
          Authorization: `Bearer ${this.props.auth.userInfo.access}`,
        },
      })
      .then(async (res) => {
        if (res.data.status) {
          this.props.updateUserInfo(res.data);
          try {
            await AsyncStorage.setItem(
              'User_Info',
              JSON.stringify(res.data.data.user),
            );
          } catch (e) {}
          this.setState({loading: false});
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
        console.error('+++++ Post Social', error);
      });
  };

  componentDidMount = () => {
    this.setState({
      email: this.props.auth.userInfo.user.email,
      fullName: '',
    });
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
                <Text style={[appStyles.h1Auth]}>Almost There!</Text>
              </View>
              <View style={[appStyles.mt10]}>
                <Text style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                  Sign Up
                </Text>
              </View>

              <Formik
                initialValues={{
                  fullname: this.props.auth.userInfo.user.first_name,
                  email: this.props.auth.userInfo.user.email,
                }}
                onSubmit={(values) => {
                  this.updateUser(values);
                }}
                validationSchema={yup.object().shape({
                  fullname: yup.string().optional(),
                  email: yup.string().email().optional(),
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
                            placeholder={
                              this.state.fullName != ''
                                ? this.state.fullName
                                : 'Enter your full name'
                            }
                            placeholderTextColor={colors.defaultBlack}
                            value={values.fullname}
                            onChangeText={handleChange('fullname')}
                            onBlur={() => setFieldTouched('fullname')}
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
                            returnKeyType="next"
                            editable={
                              this.props.auth.userInfo.user.first_name != ''
                                ? false
                                : true
                            }
                            blurOnSubmit={false}
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
                            placeholder={
                              this.state.email != ''
                                ? this.state.email
                                : 'Enter your email'
                            }
                            editable={
                              this.props.auth.userInfo.user.email != ''
                                ? false
                                : true
                            }
                            placeholderTextColor={colors.defaultBlack}
                            onFocus={() => this.setState({email: ''})}
                            keyboardType={'email-address'}
                            returnKeyType="done"
                            ref={(input) => {
                              this.secondTextInput = input;
                            }}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            onSubmitEditing={handleSubmit}
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
                      {!this.state.loading ? (
                        <TouchableOpacity
                          disabled={!isValid}
                          onPress={handleSubmit}
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
    updateUserInfo: (data) => dispatch(updateUserInfo(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(postSocialSignupScreen);
