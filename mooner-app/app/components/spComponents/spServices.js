import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import {images} from '../../assets/images';

import serviceStyles from '../../styles/serviceStyles';
import {spImagesURL} from '../../utilities/constant';

const spServices = ({
  onPress,
  serviceSeeker,
  bgColor,
  categoryImage,
  catIcon,
  name,
}) => {
  return (
    <TouchableOpacity
      style={[
        serviceStyles.childContainer,
        {marginStart: WP('2'), width: '48%'},
      ]}
      onPress={onPress}>
      <Image
        source={{
          uri:
            categoryImage != ''
              ? spImagesURL + '/' + categoryImage
              : spImagesURL + '/' + catIcon,
        }}
        style={[
          {
            height: '55%',
            width: '80%',
            borderTopLeftRadius: 80,
            borderTopRightRadius: 80,
            borderBottomLeftRadius: 120,
            borderBottomRightRadius: 100,
            // resizeMode: 'contain',
          },
        ]}
      />
      <Text style={[appStyles.semiBoldBodyText, appStyles.mt20]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default spServices;

const styles = StyleSheet.create({});
