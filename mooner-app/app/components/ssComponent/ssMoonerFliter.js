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

import ActionSheet from 'react-native-actions-sheet';
const ssMoonerFilter = ({
  showBudget,
  bgColor,
  budgetValue,
  onBudgetChange,
  onChanget1,
  onChanget2,
  onChanget3,
  onChanget4,
  btn1,
  btn2,
  btn3,
  btn4,
  onPressApply,
  onPressReset,
}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (showBudget) actionSheetRef?.current?.setModalVisible();
  }, [showBudget]);
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}
      closable={false}>
      <View
        style={{
          width: '100%',
          borderRadius: 40,
          backgroundColor: colors.defaultRed,

          bottom: 0,
        }}>
        <View style={{paddingHorizontal: 30, paddingTop: 10}}>
          <View style={[appStyles.aiCenter]}>
            <Image
              style={{width: '30%', resizeMode: 'contain'}}
              source={images.line}></Image>
          </View>

          <View style={[appStyles.mt20]}>
            <Text style={[appStyles.h1ServiceHeading, {color: colors.white}]}>
              Filter{' '}
              <Text style={{fontFamily: 'Gilroy-Medium'}}>your Search</Text>
            </Text>

            {/* Budget */}
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
                  marginLeft: 10,
                  marginRight: 20,
                }}
                values={budgetValue}
                markerStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: colors.defaultYellow,
                }}
                trackStyle={{height: 5}}
                selectedStyle={{backgroundColor: colors.white}}
                onValuesChange={onBudgetChange}
                min={budgetValue[0]}
                max={budgetValue[1]}
                step={1}
              />
            </View>

            {/* Rating */}
            <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
              <Image
                source={images.star}
                style={{
                  height: 24,
                  width: 24,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}></Image>
              <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
                Rating
              </Text>
            </View>

            <View style={[appStyles.mt20, appStyles.row]}>
              <TouchableOpacity
                onPress={onChanget1}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  paddingHorizontal: 15,
                  backgroundColor: btn1 ? colors.darkBlack : colors.white,
                  borderRadius: 16,
                  marginRight: 10,
                }}>
                <Text
                  style={[
                    serviceStyles.littleContainerText,
                    {
                      color: btn1 ? colors.white : colors.darkBlack,
                    },
                  ]}>
                  High to Low
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onChanget2}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  paddingHorizontal: 15,
                  backgroundColor: btn2 ? colors.darkBlack : colors.white,
                  borderRadius: 16,
                  marginRight: 10,
                }}>
                <Text
                  style={[
                    serviceStyles.littleContainerText,
                    {
                      color: btn2 ? colors.white : colors.darkBlack,
                    },
                  ]}>
                  Low to High
                </Text>
              </TouchableOpacity>
            </View>

            {/* Price */}
            <View style={[appStyles.mt20, appStyles.row, appStyles.aiCenter]}>
              <Image
                source={images.wallet}
                style={{
                  height: 20,
                  width: 24,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}></Image>
              <Text style={[appStyles.h3ServiceHeading, {color: colors.white}]}>
                Price
              </Text>
            </View>

            <View style={[appStyles.mt20, appStyles.row]}>
              <TouchableOpacity
                onPress={onChanget3}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  paddingHorizontal: 15,
                  backgroundColor: btn3 ? colors.darkBlack : colors.white,
                  borderRadius: 16,
                  marginRight: 10,
                }}>
                <Text
                  style={[
                    serviceStyles.littleContainerText,
                    {
                      color: btn3 ? colors.white : colors.darkBlack,
                    },
                  ]}>
                  High to Low
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onChanget4}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  paddingHorizontal: 15,
                  backgroundColor: btn4 ? colors.darkBlack : colors.white,
                  borderRadius: 16,
                  marginRight: 10,
                }}>
                <Text
                  style={[
                    serviceStyles.littleContainerText,
                    {
                      color: btn4 ? colors.white : colors.darkBlack,
                    },
                  ]}>
                  Low to High
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[appStyles.row, appStyles.mt20]}>
          <TouchableOpacity
            onPress={onPressReset}
            style={{
              alignItems: 'center',
              backgroundColor: colors.defaullightRed,
              borderBottomLeftRadius: 40,
              justifyContent: 'center',
              height: 60,
              width: '50%',
              bottom: 0,
            }}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Reset Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressApply}
            style={{
              alignItems: 'center',
              backgroundColor: colors.defaullightRed,
              borderBottomRightRadius: 40,
              justifyContent: 'center',
              height: 60,
              width: '50%',
              bottom: 0,
            }}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {
                  color: colors.white,
                  fontFamily: 'Gilroy-Medium',
                },
              ]}>
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ssMoonerFilter;

const styles = StyleSheet.create({});
