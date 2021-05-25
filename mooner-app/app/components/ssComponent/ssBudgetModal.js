import React, {useEffect, useState, useRef} from 'react';
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
import SSDateTimePicker from './ssDateTimePicker';

import ActionSheet from 'react-native-actions-sheet';
const ssBudgetModal = ({
  onValuesChange,
  value,
  onPress,
  onPressDate,
  onPressDateModal,
  showBudget,
  bgColor,
}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (showBudget) actionSheetRef?.current?.show();
  }, [showBudget]);
  return (
    <ActionSheet
      gestureEnabled={false}
      closable={false}
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}>
      <View
        style={{
          backgroundColor: colors.defaultRed,
          borderRadius: 40,
          width: '100%',
          bottom: 0,
        }}>
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          <View style={[appStyles.aiCenter]}>
            <Image
              style={{width: '30%', resizeMode: 'contain'}}
              source={images.line}></Image>
          </View>
          <View style={[appStyles.mt20]}>
            <Text style={[appStyles.h1ServiceHeading, {color: colors.white}]}>
              Get Best
              <Text style={{fontFamily: 'Gilroy-Regular'}}>
                {' '}
                Possible Mooners
              </Text>
            </Text>
          </View>
          <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.budget}
              style={{
                height: 24,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}></Image>
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Budget
            </Text>
          </View>
          <View style={[appStyles.mt20]}>
            <MultiSlider
              enableLabel={true}
              containerStyle={{
                alignItems: 'center',
                // marginLeft: 10,
                // marginRight: 20,
              }}
              values={value}
              markerStyle={{
                height: 24,
                width: 24,
                backgroundColor: colors.defaultYellow,
              }}
              max={[1000]}
              trackStyle={{height: 5}}
              selectedStyle={{backgroundColor: colors.white}}
              onValuesChange={onValuesChange}
              step={1}
            />
          </View>
          <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
            <Image
              source={images.timer}
              style={{
                height: 19,
                width: 24,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
            <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
              Schedule
            </Text>
          </View>
          <View style={[appStyles.aiCenter, appStyles.row, appStyles.mt20]}>
            <TouchableOpacity
              onPress={onPressDate}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: bgColor ? colors.darkBlack : colors.white,
                borderRadius: 16,
                marginRight: 10,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: bgColor ? colors.white : colors.darkBlack,
                  },
                ]}>
                Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressDateModal}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: bgColor ? colors.white : colors.darkBlack,
                borderRadius: 16,
              }}>
              <Text
                style={[
                  serviceStyles.littleContainerText,
                  {
                    color: bgColor ? colors.darkBlack : colors.white,
                  },
                ]}>
                Start Date Time
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
            onPress={onPress}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ssBudgetModal;

const styles = StyleSheet.create({});
