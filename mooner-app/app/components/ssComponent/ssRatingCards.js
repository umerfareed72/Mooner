import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../assets/colors';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';

const ssRatingCards = () => {
  return (
    <View style={{marginHorizontal: 10}}>
      <View style={styles.innerContainer}>
        <Image style={styles.icon56} source={images.userImg}></Image>
        <View style={{marginLeft: 5}}>
          <Text style={{fontFamily: 'Gilroy-SemiBold'}}>James Alex</Text>
          <View
            style={[
              appStyles.rowAlign,
              appStyles.aiCenter,
              {
                width: WP('61'),
              },
            ]}>
            <View style={[styles.alignRow]}>
              <StarRating
                rating={5}
                containerStyle={{margin: 5}}
                starSize={12}
                fullStarColor={colors.defaultYellow}></StarRating>
              <Text style={[styles.smText]}>4.2</Text>
            </View>
            <View>
              <Text style={{fontSize: 12, fontFamily: 'Gilroy-Bold'}}>
                January 19,2021
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.description}>
        <Text style={[styles.icon12]} ellipsizeMode={'tail'} numberOfLines={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
          consectetur interdum mi ut tristique id...{' '}
        </Text>
        <TouchableWithoutFeedback>
          <Text style={{color: 'blue'}}>Read more</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default ssRatingCards;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon56: {
    height: 56,
    width: 56,
    resizeMode: 'contain',
    borderRadius: 56,
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smText: {
    fontFamily: 'Gilroy-Bold',
    color: colors.defaultOrange,
  },
  icon12: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    lineHeight: 15,
  },
  description: {
    marginTop: 10,
    paddingBottom: WP('10'),
  },
});
