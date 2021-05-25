import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from 'react-native';
import colors from '../../../assets/colors';
import {images} from '../../../assets/images';
import ActiveHeader from '../../../components/activeHeader';
import ChatBoxHeader from '../../../components/ChatBoxHeader';
import Inbox from '../../../components/ssComponent/Inbox';
import appStyles from '../../../styles/appStyles';
import homeStyles from '../../../styles/homeStyles';
import {WP} from '../../../utilities/responsive';
import SSTextBox from '../../../components/ssComponent/ssTextBox';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {TwilioService} from '../../../utilities/tiwilio-service';
import AutoScroll from 'react-native-auto-scroll';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  getAllMessages,
  snedMessage,
  shutDownTwilio,
} from '../../../redux/actions/chating.action';
import {useIsFocused} from '@react-navigation/native';
import {vh} from '../../../utilities/constant';

const ssChatBox = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const auth = useSelector((state) => state.auth);
  const chatting = useSelector((state) => state.chatting);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const {chatToken, channelId, user_name} = route.params;
  let scrollRef = useRef(null);
  const getMessages = () => {
    const data = {
      token: chatToken,
      channelID: channelId,
    };
    dispatch(getAllMessages(data));
  };
  useEffect(() => {
    isFocus && getMessages();
  }, [isFocus]);
  useEffect(() => {
    getMessages();
    return () => TwilioService.getInstance().clientShutdown();
  }, []);
  const sendMessages = (values) => {
    try {
      const data = {
        message: values.messages,
        token: chatToken,
        userid: auth?.userInfo?.user.id,
        channelID: channelId,
      };
      dispatch(snedMessage(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={
        Platform.OS == 'ios'
          ? {
              height: vh - vh / 9,

              backgroundColor: colors.white,
            }
          : homeStyles.body
      }>
      {/* header */}

      <KeyboardAvoidingView
        style={{height: '100%', paddingHorizontal: 20}}
        behavior={Platform.OS == 'ios' ? 'padding' : false}>
        <ChatBoxHeader
          name={user_name}
          pic="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          onPress={() => {
            navigation.goBack();
            Keyboard.dismiss();
          }}
        />
        {!chatting?.loading ? (
          <FlatList
            ref={scrollRef}
            inverted
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: 'column-reverse',
            }}
            data={chatting?.messages}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              item?.state?.attributes === auth?.userInfo?.user?.id ? (
                <SSTextBox messages={item?.state?.body}></SSTextBox>
              ) : (
                <SSTextBox
                  receiver={true}
                  messages={item?.state?.body}></SSTextBox>
              )
            }
            keyExtractor={() => Math.random()}
          />
        ) : (
          <ActivityIndicator
            size="large"
            style={{height: '80%'}}
            color={colors.defaultYellow}
          />
        )}
        <Formik
          initialValues={{messages: ''}}
          onSubmit={(values, formikActions) => {
            sendMessages(values);
            formikActions.resetForm();
          }}
          validationSchema={yup.object().shape({
            messages: yup.string().required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <View style={[styles.textInputContainer]}>
                <View style={styles.chatInnerContainer}>
                  <Image style={[styles.icon20]} source={images.attach}></Image>
                  <TextInput
                    placeholder="Type something here"
                    multiline={true}
                    style={{width: '80%'}}
                    value={values.messages}
                    onChangeText={handleChange('messages')}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    blurOnSubmit={false}></TextInput>
                  {values.messages != '' && (
                    <TouchableOpacity
                      disabled={!isValid}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={handleSubmit}>
                      <Image
                        style={styles.imageContainer}
                        source={images.sender}></Image>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ssChatBox;

const styles = StyleSheet.create({
  textInputContainer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    // paddingHorizontal: 30,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chatInnerContainer: {
    backgroundColor: colors.halfWhite,
    width: '100%',
    paddingVertical: Platform.OS == 'ios' ? WP('4') : 0,
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon20: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  imageContainer: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
    // position: 'absolute',
    left: 5,
    right: 5,
  },
});
