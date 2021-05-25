import * as TYPES from '../actions/action.types';

const initialState = {
  role: 'ss',
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_ROLE: {
      return {
        ...state,
        role: action.payload,
      };
    }

    default:
      return {...state};
  }
};

export default CommonReducer;
