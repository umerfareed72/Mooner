import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/splash/splash';
import MainSplash from '../screens/splash/mainSplash';
import WelcomeScreen from '../screens/welcome/welcome';
import loginWelcome from '../screens/welcome/loginWelcome';
import login from '../screens/auth/login';
import resetPassword from '../screens/auth/resetPassword';
import forgotPassword from '../screens/auth/forgotPassword';
import verifyLogin from '../screens/auth/verifyLogin';
import signupWelcome from '../screens/welcome/signupWelcome';
import signupPrimary from '../screens/auth/signupPrimary';
import signupSecondary from '../screens/auth/signupSecondary';
import otp from '../screens/auth/otp';
import verifyPhone from '../screens/auth/verifyPhone';
import SigninSuccessMessageScreen from '../screens/auth/signinSuccessMessage';
import signupSuccessMessage from '../screens/auth/signupSuccessMessage';
import signup from '../screens/auth/signup';
import ssHomeScreen from '../screens/home/ssHomeScreen';
import postSocialSignupScreen from '../screens/auth/postSocialSignupScreen';
import {ActiveNavigator} from './activeDrawerNavigator';

const AuthNav = createStackNavigator();
export const AuthNavigator = ({navigation}) => (
  <NavigationContainer>
    <AuthNav.Navigator>
      <AuthNav.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="mainSplash"
        component={MainSplash}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="loginWelcome"
        component={loginWelcome}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="login"
        component={login}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="resetPassword"
        component={resetPassword}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="forgotPassword"
        component={forgotPassword}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="verifyLogin"
        component={verifyLogin}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signupWelcome"
        component={signupWelcome}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signupPrimary"
        component={signupPrimary}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signupSecondary"
        component={signupSecondary}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="otp"
        component={otp}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="verifyPhone"
        component={verifyPhone}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signinSuccessMessage"
        component={SigninSuccessMessageScreen}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signupSuccessMessage"
        component={signupSuccessMessage}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="signup"
        component={signup}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="postSocial"
        component={postSocialSignupScreen}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="logout"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <AuthNav.Screen
        name="active"
        component={ActiveNavigator}
        options={{headerShown: false}}
      />
    </AuthNav.Navigator>
  </NavigationContainer>
);
