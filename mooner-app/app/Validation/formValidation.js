import {
  REG_PATTERN_PAKISTAN,
  REG_PATTERN_SINGAPORE,
} from '../utilities/constant';

export const validateEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var data = {};
  if (email == '') {
    data = {
      status: true,
      Message: 'Email Required',
    };
  } else if (!reg.test(email)) {
    data = {
      status: true,
      Message: 'Invalid Email',
    };
  }

  return data;
};

export const handleRequest = (res) => {
  var data = {};
  data = {
    status: res.status,
    Message: res.message,
  };
  return data;
};

export const validateFullName = (field) => {
  var data = {};
  if (field == '') {
    data = {
      status: true,
      Message: 'Full Name Required',
    };
  }
  return data;
};

export const validatePassword = (password) => {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{8,}$/;
  var data = {};
  if (password == '') {
    data = {
      status: true,
      Message: 'Password Required',
    };
  } else if (!reg.test(password)) {
    data = {
      status: true,
      Message:
        'Password must contain at least one number,both lower and uppercase letters and special characters',
    };
  }
  return data;
};
export const validatePhone = (phone, phoneCode) => {
  var reg = '';
  var data = {};
  if (phone == '') {
    data = {
      status: true,
      Message: 'Phone Number Required',
    };
  } else if (phoneCode == '92') {
    reg = REG_PATTERN_PAKISTAN;
    if (!reg.test(phone)) {
      data = {
        status: true,
        Message: 'Please enter a valid phone number',
      };
    }
  } else if (phoneCode == '65') {
    reg = REG_PATTERN_SINGAPORE;
    if (!reg.test(phone)) {
      data = {
        status: true,
        Message: 'Please enter a valid phone number',
      };
    }
  }

  return data;
};
