import RootReducers from './reducers/rootReducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import {baseURL} from '../utilities/constant';
var store = createStore(RootReducers, compose(applyMiddleware(thunk)));

// Axios
// axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      'Bearer ' + store?.getState()?.auth?.userInfo?.access;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export {store};
