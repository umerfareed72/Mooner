import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SideMenu from '../components/sideMenu';
import {SSNavigator} from './ssTabNavigator';

const MainDrawer = createDrawerNavigator();
export const ActiveNavigator = ({navigation}) => (
  <MainDrawer.Navigator
    drawerType={'slide'}
    drawerContent={(props) => <SideMenu {...props} />}
    headerMode="none">
    <MainDrawer.Screen name="ss" component={SSNavigator} />
  </MainDrawer.Navigator>
);
