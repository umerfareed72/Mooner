import {Dimensions} from 'react-native';

export const APP_NAME = 'MOONER';
export const baseURL = 'http://18.216.236.249/';
export const baseURLAuth = 'http://18.216.236.249/account/';
export const webClientId =
  '172405809015-f2q69ib78tp6nodp0mje9heuc3lmvjvo.apps.googleusercontent.com';
export const webClientSecret = '0XVHVABRs52kYKJ0PYmG4kd2';

export const ACCOUNT_CONST = 'account/';
export const CAT_MNG_CONST = 'category_management/';
export const SP = 'service_provider/';
export const imagesURL = 'http://18.216.236.249';
export const spImagesURL = 'http://18.216.236.249/media';

// Phone no validation
export const PHONE_NO_LENGTH_SINGAPORE = 8; // for singapore
export const PHONE_NO_LENGTH_PAKISTAN = 10; // for Pakistan
// export const REG_PATTERN = /^\+65\d{8}/; //for singapore

export const REG_PATTERN_SINGAPORE = /^\+65\d{8}/; //for SINGAPORE
export const REG_PATTERN_PAKISTAN = /^(\+92|0|92)[0-9]{10}$/; //for Pakistan
export const REG_PATTERN_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}$/;
export const PASSWORD_ERROR_MESSAGES =
  'password must contain at least one number, both lower and uppercase letters and special characters';
export const DIGITS = /^[-+]?\d+$/;
export const DIGIT_MESSAGE = 'numbers should be in digits';

// /^\+92[3]\d{9}/; //for Pakistan

export const vh = Dimensions.get('screen').height;
export const wh = Dimensions.get('screen').width;
