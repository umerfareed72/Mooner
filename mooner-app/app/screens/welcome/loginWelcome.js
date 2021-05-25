import React, {Component} from 'react';
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
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';

import colors from '../../assets/colors';
import welcomeStyle from '../../styles/welcomeStyle';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {
  loginGoogleRequest,
  loginFBRequest,
  signupGoogleRequest,
} from '../../redux/actions/index';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  AccessToken,
  LoginManager,
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Indicator from '../../components/Indicator';

class loginWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '65005170132-7pji65mftg949snqth67m22rocf6ps7k.apps.googleusercontent.com',
    });
  }

  googleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      let data = {
        login_type: 'Google',
        google_id: userInfo.user.id,
        google_name: userInfo.user.name,
        email: userInfo.user.email,
      };
      console.log(data);

      this.props.signupGoogleRequest(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  facebookSignLogin = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['public_profile']).then(
      (login) => {
        if (login.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {},
    );
  };

  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
        } else {
          let data = {
            facebook_id: user.id,
            facebook_name: user.name,
          };

          this.props.loginFBRequest(data);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.auth.googleSignupSuccess &&
      this.props.auth.success &&
      !this.props.auth.reset
    ) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'postSocial'}],
        }),
      );

      // this.props.navigation.replace('postSocial', {
      //   userInfo: this.props.auth.userInfo,
      // });
    }
  }

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            navigation={this.props.navigation}
            showBackButton={true}
            showSkipButton={true}
            backButtonColor={'default'}
          />
          <View style={[welcomeStyle.welcomebodyContainer]}>
            <View>
              <Image
                style={[welcomeStyle.welcomeloginImageAuth]}
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
            {!this.props.auth.loading ? (
              <>
                <View style={[appStyles.mt30]}>
                  <TouchableOpacity
                    style={[
                      welcomeStyle.loginbuttonContainer,
                      {backgroundColor: colors.defaultPurple},
                    ]}
                    onPress={() => this.props.navigation.navigate('login')}>
                    <View
                      style={{
                        paddingRight: 15,
                      }}>
                      <Image
                        source={images.person}
                        style={[appStyles.Icon15Auth]}></Image>
                    </View>

                    <Text
                      style={[
                        welcomeStyle.btnTextLoginAuth,
                        {color: colors.white},
                      ]}>
                      Continue with Email
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={welcomeStyle.loginbuttonContainer}
                    onPress={this.googleSignup}>
                    <View style={welcomeStyle.IconAlignEnd}>
                      <Image
                        source={images.google}
                        style={[appStyles.Icon24Auth]}></Image>
                    </View>
                    <Text style={[welcomeStyle.btnTextLoginAuth]}>
                      Continue with Google
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={welcomeStyle.loginbuttonContainer}
                    onPress={() => this.facebookSignLogin()}>
                    <View style={welcomeStyle.IconAlignEnd}>
                      <Image
                        source={images.fb}
                        style={[welcomeStyle.fbIconAuth]}></Image>
                    </View>
                    <Text style={welcomeStyle.btnTextLoginAuth}>
                      {' '}
                      Continue with Facebook
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={welcomeStyle.loginbuttonContainer}
                    onPress={() =>
                      this.props.navigation.navigate('verifyLogin')
                    }>
                    <View style={welcomeStyle.IconAlignEnd}>
                      <Image
                        source={images.phone}
                        style={[welcomeStyle.phoneIconAuth]}></Image>
                    </View>
                    <Text style={welcomeStyle.btnTextLoginAuth}>
                      Sign in via Mobile & OTP
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={appStyles.mt10}
                  onPress={() =>
                    this.props.navigation.navigate('signupWelcome')
                  }>
                  <Text style={[welcomeStyle.textmediumAuth]}>
                    Don’t have an account?{' '}
                    <Text style={{fontFamily: 'Gilroy-Bold'}}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{flex: 1}}>
                <Indicator></Indicator>
              </View>
            )}
          </View>
        </ScrollView>
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
    loginGoogleRequest: (data) => dispatch(loginGoogleRequest(data)),
    loginFBRequest: (data) => dispatch(loginFBRequest(data)),
    signupGoogleRequest: (data) => dispatch(signupGoogleRequest(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(loginWelcome);
