import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ssHomeScreen from '../screens/home/ssHomeScreen';
import spHomeScreen from '../screens/home/spHomeScreen';
import {SPNavigator} from '../navigation/spTabNavigator';
import ServiceSeekerOrderTrack from '../screens/ssScreens/trackOrder/trackOrder';
import {useSelector} from 'react-redux';

const ssStackTab = createStackNavigator();
export const SSHomeNavigator = ({navigation}) => {
  const role = useSelector((state) => state.common.role);
  console.log('SSHome', role);
  return (
    <ssStackTab.Navigator
      screenOptions={(navigation) => ({
        // headerTitle: (props) => (
        //   <ActiveHeader navigation={navigation} {...props} />
        // ),
        // headerStyle: {
        //   shadowOpacity: 0,
        //   elevation: 0,
        // },
        // headerTitleAlign: 'center',
        // headerLeft: (props) => (
        //   <TouchableOpacity onPress={() => alert('Pressed')}>
        //     <Image
        //       style={{
        //         tintColor: Colors.defaultBlack,
        //         width: 30,
        //         resizeMode: 'contain',
        //       }}
        //       source={images.menuIcon}></Image>
        //   </TouchableOpacity>
        // ),
      })}
      headerMode="none">
      <ssStackTab.Screen name="Home" component={ssHomeScreen} />
      <ssStackTab.Screen
        name="ssOrderTrack"
        component={ServiceSeekerOrderTrack}
        options={{headerShown: false}}
      />
    </ssStackTab.Navigator>
  );
};
