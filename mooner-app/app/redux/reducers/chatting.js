import {
  get_token_success,
  get_messages_success,
  get_messages_failure,
  get_token_failure,
  api_send_request,
  create_channel_success,
} from '../actions/type';

const initialState = {
  loading: false,
  success: false,
  failure: false,
  messages: [],
  chatToken: '',
  currentChannel: {},
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case get_messages_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        messages: payload,
      };

    case get_token_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        chatToken: payload,
      };
    case create_channel_success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        currentChannel: payload,
      };

    case api_send_request:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
