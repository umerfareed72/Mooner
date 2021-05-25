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
  Animated,
  ImageBackground,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import welocmeStyle from '../../styles/welcomeStyle';
import appStyles from '../../styles/appStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../assets/colors';
export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <SafeAreaView style={appStyles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            navigation={this.props.navigation}
            showBackButton={false}
            showSkipButton={true}
            backButtonColor={'default'}
          />
          <View style={[welocmeStyle.welcomebodyContainer]}>
            <Image
              style={welocmeStyle.welcomeImageAuth}
              source={images.orMan}></Image>

            <View style={[appStyles.mt30]}>
              <Text style={appStyles.h1Auth}>Welcome to Mooner</Text>
            </View>
            <View style={[appStyles.mt10, appStyles.mh20]}>
              <Text style={appStyles.h2Auth}>
                “Get into the most empowering community to become Self Employed”
              </Text>
            </View>

            <View style={[appStyles.mt20, appStyles.mh30]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('loginWelcome')}
                style={welocmeStyle.buttonContainerAuth}>
                <Text style={welocmeStyle.btnTextAuth}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  welocmeStyle.buttonContainerAuth,
                  {backgroundColor: colors.defaultPurple},
                ]}
                onPress={() => this.props.navigation.navigate('signupWelcome')}>
                <Text style={welocmeStyle.btnTextAuth}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}
