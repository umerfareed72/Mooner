import * as Types from './action.types';
import axios from 'axios';
import {baseURL} from '../../utilities/constant';

// Plain Actions
const setBudegt = (payload) => {
  return {
    type: Types.SET_BUDGET,
    payload,
  };
};

const setJobDesc = (payload) => {
  return {
    type: Types.SET_JOB_DESCRIPTION,
    payload,
  };
};

const setSSID = (payload) => {
  return {
    type: Types.SET_SERVICE_SEEKER_ID,
    payload,
  };
};
const setJobCat = (payload) => {
  return {
    type: Types.SET_JOB_CAT,
    payload,
  };
};

const setJobSubCat = (payload) => {
  return {
    type: Types.SET_JOB_SUBCAT,
    payload,
  };
};

const setJobAnswer = (payload) => {
  return {
    type: Types.SET_JOBANSWERS,
    payload,
  };
};

const setDateTime = (payload) => {
  return {
    type: Types.SET_DATE_TIME,
    payload,
  };
};
const reset = () => {
  return {
    type: Types.RESET_POST_JOB,
  };
};
const moonerListLoader = () => {
  return {
    type: Types.MOONER_FILTER_LOADER,
  };
};

const moonerSetList = (payload) => {
  return {
    type: Types.SET_MOONER_LIST,
    payload,
  };
};

// THUNK ACTIONS
const moonerFilter = (cat_child_id, min_budget, max_budget, order) => {
  return async (dispatch) => {
    dispatch(moonerListLoader());
    try {
      const response = await axios.post(`${baseURL}booking/filter_sp/`, {
        cat_child_id,
        min_budget,
        max_budget,
        order,
      });

      if (response?.data) {
        dispatch(moonerSetList(response?.data?.data));
      }
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(moonerSetList([]));
    }
  };
};

export {
  setJobAnswer,
  setJobSubCat,
  setJobCat,
  setSSID,
  setJobDesc,
  setBudegt,
  setDateTime,
  reset,
  moonerFilter,
};
