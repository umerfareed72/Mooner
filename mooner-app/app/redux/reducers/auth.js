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
  login_phone_success,
  login_phone_failure,
  login_otp_success,
  login_otp_failure,
  forgot_pass_success,
  forgot_pass_failure,
  reset_pass_success,
  reset_pass_failure,
  get_current_child_success,
  login_google_success,
  login_google_failure,
  reset_success,
  update_user,
  get_categories_success,
  get_categories_failure,
  api_send_request,
  get_question_success,
  get_SSquestion_success,
  get_active_services_success,
  get_cuurent_question_failure,
  get_cuurent_question_success,
  get_active_services_failure,
  get_child_service_success,
  get_child_service_failure,
  add_current_items_failure,
  add_current_items_success,
  get_current_items_success,
  get_current_items_failure,
  get_alpha_child_failure,
  get_cuurent_answer_success,
  get_cuurent_answer_failure,
  get_alpha_child_success,
  get_cuurent_files_success,
  logout,
  get_posted_jobs_failure,
  get_posted_jobs_success,
  userdata_success,
} from '../actions/type';

const initialState = {
  loading: false,
  message: '',
  success: false,
  failure: false,
  userInfo: '',
  userInformation: '',
  otpVerified: false,
  phoneVerified: false,
  forgotPassVerified: false,
  googleLoginSuccess: false,
  googleSignupSuccess: false,
  reset: false,
  resetPassSuccess: false,
  categories: '',
  searchResult: '',
  loginEmail: false,
  getallQuestion: [],
  getSSQuestion: [],
  getactiveServices: [],
  getChildServices: [],
  getCurrentChild: {},
  getCurrentQuestion: [],
  getItems: [],
  addItems: [],
  getAlphaChild: [],
  getAnswer: [],
  getFiles: [],
  postedJobs: [],
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case userdata_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        userInformation: payload,
      };
    case signup_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        reset: false,
        userInfo: payload.data,
        loginEmail: false,
      };

    case signup_failure:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: false,
        failure: true,
        reset: false,
        loginEmail: false,
      };
    case signup_otp_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        otpVerified: true,
        userInfo: payload.data,
        reset: false,
        loginEmail: false,
      };
    case signup_otp_failure:
      return {
        ...state,
        message: payload.message,
        success: false,
        failure: true,
        loading: false,
        otpVerified: false,
        reset: false,
        loginEmail: false,
      };
    case signup_secondary_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        reset: false,
        userInfo: payload.data,
        loginEmail: false,
      };
    case signup_secondary_failure:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: false,
        failure: true,
        reset: false,
        loginEmail: false,
      };
    case signup_google_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        userInfo: payload.data,
        googleSignupSuccess: true,
        reset: false,
        loginEmail: false,
      };
    case signup_google_failure:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: false,
        failure: true,
        googleSignupSuccess: false,
        reset: false,
        loginEmail: false,
      };
    case login_email_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        userInfo: payload.data,
        reset: false,
        loginEmail: true,
      };
    case login_email_failure:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: false,
        failure: true,
        reset: false,
        loginEmail: false,
      };
    case login_phone_success:
      return {
        ...state,
        message: payload.message,
        phoneVerified: true,
        loading: false,
        success: true,
        failure: false,
        userInfo: payload.data,
        reset: false,
        loginEmail: false,
      };
    case login_phone_failure:
      return {
        ...state,
        message: payload.message,
        phoneVerified: false,
        loading: false,
        success: false,
        false: true,
        reset: false,
        loginEmail: false,
      };
    case login_otp_success:
      return {
        ...state,
        message: payload.message,
        otpVerified: true,
        loading: false,
        success: true,
        failure: false,
        userInfo: payload.data,
        reset: false,
        loginEmail: false,
      };
    case login_otp_failure:
      return {
        ...state,
        message: payload.message,
        otpVerified: false,
        loading: false,
        success: false,
        failure: true,
        reset: false,
        loginEmail: false,
      };
    case forgot_pass_success:
      return {
        ...state,
        message: payload.message,
        forgotPassVerified: true,
        loading: false,
        success: true,
        failure: false,
        reset: true,
        userInfo: payload.data,
        loginEmail: false,
      };
    case forgot_pass_failure:
      return {
        ...state,
        message: payload.message,
        forgotPassVerified: false,
        loading: false,
        success: false,
        failure: true,
        reset: true,
        loginEmail: false,
      };
    case login_google_success:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: true,
        failure: false,
        userInfo: payload.data,
        googleLoginSuccess: true,
        reset: false,
      };
    case login_google_failure:
      return {
        ...state,
        message: payload.message,
        loading: false,
        success: false,
        failure: true,
        googleLoginSuccess: false,
        reset: false,
      };
    case reset_pass_success:
      return {
        ...state,
        message: payload.message,
        resetPassSuccess: true,
        loading: false,
        success: true,
        failure: false,
        reset: true,
        loginEmail: false,
      };
    case reset_pass_failure:
      return {
        ...state,
        message: payload.message,
        resetPassSuccess: false,
        loading: false,
        success: false,
        failure: true,
        reset: true,
        loginEmail: false,
      };
    case reset_success:
      return {
        ...state,
        loading: false,
        message: 'States Reset',
        success: false,
        failure: false,
        otpVerified: false,
        phoneVerified: false,
        forgotPassVerified: false,
        googleLoginSuccess: false,
        googleSignupSuccess: false,
        reset: true,
        loginEmail: false,
      };
    case get_categories_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        categories: payload.data,
        loginEmail: false,
      };
    case get_categories_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        loginEmail: false,
      };
    case get_question_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getallQuestion: action.data,
      };
    case get_active_services_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getactiveServices: payload,
      };

    case get_active_services_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getactiveServices: payload,
      };

    case get_child_service_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getChildServices: payload,
      };

    case get_child_service_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getChildServices: payload,
      };

    case get_current_child_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getCurrentChild: action.data,
      };

    case get_current_child_success:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getCurrentChild: action.data,
      };

    case get_alpha_child_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getAlphaChild: payload,
      };

    case get_alpha_child_success:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getAlphaChild: payload,
      };

    case get_cuurent_question_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getCurrentQuestion: payload,
      };

    case get_cuurent_question_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getCurrentQuestion: payload,
      };

    // Items

    case get_current_items_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getItems: payload,
      };
    case get_current_items_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getItems: payload,
      };

    case add_current_items_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        addItems: payload,
      };
    case add_current_items_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        addItems: payload,
      };
    case get_posted_jobs_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        postedJobs: payload,
      };

    case get_posted_jobs_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        postedJobs: payload,
      };

    case get_cuurent_answer_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getAnswer: payload,
      };
    case get_cuurent_files_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        getFiles: payload,
      };
    case get_cuurent_answer_failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        getAnswer: payload,
      };

    case api_send_request:
      return {
        ...state,
        loading: payload,
      };
    case update_user:
      return {
        ...state,
        userInfo: payload.data,
        loginEmail: false,
      };
    case logout: {
      return {
        ...state,
        userInfo: '',
      };
    }
    default:
      return state;
  }
};
