import {combineReducers} from 'redux';
import auth from './auth';
import common from './common.reducer';
import jobpost from './postjob.reducer';
import mybooking from './myBooking.reducer';
import chatting from './chatting';
export default combineReducers({
  auth,
  common,
  jobpost,
  mybooking,
  chatting,
});
