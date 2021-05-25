import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
export const PLATEFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};
export const REQUEST_PERMISSION_TYPE = {
  location: PLATEFORM_LOCATION_PERMISSIONS,
};

export const PERMISSION_TYPE = {
  location: 'location',
};

export const checkPermission = async (type): Promise<boolean> => {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  if (!permissions) {
    return true;
  }
  try {
    var result = await check(permissions);
    console.log('Result', result);

    if (result == RESULTS.GRANTED) {
      return true;
    } else {
      return requestPermission(permissions), false;
    }
  } catch (error) {
    console.log(error);
  }
};
export const requestPermission = async (permissions): Promise<boolean> => {
  try {
    var result = await request(permissions);
    console.log(result);
    if ((result = 'granted')) {
      return true;
    } else if ((result = 'blocked')) {
      return false;
    } else if ((result = 'limited')) {
      return false;
    } else if ((result = 'unavailable')) {
      return false;
    } else if ((result = 'denied')) {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
