import {
  signup_success,
  signup_failure,
  signup_otp_success,
  signup_otp_failure,
  signup_secondary_success,
  signup_secondary_failure,
  signup_google_success,
  signup_google_failure,
  login_email_success,
  login_email_failure,
  login_otp_success,
  login_otp_failure,
  login_phone_success,
  login_phone_failure,
  forgot_pass_success,
  forgot_pass_failure,
  reset_pass_success,
  reset_pass_failure,
  login_google_success,
  login_google_failure,
  reset_success,
  get_categories_success,
  get_categories_failure,
  update_user,
  api_send_request,
  get_question_success,
  get_SSquestion_success,
  get_active_services_success,
  get_active_services_failure,
  get_child_service_failure,
  get_child_service_success,
  get_current_child_success,
  get_cuurent_question_success,
  get_cuurent_question_failure,
  get_current_child_failure,
  get_alpha_child_success,
  get_alpha_child_failure,
  get_current_items_success,
  get_current_items_failure,
  add_current_items_success,
  add_current_items_failure,
  get_cuurent_answer_success,
  get_cuurent_answer_failure,
  get_cuurent_files_success,
  logout,
  get_posted_jobs_success,
  get_posted_jobs_failure,
  userdata_success,
} from './type';
import {post, get} from '../../services';
import {Alert} from 'react-native';
import {
  ACCOUNT_CONST,
  baseURL,
  CAT_MNG_CONST,
  SP,
} from '../../utilities/constant';
import axios from 'axios';
import {Item} from 'native-base';

//Logout
export const userLogout = () => {
  return {
    type: logout,
  };
};

