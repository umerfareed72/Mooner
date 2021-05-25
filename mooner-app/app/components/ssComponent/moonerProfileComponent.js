import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

const MoonerProfileComponent = ({
  rating,
  img,
  name,
  review,
  onPress,
  jobpost,
  budget,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '17%',
      }}>
      <Image source={{uri: img}} style={styles.img} />
      <View style={{marginStart: 20}}>
        <Text style={styles.name}>{name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <StarRating
            emptyStarColor={colors.black}
            disabled
            starSize={15}
            maxStars={5}
            rating={rating}
            fullStarColor={colors.defaultYellow}
            containerStyle={{
              marginRight: 3,
              alignItems: 'center',
              width: 80,
            }}
          />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.review}>({review})</Text>
        </View>
        {jobpost != true ? (
          <Text style={styles.budget}>${budget}</Text>
        ) : (
          <TouchableOpacity
            onPress={onPress}
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 7}}>
            <Image
              style={{width: 25, height: 25, resizeMode: 'contain'}}
              source={require('../../assets/images/chat.png')}
            />
            <Text style={{marginStart: 8, fontFamily: 'Gilroy-SemiBold'}}>
              Message
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MoonerProfileComponent;

const styles = StyleSheet.create({
  img: {
    width: WP('20'),
    height: WP('20'),
    borderRadius: 22,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 0.8,
    paddingBottom: 7,
  },
  rating: {
    color: colors.defaultOrange,
    marginStart: 8,
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  review: {
    marginStart: 3,
    fontFamily: 'Gilroy-SemiBold',
  },
  budget: {
    marginStart: 3,
    marginTop: 5,
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultPurple,
  },
});
