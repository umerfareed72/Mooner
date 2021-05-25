import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/sideMenuStyles';
import colors from '../assets/colors';
import {connect} from 'react-redux';
import {resetSuccess, updateUserInfo, userLogout} from '../redux/actions/index';
import {CommonActions} from '@react-navigation/native';
import {images} from '../assets/images';
import * as COMMONJOBS from '../redux/actions/common.action';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager} from 'react-native-fbsdk';
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ss_status: this.props.role?.role == 'ss' ? true : false,
      user_name: '',
      user_image: '',
      userInfo: '',
    };
  }

  logout = async () => {
    // if (this.props.auth.userInfo == '') {
    //   this.props.navigation.replace('logout');
    // } else {
    try {
      if (this.removeToken('Access_Token') && this.removeToken('User_Info')) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'logout'}],
          }),
        );
        this?.props?.resetSuccess();
        this?.props?.userLogout();
        await GoogleSignin.signOut();
        LoginManager.logOut();
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  componentDidMount = async () => {
    const userInfo = await AsyncStorage.getItem('User_Info');
    const authToken = await AsyncStorage.getItem('Access_Token');
    this.setState({userInfo: JSON.parse(userInfo)});
    var obj = {
      data: {
        access: authToken,
        user: JSON.parse(userInfo),
      },
    };

    this.props.updateUserInfo(obj);
  };

  removeToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (exception) {
      return false;
    }
  };

  changeMode = () => {
    this.setState({ss_status: !this.state.ss_status});
    if (!this.state.ss_status) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      this.props.setRole('ss');
      this.props.navigation.closeDrawer();
    } else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      this.props.setRole('sp');
      this.props.navigation.closeDrawer();
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.scrollView}>
          <ScrollView>
            <View>
              <View style={Styles.imageBox}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    marginTop: 30,
                  }}>
                  <ImageBackground
                    source={require('../assets/images/user-default.jpg')}
                    style={{
                      height: 40,
                      width: 40,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                    imageStyle={{
                      borderRadius: 16,
                    }}>
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#219653',
                      }}
                    />
                  </ImageBackground>

                  {this.state.userInfo == '' || this.state.userInfo == null ? (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.replace('logout')}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 10,
                      }}>
                      <Text>Login/Signup</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '80%',

                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          paddingLeft: 20,
                          justifyContent: 'center',
                        }}>
                        <Text style={[Styles.buttonText, {fontSize: 14}]}>
                          {this.state.userInfo != '' &&
                          this.state.userInfo != null ? (
                            <>
                              {' '}
                              {this.state.userInfo.first_name == ''
                                ? this.state.userInfo.username
                                : this.state.userInfo.first_name}
                            </>
                          ) : (
                            // + ' ' +
                            // this.state.userInfo.last_name
                            this?.props?.auth?.userInfo?.user?.first_name
                          )}
                        </Text>
                        <Text
                          style={[
                            Styles.buttonText,
                            {fontSize: 10, color: '#219653'},
                          ]}>
                          Active
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.closeDrawer()}>
                        <Image
                          style={{height: 14, width: 14, resizeMode: 'contain'}}
                          source={images.cross}></Image>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Moonlah</Text>
                </TouchableOpacity>
                {/* {this.state.ss_status ? ( */}
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ssMyBooking')}
                  style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>My Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate('Inbox')}>
                  <Text style={Styles.buttonText}>Inbox</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ssNotificationSetting')
                  }
                  style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Notification Settings</Text>
                </TouchableOpacity>
                {/* {!this.state.ss_status ? ( */}
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Active Bids</Text>
                </TouchableOpacity>
                {/* ) : (
                  false
                )} */}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ssPrivacyPolicy')
                  }
                  style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ssTermCondition')
                  }
                  style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Terms and Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>About Mooner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>FAQs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonContainer}>
                  <Text style={Styles.buttonText}>Contact Us</Text>
                </TouchableOpacity>
                {this?.props?.auth?.userInfo == '' ||
                this?.props?.auth?.userInfo?.access == null ? (
                  false
                ) : (
                  <TouchableOpacity
                    onPress={() => this.changeMode()}
                    style={Styles.toggleButton}>
                    <>
                      <View
                        style={
                          !this.state.ss_status
                            ? Styles.toggleButtonPill
                            : Styles.toggleButtonInactive
                        }>
                        <Text
                          style={
                            !this.state.ss_status
                              ? Styles.pillText
                              : Styles.toggleText
                          }>
                          Provider
                        </Text>
                      </View>
                      <View
                        style={
                          this.state.ss_status
                            ? Styles.toggleButtonPill
                            : Styles.toggleButtonInactive
                        }>
                        <Text
                          style={
                            this.state.ss_status
                              ? Styles.pillText
                              : Styles.toggleText
                          }>
                          Seeker
                        </Text>
                      </View>
                    </>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={Styles.footerContainer}>
              <TouchableOpacity
                style={Styles.buttonContainer}
                onPress={() => {
                  this.logout();
                }}>
                <Text style={[Styles.buttonText, {color: colors.defaultRed}]}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    role: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetSuccess: (data) => dispatch(resetSuccess(data)),
    updateUserInfo: (data) => dispatch(updateUserInfo(data)),
    userLogout: () => dispatch(userLogout()),
    setRole: (role) => dispatch(COMMONJOBS.setUserRole(role)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
