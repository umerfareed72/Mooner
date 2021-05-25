import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import spHomeScreen from '../screens/home/spHomeScreen';
import {SSHomeNavigator} from './ssHomeNavigator';
import {useSelector} from 'react-redux';

const ssStackTab = createStackNavigator();
export const SPHomeNavigator = ({navigation}) => {
  const role = useSelector((state) => state.common.role);
  console.log('SpHome', role);
  return (
    <ssStackTab.Navigator
      screenOptions={(navigation) => ({})}
      headerMode="none">
      <ssStackTab.Screen name="Home" component={spHomeScreen} />
    </ssStackTab.Navigator>
  );
};
