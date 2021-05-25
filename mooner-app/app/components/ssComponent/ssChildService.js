import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';

import {imagesURL} from '../../utilities/constant';
import {WP} from '../../utilities/responsive';
const ssChildService = ({onPress, id, price, categoryImage, name}) => {
  return (
    <TouchableOpacity
      key={id}
      style={[
        serviceStyles.childContainer,
        {width: '47%', marginHorizontal: WP('1')},
      ]}
      onPress={onPress}>
      <Image
        source={{uri: imagesURL + categoryImage}}
        style={styles.childImageStyle}
      />
      <Text style={[appStyles.semiBoldBodyText, appStyles.mt20]}>{name}</Text>
      <Text style={appStyles.regularSmallBodyText}>{price}</Text>
    </TouchableOpacity>
  );
};

export default ssChildService;

const styles = StyleSheet.create({
  childImageStyle: {
    height: '55%',
    width: '80%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 100,
  },
});
