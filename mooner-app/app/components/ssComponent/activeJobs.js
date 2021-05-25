import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

const ActiveJobs = ({onPress, img, bids, offer, name, isSS}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.img} source={{uri: img}} />
        <Text style={styles.name}>{name}</Text>
        {isSS && <Text style={styles.bid}>{bids} Bids</Text>}
        <Text style={styles.offer}>Your Offer ${offer}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveJobs;

const styles = StyleSheet.create({
  container: {
    width: WP('43'),
    // height: WP('50'),
    backgroundColor: colors.halfWhite,
    margin: WP('2'),
    marginStart: WP('3'),
    borderRadius: 25,
  },
  img: {
    width: WP('35'),
    height: WP('35'),

    alignSelf: 'center',
    marginTop: WP('4'),
    // height: '55%',
    // width: '80%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 100,
    resizeMode: 'contain',
  },
  name: {
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
    padding: WP('2'),
  },
  bid: {
    fontSize: WP('3.6'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultPurple,
    textAlign: 'center',
  },
  offer: {
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultOrange,
    textAlign: 'center',
    paddingTop: WP('3'),
    paddingBottom: WP('2'),
  },
});
