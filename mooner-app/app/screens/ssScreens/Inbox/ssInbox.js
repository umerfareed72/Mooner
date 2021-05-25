import {useIsFocused} from '@react-navigation/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../assets/colors';
import {images} from '../../../assets/images';
import ActiveHeader from '../../../components/activeHeader';
import BackButton from '../../../components/backButton';
import Inbox from '../../../components/ssComponent/Inbox';
import {getChatToken} from '../../../redux/actions/chating.action';
import appStyles from '../../../styles/appStyles';
import homeStyles from '../../../styles/homeStyles';
import {baseURL} from '../../../utilities/constant';
import {WP} from '../../../utilities/responsive';
import {TwilioService} from '../../../utilities/tiwilio-service';
const SSInbox = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  const chatting = useSelector((state) => state.chatting);
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const move = (item) => {
    const data = {
      userid: auth?.userInfo?.user?.id,
    };
    try {
      var form1 = new FormData();
      form1.append('identity', data.userid);
      axios.post(baseURL + 'twilio_token/', form1).then((res) => {
        navigation.navigate('ssChatBox', {
          chatToken: res.data.token,
          channelId: item.channel_id,
          user_name: item.user_name,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getChannels = () => {
    setLoading(true);
    const data = {
      usertoken: auth?.userInfo.access,
    };
    try {
      axios
        .get(baseURL + 'twilio_chat/chat/', {
          headers: {
            Authorization: `Bearer ${data.usertoken}`,
          },
          params: {
            chat_for: 'service_seeker',
          },
        })
        .then((channel) => {
          setChannels(channel?.data.data);
          setLoading(false);
          // console.log('Channels>>>>>>>', channel.data.data);
          // console.log(chatting?.messages);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isFocus && getChannels();
  }, [isFocus]);

  return (
    <SafeAreaView style={[homeStyles.body]}>
      {/* header */}
      <ActiveHeader navigation={navigation} />
      <BackButton navigation={navigation}></BackButton>
      <View style={[appStyles.ph30]}>
        <View
          style={[
            appStyles.rowAlign,
            appStyles.aiCenter,
            {marginTop: WP('10')},
          ]}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Gilroy-Bold',
              color: colors.darkBlack,
            }}>
            Inbox
          </Text>
          <Image
            style={{height: 18, width: 14, resizeMode: 'contain'}}
            source={images.delete}></Image>
        </View>
        {channels.length != 0 ? (
          <FlatList
            style={{marginBottom: WP('10')}}
            contentContainerStyle={{
              paddingBottom: WP('25'),

              flexDirection: 'column-reverse',
            }}
            data={channels}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              // console.log(item);
              return (
                <Inbox
                  onPress={() => move(item)}
                  name={item.user_name}
                  msg="here is the test msg"
                  time="9:49 am"
                  count="2"
                  pic="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                />
              );
            }}
            keyExtractor={(item) => Math.random()}
          />
        ) : loading ? (
          <ActivityIndicator
            size="large"
            style={{marginTop: WP('20')}}
            color={colors.defaultYellow}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: WP('50'),
            }}>
            <Text style={{fontSize: WP('6'), fontWeight: 'bold'}}>
              No Conversation Available
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SSInbox;

const styles = StyleSheet.create({});
