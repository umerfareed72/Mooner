import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import modalStyles from '../../styles/modalStyles';
import appStyles from '../../styles/appStyles';
import {images} from '../../assets/images';
import StarRating from 'react-native-star-rating';
import {imagesURL} from '../../utilities/constant';

import serviceStyles from '../../styles/serviceStyles';
const hireMooner = ({
  onPressNavigate,
  onPress,
  username,
  categoryImage,
  profilePic,
  catName,
  id,
  budget,
  rating,
  completedJobs,
  onPressChat,
}) => {
  return (
    <View style={[appStyles.mt30]} key={id}>
      <View style={[serviceStyles.listmainContainer]}>
        <View style={[serviceStyles.listinnerContainer]}>
          <TouchableOpacity
            style={[serviceStyles.listleftContainer]}
            onPress={onPressNavigate}>
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: profilePic,
                }}
                style={[serviceStyles.listImageStyle]}></Image>
            </View>
            <View style={{width: '65%'}}>
              <Text style={[appStyles.h3ServiceHeading]}>{username}</Text>
              <Text style={[appStyles.h6ServiceHeading, {lineHeight: 15}]}>
                {catName}
              </Text>
              <View style={[appStyles.aiCenter, appStyles.row]}>
                <StarRating
                  disabled={false}
                  starSize={9}
                  maxStars={5}
                  rating={rating}
                  fullStarColor={colors.defaultYellow}
                  containerStyle={{marginRight: 3, alignItems: 'center'}}
                />
                <Text style={[appStyles.h6ServiceHeading]}>
                  <Text style={{color: colors.defaultRed}}>
                    {rating} {'  '}
                  </Text>
                  ({completedJobs})
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[appStyles.aiCenter, appStyles.jcCenter]}>
            <Text style={[appStyles.h3ServiceHeading]}>
              ${budget}
              {/* ${item.budget + 249} */}
            </Text>
            <TouchableOpacity onPress={onPressChat}>
              <Image source={images.chat} style={[styles.icon24]}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={[serviceStyles.listbuttonConatiner]}>
          <Text style={[appStyles.h5ServiceHeading, {color: colors.white}]}>
            Hire {username}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default hireMooner;

const styles = StyleSheet.create({
  icon24: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
