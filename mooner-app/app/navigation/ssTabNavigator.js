import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ssHomeScreen from '../screens/home/ssHomeScreen';
import childCategoryScreen from '../screens/service/childCategory';
import serviceQuestionScreen from '../screens/service/serviceQuestions';
import ActiveTabBar from '../components/ssTabBar';
import {TouchableOpacity, Image, ImageBackground} from 'react-native';
import {images} from '../assets/images';
import Colors from '../assets/colors';
import {SSHomeNavigator} from './ssHomeNavigator';
import {SPNavigator} from './spTabNavigator';
import {SPHomeNavigator} from './spHomeNavigator';
import SSMyBookings from '../screens/ssScreens/myBookings/myBookings';
import SSPrivacyPolicy from '../screens/ssScreens/privacyPolicy/privacyPolicy';
import SSTermCondition from '../screens/ssScreens/termCondition/termCondition';
import SSNotificationSetting from '../screens/ssScreens/notificationSetting/notificationSetting';
import SSMoonerProfile from '../screens/ssScreens/moonerProfile/moonerProfile';
import SSHomeScreen from '../screens/home/ssHomeScreen';
import SSInbox from '../screens/ssScreens/Inbox/ssInbox';
import SPInbox from '../screens/spScreens/inbox/spInbox';
import SSChatBox from '../screens/ssScreens/Inbox/ssChatBox';
import {Icon} from 'native-base';
import moonerListsScreen from '../screens/service/moonerLists';
import {useSelector} from 'react-redux';
import MoonerBids from '../screens/ssScreens/MoonerBids/MoonerBids';
import findCategoryScreen from '../screens/service/findCategories';
import activeBids from '../screens/bids/activeBids';
import spRegChildServices from '../screens/service/spRegChildServices';
import spAllCategories from '../screens/service/spAllCategories';
import spChildCategories from '../screens/service/spChildCategories';
import spAlphaChildCategories from '../screens/service/spAlphaChildCategories';
import allPostedJobs from '../screens/spScreens/allPostedJobs';
import spshowAnswers from '../screens/service/spshowAnswers';
import spServiceQuestions from '../screens/service/spServiceQuestions';
import spBusinessQuestions from '../screens/service/spBusinessQuestions';
import spMenu from '../screens/service/spMenu';
import spAddNewItem from '../screens/service/spAddNewItem';
import spEditItem from '../screens/service/spEditItem';
import SPSeekerProfile from '../screens/spScreens/ssProfile/ssProfile';

const ssBottomTab = createBottomTabNavigator();
export const SSNavigator = ({navigation}) => {
  const role = useSelector((state) => state.common.role);
  return (
    <ssBottomTab.Navigator tabBar={(props) => <ActiveTabBar {...props} />}>
      {role == 'ss' ? (
        <ssBottomTab.Screen name="Home" component={SSHomeNavigator} />
      ) : (
        <ssBottomTab.Screen name="Home" component={SPHomeNavigator} />
      )}
      <ssBottomTab.Screen
        name="ChildCategory"
        component={childCategoryScreen}
      />
      <ssBottomTab.Screen name="MoonerList" component={moonerListsScreen} />
      <ssBottomTab.Screen name="MoonerBids" component={MoonerBids} />
      <ssBottomTab.Screen name="FindCategory" component={findCategoryScreen} />
      <ssBottomTab.Screen
        name="ServiceQuestion"
        component={serviceQuestionScreen}
      />
      <ssBottomTab.Screen
        name="MLM"
        component={ssHomeScreen}
        // options={{
        //   tabBarColor: Colors.white,
        //   tabBarIcon: ({color}) => (
        //     <Image
        //       source={images.mlmTab}
        //       style={{
        //         height: 20,
        //         resizeMode: 'contain',
        //         tintColor: color,
        //       }}
        //     />
        //   ),
        // }}
      />
      <ssBottomTab.Screen
        name="Shop"
        component={ssHomeScreen}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <ImageBackground
        //       source={images.yellowButton}
        //       style={{
        //         height: 53,
        //         width: 53,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}
        //       imageStyle={{
        //         resizeMode: 'contain',
        //         tintColor: color,
        //       }}>
        //       <Image
        //         source={images.cartTab}
        //         style={{width: 21, resizeMode: 'contain'}}
        //       />
        //     </ImageBackground>
        //   ),
        // }}
      />
      <ssBottomTab.Screen
        name="List"
        component={ssHomeScreen}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <Image
        //       source={images.bookingTab}
        //       style={{
        //         height: 20,
        //         resizeMode: 'contain',
        //         tintColor: color,
        //       }}
        //     />
        //   ),
        // }}
      />
      <ssBottomTab.Screen
        name="Driver"
        component={ssHomeScreen}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <Image
        //       source={images.driverTab}
        //       style={{
        //         height: 20,
        //         resizeMode: 'contain',
        //         tintColor: color,
        //       }}
        //     />
        //   ),
        // }}
      />
      <ssBottomTab.Screen name="SSMoonerProfile" component={SSMoonerProfile} />
      {role == 'ss' ? (
        <ssBottomTab.Screen name="Inbox" component={SSInbox} />
      ) : (
        <ssBottomTab.Screen name="Inbox" component={SPInbox} />
      )}
      <ssBottomTab.Screen name="ssChatBox" component={SSChatBox} />
      <ssBottomTab.Screen name="ssMyBooking" component={SSMyBookings} />
      <ssBottomTab.Screen name="ssPrivacyPolicy" component={SSPrivacyPolicy} />
      <ssBottomTab.Screen name="ssTermCondition" component={SSTermCondition} />
      <ssBottomTab.Screen
        name="ssNotificationSetting"
        component={SSNotificationSetting}
      />
      <ssBottomTab.Screen name="ssMoonerProfile" component={SSMoonerProfile} />
      <ssBottomTab.Screen name="ssHomeScreen" component={SSHomeScreen} />
      <ssBottomTab.Screen name="spActiveBids" component={activeBids} />
      <ssBottomTab.Screen
        name="spRegChildServices"
        component={spRegChildServices}
      />
      <ssBottomTab.Screen name="spAllCategories" component={spAllCategories} />
      <ssBottomTab.Screen
        name="spChildCategories"
        component={spChildCategories}
      />
      <ssBottomTab.Screen
        name="spAlphaChildCategories"
        component={spAlphaChildCategories}
      />
      <ssBottomTab.Screen name="allPostedJobs" component={allPostedJobs} />

      <ssBottomTab.Screen name="spshowAnswers" component={spshowAnswers} />

      <ssBottomTab.Screen
        name="spServiceQuestions"
        component={spServiceQuestions}
      />
      <ssBottomTab.Screen
        name="spBusinessQuestions"
        component={spBusinessQuestions}
      />
      <ssBottomTab.Screen name="spMenu" component={spMenu} />
      <ssBottomTab.Screen name="addNewItem" component={spAddNewItem} />
      <ssBottomTab.Screen name="editItem" component={spEditItem} />
      <ssBottomTab.Screen name="ssProfile" component={SPSeekerProfile} />
    </ssBottomTab.Navigator>
  );
};
