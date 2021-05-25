import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ActiveTabBar from '../components/ssTabBar';
import ActiveBidsScreen from '../screens/bids/activeBids';
import spRegChildServiceScreen from '../screens/service/spRegChildServices';
import spServiceQuestionsScreen from '../screens/service/spServiceQuestions';
import spBusinessQuestionsScreen from '../screens/service/spBusinessQuestions';
import spMenuScreen from '../screens/service/spMenu';
import spAllCategoriesScreen from '../screens/service/spAllCategories';
import spChildCategoriesScreen from '../screens/service/spChildCategories';
import spAddNewItemScreen from '../screens/service/spAddNewItem';
import spEditItem from '../screens/service/spEditItem';
import spHomeScreen from '../screens/home/spHomeScreen';
import {SPHomeNavigator} from './spHomeNavigator';
import spAlphaChildCategoriesScreen from '../screens/service/spAlphaChildCategories';
import spshowAnswers from '../screens/service/spshowAnswers';
import SPSeekerProfile from '../screens/spScreens/ssProfile/ssProfile';
import allPostedJobs from '../screens/spScreens/allPostedJobs';

const ssBottomTab = createBottomTabNavigator();
export const SPNavigator = ({navigation}) => {
  return (
    <ssBottomTab.Navigator tabBar={(props) => <></>}>
      <ssBottomTab.Screen name="Home" component={SPHomeNavigator} />
    </ssBottomTab.Navigator>
  );
};
