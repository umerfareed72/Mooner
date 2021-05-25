import axios from 'axios';
import React from 'react';
import {number} from 'yup';
import {baseURL} from '../../utilities/constant';
import {TwilioService} from '../../utilities/tiwilio-service';
import {
  api_send_request,
  get_messages_success,
  get_token_success,
  create_channel_success,
} from './type';

export const getAllMessages = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  try {
    TwilioService.getInstance()
      .getChatClient(data.token)
      .then((client) => {
        // console.log('Client Info>>>>>', client);
        client
          .getChannelByUniqueName(data.channelID)
          .then((channel) => {
            // console.log(
            //   'Channel Info>>>>>',
            //   channel.channelState.lastMessage.dateCreated,
            // );
            // console.log('Channel Info>>>>>', channel.sid);

            channel.channelState.status !== 'joined' ? channel.join() : channel;
            client.getChannelBySid(channel.sid).then((res) => {
              // console.log('Channel Id>>>>>', res);
              channel.on('messageAdded', (msg) => {
                res.getMessages().then((msg) => {
                  dispatch({
                    type: get_messages_success,
                    payload: msg.items,
                  });
                });
              });
              res.getMessages().then((msg) => {
                dispatch({
                  type: get_messages_success,
                  payload: msg.items,
                });
              });
            });
          })
          .catch(() => {
            client
              .createChannel({
                uniqueName: data.channelID,
                friendlyName: data.channelID,
              })
              .then((channel) => {
                channel.join();
                client.getChannelBySid(channel.sid).then((res) => {
                  // console.log('Channel Id>>>>>', res);
                  channel.on('messageAdded', (msg) => {
                    res.getMessages().then((msg) => {
                      dispatch({
                        type: get_messages_success,
                        payload: msg.items,
                      });
                    });
                  });
                  res.getMessages().then((msg) => {
                    dispatch({
                      type: get_messages_success,
                      payload: msg.items,
                    });
                  });
                });
                // console.log('New Channel', channel.join());
              });
          });
      });
  } catch (error) {
    console.log(error);
  }
};

export const createChatChannel = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  try {
    var form = new FormData();
    form.append('seeker_id', data.userid);
    form.append('provider_id', data.provider_id);
    form.append('channel_id', data.number);
    console.log(form);

    axios
      .post(baseURL + 'twilio_chat/chat/', form, {
        headers: {
          Authorization: `Bearer ${data.usertoken}`,
        },
      })
      .then((res) => {
        console.log('---------Redux Channel-------->', res?.data);
        dispatch({
          type: create_channel_success,
          payload: res.data.data[0],
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const snedMessage = (data) => async (dispatch) => {
  // dispatch({type: api_send_request, payload: true});
  try {
    TwilioService.getInstance()
      .getChatClient(data.token)
      .then((client) => {
        console.log('==>', data.channelID);
        client
          .getChannelByUniqueName(data.channelID)
          .then((channel) => {
            channel.channelState.status !== 'joined' ? channel.join() : channel;
            client.getChannelBySid(channel.sid).then((res) => {
              channel.on('messageAdded', (msg) => {
                getAllMessages(data.token);
              });
              res.sendMessage(data.message, data.userid);
            });
          })
          .catch(() => {
            client
              .createChannel({
                uniqueName: data.channelID,
                friendlyName: data.channelID,
              })
              .then((channel) => {
                channel.join();
                // console.log('New Channel', channel.join());
              });
          });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getChatToken = (data) => async (dispatch) => {
  dispatch({type: api_send_request, payload: true});
  try {
    var form = new FormData();
    form.append('identity', data.userid);

    axios.post(baseURL + 'twilio_token/', form).then((res) => {
      console.log('------redux token------->', res.data.token);
      dispatch({
        type: get_token_success,
        payload: res.data.token,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