//Sign Up Name Phone
export const userSignup = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'signup/', user);
    if (response.data.status === true) {
      dispatch({
        type: signup_success,
        payload: response.data,
      });
      dispatch({
        type: userdata_success,
        payload: user,
      });
    } else {
      Alert.alert(
        'Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Sign Up OTP
export const signupOtpVerification = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'profile_otp/', data);
    if (response.data.status === true) {
      token = response.data.access;
      try {
        AsyncStorage.setItem('Access_Token', token);
      } catch (error) {}
      dispatch({
        type: signup_otp_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'OTP Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_otp_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Sign Up Email Pass (Not working)
export const signupSecondaryRequest = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await put(ACCOUNT_CONST + 'phone_user_update/', data);
    if (response.data.status === true) {
      dispatch({
        type: signup_secondary_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_secondary_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Google Sign up
export const signupGoogleRequest = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'signup/', data);
    if (response.data.status === true) {
      dispatch({
        type: signup_google_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Google Sign Up Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_google_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};
//FaceBook Sign up
export const signupFBRequest = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'signup/', data);
    if (response.data.status === true) {
      dispatch({
        type: signup_google_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'FaceBook Sign Up Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_google_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Login Email Password
export const userEmailLogin = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'login_email/', user);

    if (response.data.status === true) {
      dispatch({
        type: login_email_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Login Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: login_email_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Login Phone
export const userPhoneLogin = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(
      ACCOUNT_CONST + 'login_cellphone_request/',
      user,
    );

    if (response.data.status === true) {
      dispatch({
        type: login_phone_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Login Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: login_phone_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Login Phone OTP
export const userPhoneOTP = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});

    const response = await post(ACCOUNT_CONST + 'login_cellphone/', user);

    if (response.data.status === true) {
      token = response.data.access;
      try {
        AsyncStorage.setItem('Access_Token', token);
      } catch (error) {}
      dispatch({
        type: login_otp_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Login Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: login_otp_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Login FaceBook
export const loginFBRequest = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'login_facebook/', data);

    if (response.data.status === true) {
      // alert(JSON.stringify(response.data));
      dispatch({
        type: signup_google_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'FaceBook Login Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: signup_google_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Forgot Password
export const forgotPassRequest = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'admin_forgot_password/', user);

    if (response.data.status === true) {
      // Alert.alert(
      //   'Success',
      //   response.data.message,
      //   [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      //   {cancelable: false},
      // );
      dispatch({
        type: forgot_pass_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Forgot Password Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: forgot_pass_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Google Sign up
export const loginGoogleRequest = (data) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await post(ACCOUNT_CONST + 'login_google/', data);

    if (response.data.status === true) {
      dispatch({
        type: login_google_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: login_google_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Reset Password
export const updatePasswordRequest = (user) => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});

    const response = await post(ACCOUNT_CONST + 'user_reset_password/', user);

    if (response.data.status === true) {
      // Alert.alert(
      //   'Success',
      //   response.data.message,
      //   [{text: 'Ok', onPress: () => console.log('Cancelled')}],
      //   {cancelable: false},
      // );
      dispatch({
        type: reset_pass_success,
        payload: response.data,
      });
    } else {
      Alert.alert(
        'Reset Password Error',
        response.data.message,
        [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
        {cancelable: false},
      );
      dispatch({
        type: reset_pass_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Reset
export const resetSuccess = () => async (dispatch) => {
  dispatch({
    type: reset_success,
    payload: null,
  });
};

//Service Categories Fetch
export const getServiceCategories = () => async (dispatch) => {
  try {
    dispatch({type: api_send_request, payload: true});
    const response = await get(CAT_MNG_CONST + 'categories/');

    if (response.data.status === true) {
      dispatch({
        type: get_categories_success,
        payload: response.data,
      });
    } else {
      dispatch({
        type: get_categories_failure,
        payload: response.data,
      });
    }
  } catch (error) {}
};

//Search Services
export const searchServiceCategories = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  try {
    const response = await post('category_management/searchcategory/', {
      name: data,
    });

    // if (response.data.status === true) {
    //   dispatch({
    //     type: get_categories_success,
    //     payload: response.data,
    //   });
    // } else {
    //   dispatch({
    //     type: get_categories_failure,
    //     payload: response.data,
    //   });
    // }
  } catch (error) {}
};

//Get Child Categories
export const getChildCategories = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  try {
    const response = await post('category_management/get_childs/', data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // if (response.data.status === true) {
    //   dispatch({
    //     type: get_categories_success,
    //     payload: response.data,
    //   });
    // } else {
    //   dispatch({
    //     type: get_categories_failure,
    //     payload: response.data,
    //   });
    // }
  } catch (error) {}
};

//Update User
export const updateUserInfo = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  dispatch({
    type: update_user,
    payload: data,
  });
};

export const updateQuestions = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  dispatch({
    type: get_question_success,
    data,
  });
};

export const updateCurrentChild = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  dispatch({
    type: get_current_child_success,
    data,
  });
};

export const getActiveServices = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  const res = await post(SP + 'sp_dashboard/', {}, data);
  try {
    if (res.data.status) {
      dispatch({
        type: get_active_services_success,
        payload: res.data.data,
      });
      dispatch({
        type: get_posted_jobs_success,
        payload: res.data.data.posted_jobs,
      });
    } else {
      dispatch({
        type: get_posted_jobs_failure,
        payload: res.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: get_posted_jobs_failure,
      payload: res.data.message,
    });
    Alert.alert(
      'Error',
      'Network Error',
      [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
      {cancelable: false},
    );
  }
};

export const getChildServices = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  await axios
    .get(baseURL + SP + 'get_sp_categories/', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      params: {
        sub_category_id: data.id,
      },
    })
    .then(async (res) => {
      try {
        if (res.data.success) {
          dispatch({
            type: get_child_service_success,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: get_child_service_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};

export const getServiceItems = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  await axios
    .get(baseURL + SP + 'create_sp_items/', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then(async (res) => {
      try {
        if (res.data.status) {
          dispatch({
            type: get_current_items_success,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: get_current_items_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};

export const getAlphaChildServices = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  var body = new FormData();
  body.append('tn_parent', data.id);

  await axios
    .get(baseURL + SP + 'get_sp_categories/', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      params: {
        sub_category_id: data.id,
      },
    })
    .then(async (res) => {
      try {
        if (res.data.success) {
          dispatch({
            type: get_alpha_child_success,
            payload: res.data,
          });
        } else {
          dispatch({
            type: get_alpha_child_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};

export const getCurrentQuestions = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  var body = new FormData();
  body.append('sub_category', data);
  axios
    .post(baseURL + SP + 'sp_category_questions/', body)
    .then(async (res) => {
      try {
        if (res.data.status) {
          updateQuestions(res.data.data);
          dispatch({
            type: get_cuurent_question_success,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: get_cuurent_question_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};

export const getCurrentQuestion = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});

  var body = new FormData();
  body.append('sub_category', data);
  axios
    .post(baseURL + SP + 'sp_category_questions/', body)
    .then(async (res) => {
      try {
        if (res.data.status) {
          updateQuestions(res.data.data);
          dispatch({
            type: get_cuurent_question_success,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: get_cuurent_question_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};

export const getCurrentAnswers = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  axios
    .get(
      baseURL +
        SP +
        'edit_sp_service_register/' +
        data.category.service_id +
        '/',
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    )
    .then(async (res) => {
      try {
        if (res.data.status) {
          dispatch({
            type: get_cuurent_answer_success,
            payload: res.data.data.service_answers,
          });
          dispatch({
            type: get_cuurent_files_success,
            payload: res.data.data.files,
          });
        } else {
          dispatch({
            type: get_cuurent_answer_failure,
            payload: res.data.message,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Network Error',
          [{text: 'Try Again', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
      }
    });
};
