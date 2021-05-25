import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import colors from '../../assets/colors';
import {images} from '../../assets/images';
import {WP} from '../../utilities/responsive';

const ssClarification = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Certification</Text>
      </View>
      <View style={{marginTop: WP('4')}}>
        <Text style={styles.text12}>
          Reference Number:{'  '}
          <Text style={{fontFamily: 'Gilroy-SemiBold'}}>
            12548-ac-rt-1102254
          </Text>
        </Text>
        <View style={styles.jc}>
          <Image style={styles.imagebg} source={images.certificate}></Image>
        </View>
      </View>
    </View>
  );
};

export default ssClarification;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: WP('5'),
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: colors.defaultOrange,
  },
  textContainer: {marginStart: 20},
  jc: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagebg: {
    height: WP('80'),
    width: WP('80'),
    resizeMode: 'contain',
  },
  text12: {
    fontSize: 12,
    fontFamily: 'Gilroy-Bold',
  },
});
