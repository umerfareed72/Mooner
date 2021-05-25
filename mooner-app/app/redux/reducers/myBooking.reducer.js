import * as Types from '../actions/action.types';
const initialState = {
  activeJobs: [],
  ongoing: [],
  completed: [],
  loader: false,
  moonerBids: [],
  moonerBidsLoader: false,
};

const MyBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.MY_BOOKING_LOADER_START: {
      return {
        ...state,
        loader: true,
      };
    }
    case Types.MY_BOOKING_LOADER_STOP: {
      return {
        ...state,
        loader: false,
      };
    }
    case Types.SET_COMPLETED_JOBS: {
      return {
        ...state,
        completed: action.payload,
      };
    }

    case Types.SET_ACTIVE_JOBS: {
      return {
        ...state,
        activeJobs: action?.payload,
      };
    }

    case Types.SET_ONGOING_JOBS: {
      return {
        ...state,
        ongoing: action?.payload,
      };
    }
    case Types.SET_MOONER_BIDS_LIST: {
      return {
        ...state,
        moonerBids: action.payload,
        moonerBidsLoader: false,
      };
    }
    case Types.MOONER_BID_LOADER: {
      return {
        ...state,
        moonerBidsLoader: true,
      };
    }

    default:
      return {...state};
  }
};

export default MyBookingReducer;
