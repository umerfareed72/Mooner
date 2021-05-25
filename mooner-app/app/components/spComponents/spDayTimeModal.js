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
const spDayTimeModal = ({
  showModal,
  onClosedDateChange,
  onOpenDateChange,
  openingTime,
  openingTimeMode,
  closingTime,
  closingTimeMode,
  closeTimeModal,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  onPressMonday,
  onPressTuesday,
  onPressWednesday,
  onPressThursday,
  onPressFriday,
  onPressSaturday,
  onPressSunday,
  opendate,
  closedate,
  showClosetimePicker,
  showOpentimePicker,
  onPressOpenTime,
  onPressCloseTime,
}) => {
  const [date, setdate] = useState(new Date());
  const actionSheetRef = useRef();
  useEffect(() => {
    actionSheetRef?.current?.setModalVisible();
  }, [showModal]);
  const openshowTimePicker = () => {
    return (
      <View>
        <DatePicker
          fadeToColor={colors.defaultRed}
          textColor={colors.white}
          mode="time"
          is24hourSource="locale"
          date={opendate}
          androidVariant={'nativeAndroid'}
          onDateChange={onOpenDateChange}
        />
      </View>
    );
  };

  const closedshowTimePicker = () => {
    return (
      <View>
        <DatePicker
          fadeToColor={colors.defaultRed}
          textColor={colors.white}
          mode="time"
          is24hourSource="locale"
          date={closedate}
          androidVariant={'nativeAndroid'}
          onDateChange={onClosedDateChange}
        />
      </View>
    );
  };

  return (
    <ActionSheet
      closable={false}
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}>
      <View style={serviceStyles.spModalContainer}>
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          <View style={[appStyles.aiCenter]}>
            <Image
              style={{width: '30%', resizeMode: 'contain'}}
              source={images.line}></Image>
          </View>

          <View style={[appStyles.mt20]}>
            <Text style={serviceStyles.spModalHeading}>Set Time</Text>
          </View>

          <View style={[appStyles.mt30, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.timer}
              style={{
                height: 19,
                width: 24,
                resizeMode: 'contain',
                marginRight: 10,
              }}></Image>
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Opening Time
            </Text>
          </View>
          {showOpentimePicker && openshowTimePicker()}
          {showClosetimePicker && closedshowTimePicker()}

          <View style={[appStyles.aiCenter, appStyles.row, appStyles.mt20]}>
            <TouchableOpacity
              onPress={onPressOpenTime}
              style={serviceStyles.spValueContainer}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {openingTime}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressOpenTime}
              style={serviceStyles.spValueContainer}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {openingTimeMode}
              </Text>
            </TouchableOpacity>
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
              Closing Time
            </Text>
          </View>

          <View style={[appStyles.aiCenter, appStyles.row, appStyles.mt20]}>
            <TouchableOpacity
              onPress={onPressCloseTime}
              style={serviceStyles.spValueContainer}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {closingTime}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressCloseTime}
              style={serviceStyles.spValueContainer}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: colors.darkBlack,
                  },
                ]}>
                {closingTimeMode}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[appStyles.mt30, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.calendarIcon}
              style={{
                height: 19,
                width: 24,
                resizeMode: 'contain',
                marginRight: 10,
              }}></Image>
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Working Days
            </Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 20}}>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: monday ? colors.defaultYellow : colors.white,
                },
              ]}
              onPress={onPressMonday}>
              <Text>Mon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: tuesday
                    ? colors.defaultYellow
                    : colors.white,
                },
              ]}
              onPress={onPressTuesday}>
              <Text>Tue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: wednesday
                    ? colors.defaultYellow
                    : colors.white,
                },
              ]}
              onPress={onPressWednesday}>
              <Text>Wed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: thursday
                    ? colors.defaultYellow
                    : colors.white,
                },
              ]}
              onPress={onPressThursday}>
              <Text>Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: friday ? colors.defaultYellow : colors.white,
                },
              ]}
              onPress={onPressFriday}>
              <Text>Fri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: saturday
                    ? colors.defaultYellow
                    : colors.white,
                },
              ]}
              onPress={onPressSaturday}>
              <Text>Sat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                serviceStyles.dayPills,
                {
                  backgroundColor: sunday ? colors.defaultYellow : colors.white,
                },
              ]}
              onPress={onPressSunday}>
              <Text>Sun</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            style={serviceStyles.spTimeModalButton}
            onPress={closeTimeModal}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Set Working Days
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default spDayTimeModal;

const styles = StyleSheet.create({});
