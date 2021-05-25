import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

const MoonerBidCard = ({
  onPressReject,
  onPressAccept,
  onPressMsg,
  name,
  price,
  rating,
  review,
  img,
  service,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.imgIcon} source={{uri: img}} />
          <View style={{marginStart: WP('4')}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.service}>{service}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarRating
                emptyStarColor={colors.black}
                disabled
                starSize={12}
                maxStars={5}
                rating={rating}
                fullStarColor={colors.defaultYellow}
                containerStyle={{
                  marginRight: 3,
                  alignItems: 'center',
                  width: 70,
                }}
              />
              <Text style={styles.rating}>{rating}</Text>
              <Text style={styles.service}>({review})</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.name, {opacity: 0.8, paddingBottom: WP('3')}]}>
            ${price}
          </Text>
          <TouchableOpacity onPress={onPressMsg}>
            <Image
              style={{width: WP('8'), height: WP('8')}}
              resizeMode="contain"
              source={require('../../assets/images/chat.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: WP('5'),
        }}>
        <TouchableOpacity
          onPress={onPressReject}
          style={styles.rejectContainer}>
          <Text style={styles.rejectTxt}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressAccept}
          style={[
            styles.rejectContainer,
            {backgroundColor: colors.defaultOrange},
          ]}>
          <Text style={[styles.rejectTxt, {color: colors.white}]}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoonerBidCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.halfWhite,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: WP('5'),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: WP('7'),
  },
  imgIcon: {
    width: WP('15'),
    height: WP('15'),
    borderRadius: 18,
  },
  name: {
    fontSize: WP('4.5'),
    fontFamily: 'Gilroy-SemiBold',
  },
  service: {
    fontSize: WP('3.4'),
    fontFamily: 'Gilroy-SemiBold',
    color: '#333333',
    opacity: 0.7,
    paddingVertical: WP('1'),
  },
  rating: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: WP('3.4'),
    color: colors.defaultOrange,
    marginHorizontal: WP('1.2'),
  },
  rejectContainer: {
    borderWidth: 1,
    borderColor: colors.defaultOrange,
    width: WP('38'),
    height: WP('10'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  rejectTxt: {
    fontSize: WP('4.5'),
    fontFamily: 'Gilroy-SemiBold',
    opacity: 0.8,
  },
});
