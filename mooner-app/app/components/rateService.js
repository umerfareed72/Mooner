import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';
import modalStyles from '../styles/modalStyles';
import appStyles from '../styles/appStyles';
import {WP} from '../utilities/responsive';
import {images} from '../assets/images';
import StarRating from 'react-native-star-rating';
import ActionSheet from 'react-native-actions-sheet';

const RateService = ({
  onPress,
  serviceSeeker,
  bgColor,
  showModal,
  rating,
  tips,
  setRating,
  numbers,
  onPressSlot,
}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (showModal) actionSheetRef?.current?.setModalVisible();
  }, [showModal]);
  return (
    <ActionSheet
      closable={false}
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}>
      <View style={[styles.rateModalContainer, {backgroundColor: bgColor}]}>
        <View style={[styles.ratemarginContainer]}>
          <View style={[appStyles.aiCenter]}>
            <Image
              style={{
                width: '30%',
                resizeMode: 'contain',
              }}
              source={images.line}></Image>
          </View>
          <View style={{marginTop: WP('4')}}>
            <Text style={[styles.rateh1Bold]}>
              Rate Our
              <Text style={[styles.rateH1]}> Seeker</Text>
            </Text>
          </View>
          <View style={[styles.rateImageContainer]}>
            <Image style={[styles.rateImage]} source={images.mobile}></Image>

            <Text style={[styles.rateH2Bold]}>Johny Anderson</Text>
            <Text style={[styles.rateH3Bold]}>Haircut</Text>
            <StarRating
              rating={rating}
              maxStars={5}
              emptyStarColor={colors.white}
              starSize={20}
              containerStyle={{width: WP('20'), paddingVertical: 10}}
              starStyle={{height: WP('10')}}
              fullStarColor={colors.defaultYellow}
              selectedStar={setRating}
            />
          </View>
          {serviceSeeker ? (
            <>
              <Text style={[styles.rateh1Bold]}>Add Tip</Text>
              <View style={[appStyles.row, appStyles.mv10]}>
                {numbers.map((item) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.touchableStyle,
                        {
                          backgroundColor:
                            item == tips ? colors.darkBlack : colors.halfWhite,
                        },
                      ]}
                      onPress={() => onPressSlot(item)}>
                      <Text
                        style={{
                          color: item == tips ? colors.white : colors.darkBlack,
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={[styles.costText]}>Aprox. $12.52</Text>
            </>
          ) : (
            false
          )}
          <View style={[styles.alignEnd]}>
            <TouchableOpacity
              style={[appStyles.icon56Container]}
              onPress={onPress}>
              <Image
                style={[appStyles.icon15]}
                source={images.rightBlackArrow}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default RateService;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: -25,
  },
  rateModalContainer: {
    paddingHorizontal: 10,

    height: WP('150'),
    borderRadius: 40,
  },
  ratemarginContainer: {
    paddingHorizontal: WP('5'),
    marginTop: WP('5'),
  },
  rateh1Bold: {fontSize: 22, fontFamily: 'Gilroy-Bold', color: colors.white},
  rateH1: {fontSize: 22, fontFamily: 'Gilroy-Medium', color: colors.white},
  rateImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: WP('8'),
  },
  rateImage: {height: WP('40'), width: WP('100'), resizeMode: 'contain'},
  rateH2Bold: {
    marginTop: WP('5'),
    color: colors.defaultYellow,
    fontSize: WP('5'),
    fontFamily: 'Gilroy-Bold',
  },
  rateH3Bold: {
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: WP('4'),
    marginTop: WP('2'),
  },
  alignEnd: {
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  touchableStyle: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  costText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
});
