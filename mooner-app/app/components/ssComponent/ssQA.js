import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

const ssQA = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Frequently Asked Questions</Text>
      </View>
      <View>
        <View style={styles.questionWrapper}>
          <Text style={{color: colors.defaultYellow, fontSize: WP('3')}}>
            ●
          </Text>
          <Text style={styles.question}>sdsadasda</Text>
        </View>
        <Text style={styles.answer}>dasdsaas</Text>
      </View>
    </View>
  );
};

export default ssQA;

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
  question: {
    fontSize: WP('4'),
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultBlack,
    marginStart: WP('2'),
  },
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: WP('2'),
  },
  answer: {
    marginStart: WP('5'),
    fontFamily: 'Gilroy-Regular',
    opacity: 0.8,
    fontSize: WP('4'),
    marginVertical: WP('3'),
  },
});
