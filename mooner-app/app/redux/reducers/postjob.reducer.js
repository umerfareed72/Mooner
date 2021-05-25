import * as Types from '../actions/action.types';

const initialState = {
  job_status: 'Active',
  budget: 0,
  job_description: '',
  ssid: null,
  job_category: null,
  job_cat_child: null,
  job_answers: null,
  dateTime: null,
  mooner_list: [],
  mooner_list_loader: false,
};

const PostJob = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_BUDGET: {
      return {
        ...state,
        budget: action?.payload,
      };
    }
    case Types.SET_JOBANSWERS: {
      return {
        ...state,
        job_answers: action?.payload,
      };
    }
    case Types.SET_JOB_CAT: {
      return {
        ...state,
        job_category: action?.payload,
      };
    }
    case Types.SET_JOB_SUBCAT: {
      return {
        ...state,
        job_cat_child: action?.payload,
      };
    }
    case Types.SET_JOB_DESCRIPTION: {
      return {
        ...state,
        job_description: action?.payload,
      };
    }
    case Types.SET_SERVICE_SEEKER_ID: {
      return {
        ...state,
        ssid: action?.payload,
      };
    }
    case Types.SET_DATE_TIME: {
      return {
        ...state,
        dateTime: action?.payload,
      };
    }
    case Types.RESET_POST_JOB: {
      return {
        ...state,
        job_status: 'Active',
        budget: 0,
        job_description: '',
        ssid: null,
        job_category: null,
        job_answers: null,
        dateTime: null,
      };
    }
    case Types.MOONER_FILTER_LOADER: {
      return {
        ...state,
        mooner_list_loader: true,
      };
    }
    case Types.SET_MOONER_LIST: {
      return {
        ...state,
        mooner_list_loader: false,
        mooner_list: action?.payload,
      };
    }

    default:
      return {...state};
  }
};

export default PostJob;
