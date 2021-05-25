import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import colors from '../../assets/colors';
import StarRating from 'react-native-star-rating';

const TrackOrderProfileCard = ({
  img,
  name,
  sericeId,
  onPress,
  serviceName,
  star,
  reviews,
}) => {
  return (
    <View>
      <Text style={[styles.service, {marginStart: 25, marginVertical: 20}]}>
        Service Id {'  ' + sericeId}
      </Text>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.img} source={{uri: img}} />
          <View style={{marginStart: 12}}>
            <Text style={styles.service}>{name}</Text>
            <Text style={styles.serviceName}>{serviceName}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <StarRating
                emptyStarColor={colors.white}
                disabled
                starSize={9}
                maxStars={5}
                rating={star}
                fullStarColor={colors.defaultYellow}
                containerStyle={{
                  marginRight: 3,
                  alignItems: 'center',
                  width: 50,
                }}
              />
              <Text style={{fontSize: 10, color: colors.white}}>
                ({reviews})
              </Text>
            </View>
          </View>
        </View>
        <Image source={require('../../assets/images/chatwhite.png')} />
      </View>
    </View>
  );
};

export default TrackOrderProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  service: {
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 15,
  },
  img: {
    height: 65,
    width: 65,
    borderRadius: 30,
  },
  serviceName: {
    color: colors.white,
    fontSize: 10,
    paddingTop: 3,
  },
});
