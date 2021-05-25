import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';

const ssTextBox = ({messages, receiver}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: receiver ? 'flex-start' : 'flex-end',
      }}>
      <View style={{marginHorizontal: 10}}>
        <Text
          style={{
            fontSize: 13,
            padding: 10,
            borderRadius: 10,
            color: colors.black,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomRightRadius: receiver ? 0 : 12,
            borderBottomLeftRadius: receiver ? 12 : 0,
            backgroundColor: receiver ? colors.defaultYellow : colors.halfWhite,
            width: 'auto',
            marginRight: receiver ? 80 : 0,
            marginLeft: receiver ? 0 : 80,
            alignSelf: receiver ? 'flex-start' : 'flex-end',
          }}>
          {messages}
        </Text>
      </View>
    </View>
  );
};

export default ssTextBox;

const styles = StyleSheet.create({});
