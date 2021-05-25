import * as Types from './action.types';
import axios from 'axios';
import {baseURL} from '../../utilities/constant';

// PLAIN ACTIONS
const startLoader = () => {
  return {
    type: Types.MY_BOOKING_LOADER_START,
  };
};

const stopLoader = () => {
  return {
    type: Types.MY_BOOKING_LOADER_STOP,
  };
};

const setActiveJobs = (payload) => {
  return {
    type: Types.SET_ACTIVE_JOBS,
    payload,
  };
};

const setOngoingJobs = (payload) => {
  return {
    type: Types.SET_ONGOING_JOBS,
    payload,
  };
};

const setCompleteJob = (payload) => {
  return {
    type: Types.SET_COMPLETED_JOBS,
    payload,
  };
};

const moonerBidsLoader = () => {
  return {
    type: Types.MOONER_BID_LOADER,
  };
};

const setMoonerBidList = (payload) => {
  return {
    type: Types.SET_MOONER_BIDS_LIST,
    payload,
  };
};

// THUNK ACTIONS

const getMyBookings = (role) => {
  return async (dispatch) => {
    dispatch(startLoader());
    try {
      const activeJobs = await axios.post(
        `${baseURL}booking/seeker_bookings/`,
        {status: 'active_bids', for: role},
      );
      if (activeJobs?.data) {
        dispatch(setActiveJobs(activeJobs?.data?.data));
      }
      const ongoingJob = await axios.post(
        `${baseURL}booking/seeker_bookings/`,
        {status: 'ongoing', for: role},
      );

      if (ongoingJob?.data) {
        dispatch(setOngoingJobs(ongoingJob?.data?.data));
      }
      const completedJobs = await axios.post(
        `${baseURL}booking/seeker_bookings/`,
        {status: 'completed', for: role},
      );
      if (completedJobs?.data) {
        dispatch(setCompleteJob(completedJobs?.data?.data));
      }
    } catch (error) {}
    dispatch(stopLoader());
  };
};

const getMoonersBids = (job_id) => {
  return async (dispatch) => {
    dispatch(moonerBidsLoader());
    try {
      const response = await axios.get(
        `${baseURL}booking/sp_bid/?job_id=${job_id}`,
      );
      if (response?.data) {
        dispatch(setMoonerBidList(response?.data?.data));
      }
    } catch (error) {
      dispatch(setMoonerBidList([]));
    }
  };
};

export {getMyBookings, getMoonersBids};
