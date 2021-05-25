import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';

const MyBookingCard = ({
  serviceName,
  providerName,
  price,
  status,
  date,
  img,
  distance,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.serviceName}>{serviceName}</Text>
          <Text style={[styles.serviceName, {paddingTop: 15, fontSize: 20}]}>
            {price}
          </Text>
          <Text style={styles.providerName}>{providerName}</Text>
          <Text
            style={[
              styles.providerName,
              {
                color: colors.black,
                fontFamily: 'Gilroy-Regular',
                paddingBottom: 20,
              },
            ]}>
            {date}
          </Text>
        </View>
        <View style={{paddingEnd: 20}}>
          <Image source={{uri: img}} style={styles.imgIcon} />
          <Text style={styles.distance}>{distance} away</Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Gilroy-Regular',
              paddingTop: 3,
              color:
                status?.toLowerCase() == 'active' || 'completed'
                  ? colors.activeGreen
                  : status?.toLowerCase() == 'booked'
                  ? colors.oranage
                  : colors.danger,
            }}>
            ● {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyBookingCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.halfWhite,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    paddingTop: 20,
    paddingStart: 20,
    color: colors.black,
  },
  providerName: {
    color: colors.defaultOrange,
    fontSize: 11,
    fontFamily: 'Gilroy-SemiBold',
    paddingTop: 7,
    paddingStart: 20,
  },
  imgIcon: {width: 56, height: 56, borderRadius: 20},
  distance: {
    color: colors.defaultOrange,
    fontFamily: 'Gilroy-Regular',
    fontSize: 12,
    paddingTop: 10,
  },
});
