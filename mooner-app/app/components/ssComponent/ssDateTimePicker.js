import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import {images} from '../../assets/images';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DatePicker from 'react-native-date-picker';
import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

import ActionSheet from 'react-native-actions-sheet';
const ssDateTimePicker = ({
  onValuesChange,
  value,
  onPress,
  timeValue,
  onTimeChange,
  timeMode,
  onPressDone,
  onDateChange,
  selectedYear,
  selectedMonth,
  selectedDate,
  showModal,
  cdate,
  showDatePicker,
  showtimePicker,
  onPressTime,
  onPressDate,
}) => {
  const [date, setdate] = useState(new Date());
  const actionSheetRef = useRef();
  useEffect(() => {
    if (showModal) actionSheetRef?.current?.show();
  }, [showModal]);
  const opendatePicker = () => {
    return (
      <View>
        <DatePicker
          fadeToColor={colors.defaultRed}
          textColor={colors.white}
          mode="date"
          minimumDate={date}
          date={cdate}
          androidVariant={'nativeAndroid'}
          onDateChange={onDateChange}
        />
      </View>
    );
  };

  const opentimePicker = () => {
    return (
      <View>
        <DatePicker
          fadeToColor={colors.defaultRed}
          textColor={colors.white}
          mode="time"
          is24hourSource="locale"
          date={cdate}
          androidVariant={'nativeAndroid'}
          onDateChange={onTimeChange}
        />
      </View>
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}
      closable={false}>
      <View
        style={{
          backgroundColor: colors.defaultRed,
          borderRadius: 40,
          bottom: 0,
        }}>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 10,
            paddingBottom: WP('10'),
          }}>
          <View style={[appStyles.aiCenter]}>
            <Image
              style={{width: '30%', resizeMode: 'contain'}}
              source={images.line}></Image>
          </View>
          <View style={[appStyles.mt20]}>
            <Text style={[appStyles.h1ServiceHeading, {color: colors.white}]}>
              Schedule
              <Text style={{fontFamily: 'Gilroy-Regular'}}> Mooner</Text>
            </Text>
          </View>
          <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.timer}
              style={{
                height: 19,
                width: 24,
                resizeMode: 'contain',
                marginRight: 10,
              }}></Image>
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Schedule Time
            </Text>
          </View>
          {showtimePicker && opentimePicker()}
          <View style={[appStyles.aiCenter, appStyles.row, appStyles.mt20]}>
            <TouchableOpacity
              onPress={onPressTime}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
                borderRadius: 16,
                marginRight: 10,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {timeValue}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressTime}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
                borderRadius: 16,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {timeMode}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.calender}
              style={{
                height: 22,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}></Image>
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Schedule Date
            </Text>
          </View>
          {showDatePicker && opendatePicker()}
          <View style={[appStyles.aiCenter, appStyles.row, appStyles.mt20]}>
            <TouchableOpacity
              onPress={onPressDate}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
                borderRadius: 16,
                marginRight: 10,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {selectedMonth}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressDate}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                marginRight: 10,
                backgroundColor: colors.white,
                borderRadius: 16,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {selectedDate}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressDate}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
                borderRadius: 16,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {selectedYear}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: colors.defaullightRed,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 20,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
            onPress={onPressDone}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ssDateTimePicker;

const styles = StyleSheet.create({});
