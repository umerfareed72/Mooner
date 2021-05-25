import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';
import SSRatingCards from './ssRatingCards';

const ssAbout = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>About Umer</Text>
      </View>
      <View style={{paddingTop: WP('2')}}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh ut porta
          sagittis, urna ut. Nunc, feugiat posuere justo, placerat. Morbi
          facilisi adipiscing urna gravida malesuada ac velit integer. At quam
          in euismod scelerisque leo etiam.
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.heading}>Client Reviews</Text>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Text
          style={{
            fontSize: 32,
            color: colors.defaultOrange,
            fontFamily: 'Gilroy-Bold',
          }}>
          4.2
        </Text>
        <View
          style={{
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StarRating
            rating={5}
            fullStarColor={colors.defaultYellow}
            starSize={20}></StarRating>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Gilroy-SemiBold',
              marginTop: 5,
            }}>
            Based on 30 reviews
          </Text>
        </View>
      </View>
      <SSRatingCards></SSRatingCards>
    </View>
  );
};

export default ssAbout;

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
});
