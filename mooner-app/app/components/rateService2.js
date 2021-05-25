import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';
import modalStyles from '../styles/modalStyles';
import appStyles from '../styles/appStyles';
import {WP} from '../utilities/responsive';
import {images} from '../assets/images';
import StarRating from 'react-native-star-rating';
import {color} from 'react-native-reanimated';
import {Textarea} from 'native-base';
import ActionSheet from 'react-native-actions-sheet';

const RateService2 = ({
  onPress,
  serviceSeeker,
  bgColor,
  rating,
  setRating,
  showModal,
  onChangeText,
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
      <View
        style={[
          styles.rateModalContainer,
          {backgroundColor: bgColor, onChangeText},
        ]}>
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
            <Text style={[styles.ratetextAreaLable]}>
              How was your experience?
            </Text>
            <Textarea
              onChangeText={onChangeText}
              placeholder={'Let us Know'}
              placeholderTextColor={colors.darkBlack}
              style={[styles.ratetextArea]}></Textarea>
          </View>

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

export default RateService2;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: -25,
  },
  rateModalContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.defaultPurple,
    height: WP('125'),
    borderRadius: 40,
  },
  ratemarginContainer: {
    paddingHorizontal: WP('5'),
    marginTop: WP('5'),
  },
  rateh1Bold: {fontSize: 22, fontFamily: 'Gilroy-Bold', color: colors.white},
  rateH1: {fontSize: 22, fontFamily: 'Gilroy-Medium', color: colors.white},

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
    paddingTop: 20,
  },
  ratetextAreaLable: {
    fontSize: WP('5'),
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
  },
  ratetextArea: {
    backgroundColor: colors.halfWhite,
    borderRadius: 16,
    height: WP('30'),
    marginTop: WP('2'),
  },
});
