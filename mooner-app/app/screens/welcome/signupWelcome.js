import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';
import signupwelcomeStyles from '../../styles/signupwelcomeStyles';
import colors from '../../assets/colors';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {signupGoogleRequest, signupFBRequest} from '../../redux/actions/index';
import welcomeStyle from '../../styles/welcomeStyle';
import {
  AccessToken,
  LoginManager,
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Indicator from '../../components/Indicator';
import {Alert} from 'react-native';

class signupWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  googleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      let data = {
        login_type: 'Google',
        google_id: userInfo.user.id,
        google_name: userInfo.user.name,
        email: userInfo.user.email,
      };
      if (data.email == '') {
        Alert.alert(
          'Failed',
          'Login Error',
          [{text: 'Ok', onPress: () => console.log('Cancel')}],
          {cancelable: false},
        );
      }
      this.props.signupGoogleRequest(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '65005170132-7pji65mftg949snqth67m22rocf6ps7k.apps.googleusercontent.com',
    });
  }

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
          this.setState({userInfo: user});

          let data = {
            login_type: 'Facebook',
            facebook_id: user.id,
            facebook_name: user.name,
          };

          this.props.signupFBRequest(data);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  facebookSignUp = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['public_profile'])
      .then((login) => {
        if (login.isCancelled) {
          Alert.alert(
            'Login Failed',
            'User Cancelled Login',
            [{text: 'Ok', onPress: () => console.log('Cancel')}],
            {cancelable: false},
          );
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      })
      .catch((err) => {
        Alert.alert(
          'Login Failed',
          'Facebook Login Failed',
          [{text: 'Ok', onPress: () => console.log('Cancel')}],
          {cancelable: false},
        );
      });
  };

  signOut = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.googleSignupSuccess && this.props.auth.success) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'postSocial'}],
        }),
      );
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
          <View style={[signupwelcomeStyles.signupbodyContainer]}>
            <View>
              <Image
                style={[signupwelcomeStyles.signupImageAuth]}
                source={images.signupAvatar}></Image>
            </View>
            <View style={[appStyles.mt30]}>
              <Text style={[appStyles.h1Auth]}>
                Book a Mooner for your job{' '}
              </Text>
            </View>
            <View style={[appStyles.mt10]}>
              <Text style={[appStyles.h1Auth, {color: colors.defaultPurple}]}>
                Sign Up
              </Text>
            </View>
            {!this.props.auth.loading ? (
              <>
                <View style={[appStyles.mt30]}>
                  <TouchableOpacity
                    style={[
                      signupwelcomeStyles.loginbuttonContainer,
                      {backgroundColor: colors.defaultPurple},
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate('signupPrimary')
                    }>
                    <View
                      style={{
                        paddingRight: 15,
                        width: '20%',
                        alignItems: 'flex-end',
                      }}>
                      <Image
                        source={images.person}
                        style={[appStyles.Icon15Auth]}></Image>
                    </View>

                    <Text
                      style={[
                        signupwelcomeStyles.btnTextLoginAuth,
                        {color: colors.white},
                      ]}>
                      Create with Phone
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={signupwelcomeStyles.loginbuttonContainer}
                    onPress={this.googleSignup}>
                    <View style={signupwelcomeStyles.IconAlignEnd}>
                      <Image
                        source={images.google}
                        style={[appStyles.Icon24Auth]}></Image>
                    </View>
                    <Text style={[signupwelcomeStyles.btnTextLoginAuth]}>
                      Connect with Google
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={signupwelcomeStyles.loginbuttonContainer}
                    onPress={this.facebookSignUp}>
                    <View style={signupwelcomeStyles.IconAlignEnd}>
                      <Image
                        source={images.fb}
                        style={[signupwelcomeStyles.fbIconAuth]}></Image>
                    </View>
                    <Text style={signupwelcomeStyles.btnTextLoginAuth}>
                      {' '}
                      Connect with Facebook
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[appStyles.mt20]}>
                  <Text style={[signupwelcomeStyles.textmediumAuth]}>
                    Already a user?
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('loginWelcome')
                      }
                      style={{fontFamily: 'Gilroy-Bold'}}>
                      {' '}
                      Sign In
                    </Text>
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{flex: 1, marginTop: 50}}>
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
    signupGoogleRequest: (data) => dispatch(signupGoogleRequest(data)),
    signupFBRequest: (data) => dispatch(signupFBRequest(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(signupWelcome);
